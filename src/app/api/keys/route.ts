import { createClient } from "@/lib/supabase/server";
import { generateApiKey } from "@/lib/helper/apiKey";
import { NextResponse } from "next/server";

export async function POST() {

  const supabase = await createClient();

  const { api_key, api_key_hash } = generateApiKey();

  try {

    const { error } = await supabase.from('api_keys').insert({key: api_key_hash});

    if (error) {
      return NextResponse.json({status: error.code});
    }

    return NextResponse.json({api_key: api_key});

  } catch {
    return NextResponse.json({message: "Internal server error"}, {status: 500});
  }
}