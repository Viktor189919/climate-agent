import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hash } from "@/lib/helper/apiKey";

export async function POST(req: NextRequest) {

  const api_key = req.headers.get('x-apiKey');

  if (!api_key) {
    return NextResponse.json({message: "Request is missing api key"});
  }

  const api_key_hash = hash(api_key);

  const supabase = await createClient();

  const { data: keyData, error: keyError} = await supabase.from('api_keys').select().eq('key', api_key_hash);

  if (keyError) {
    return NextResponse.json({status: keyError.code});
  }

  if (keyData.length === 0) {
    return NextResponse.json({message: "Api key is invalid", keyData: keyData});
  }

  // Will be removed when types are added to supabase client
  let user_id;
  for (const [key, value] of Object.entries(keyData[0])) {
    if (key === 'user_id')
      user_id = value;
  }

  const { token_count, ai_provider, grid_co2_density } = await req.json();

  const total_g_co2_emission = 200; // Placeholder value, replace with actual calculation based on token_count, ai_provider and grid_co2_density

  const { error: batchError } = await supabase.from('usage_batches')
    .insert({
      token_count: token_count, 
      ai_provider: ai_provider, 
      grid_co2_density: grid_co2_density,
      total_g_co2_emission: total_g_co2_emission,
      user_id: user_id,
    })
  
  if (batchError) {
    return NextResponse.json({message: batchError, status: batchError.code, key: user_id});
  }

  return NextResponse.json({message: 'Data received and inserted successfully', status: 200});
}