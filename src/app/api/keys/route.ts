import { createClient } from "@/lib/supabase/server";
import { generateApiKey, hash } from "@/lib/helper/apiKey";
import { NextResponse } from "next/server";

export async function POST() {

  try {
    const supabase = await createClient();

    const { api_key, api_key_hash } = generateApiKey();

    const { error } = await supabase.from('api_keys').insert({key: api_key_hash});

    if (error) {
      return NextResponse.json({message: "An error occurred while generating API key, please try again later"}, {status: 500});
    }

    return NextResponse.json({api_key: api_key});

  } catch (error) {
    return NextResponse.json({message: "An error occurred while generating API key, please try again later"}, {status: 500});
  }
}