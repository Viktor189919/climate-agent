import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hash } from "@/lib/helper/apiKey";
import { calculateCO2Emissions } from "@/lib/helper/co2Calculator";
import { transformZodErrors, } from "@/lib/helper/response";
import { V1RequestBody } from "@/lib/zod/schemas";

export async function POST(req: NextRequest) {

  try {
    const api_key = req.headers.get('x-apiKey');

    if (!api_key) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const supabase = await createClient(true);

    const api_key_hash = hash(api_key);

    const { data: keyData, error: keyError} = await supabase.from('api_keys').select().eq('key', api_key_hash);

    if (keyError) {
      return NextResponse.json({message: "Internal server error"}, {status: 500});
    }

    if (keyData.length === 0) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const data = await req.json();

    const {token_count, ai_provider, grid_g_co2_per_kWh_intensity} = data;

    const validation = V1RequestBody.safeParse({
      token_count,
      ai_provider,
      grid_g_co2_per_kWh_intensity
    });

    if (!validation.success) {
      const errors = transformZodErrors(validation, data);
      console.log(errors);
      return NextResponse.json(
        {success: false, message: "Validation failed", errors: errors},
        {status: 400}
      )
    }

    const total_g_co2_emission = calculateCO2Emissions(token_count, ai_provider, grid_g_co2_per_kWh_intensity); 

    const { data: batchData, error: batchError } = await supabase.from('usage_batches')
      .insert({
        token_count: token_count, 
        ai_provider: ai_provider, 
        grid_g_co2_per_kWh_intensity: grid_g_co2_per_kWh_intensity,
        total_g_co2_emission: total_g_co2_emission,
        user_id: keyData[0].user_id,
      }).select("id, token_count, ai_provider, grid_g_co2_per_kWh_intensity, total_g_co2_emission" )
    
    if (batchError) {
      return NextResponse.json({message: "Internal server error"}, {status: 500});
    }

    const res = {
      success: true,
      message: 'Data received and inserted successfully',
      data: {
        id: batchData[0].id,
        token_count: batchData[0].token_count, 
        ai_provider: batchData[0].ai_provider, 
        grid_g_co2_per_kWh_intensity: batchData[0].grid_g_co2_per_kWh_intensity,
        total_g_co2_emission: Math.floor((batchData[0].total_g_co2_emission) * 100) / 100, 
      }
    }

    return NextResponse.json(res, {status: 201});
  } catch (error) {
    console.error(error);
    return NextResponse.json({message: "Internal server error"}, {status: 500});
  }
}