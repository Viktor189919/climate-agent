import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {

  const supabase = await createClient();

  const { data, error } = await supabase.from('usage_batches').select("*");

  if (error) {
    return NextResponse.json(error);
  }

  return NextResponse.json(data);
}