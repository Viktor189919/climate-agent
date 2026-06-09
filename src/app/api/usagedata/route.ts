import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { serverErrorRes } from "@/lib/helper/response";

export async function GET() {

  const supabase = await createClient();

  const { data, error } = await supabase.from('usage_batches').select("*");

  if (error) {
    const { message, status } = serverErrorRes();
    return NextResponse.json(message, status);
  }

  return NextResponse.json({message: "Data retrieved successfully", data: data}, {status: 200});
}