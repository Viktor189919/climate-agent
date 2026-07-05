import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { serverErrorRes } from "@/lib/helper/response";
import { calculateCO2Emissions } from "@/lib/helper/co2Calculator";
import { EAiProvider } from "@/types/v1";

export async function GET() {

  const supabase = await createClient();

  const { data, error } = await supabase.from('usage_batches').select("*");

  if (error) {
    const { message, status } = serverErrorRes();
    return NextResponse.json(message, status);
  }

  return NextResponse.json({message: "Data retrieved successfully", data: data}, {status: 200});
}

export async function POST() {

  const token_max = 20000000;
  const token_min = 18000000;

  const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "okt", "nov", "dec"]


  for (let i = 0; i < 12; i++) {
    const randTokens = Math.round(Math.random() * (token_max - token_min) + token_min);

    const supabase = await createClient();

    const co2 = calculateCO2Emissions(randTokens, EAiProvider.ANTHROPIC);

    const { data, error } = await supabase.from("usage_batches")
      .insert({
        token_count: randTokens,
        ai_provider: EAiProvider.ANTHROPIC,
        user_id: "40a31b1d-1993-4a58-87fc-d93d421c364f",
        grid_g_co2_per_kWh_density: 200,
        total_g_co2_emission: co2,
        created_at: (new Date(`05 ${months[i]} 2011 14:48 UTC`)).toISOString()
      });

      if (error) {
        console.log(error)
      }
  }
  


}