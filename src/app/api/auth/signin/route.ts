import { NextRequest, NextResponse } from "next/server";
import type { IUserCredentials } from "@/types/auth";
import { signInWithEmail } from "@/lib/supabase/auth/authentication";

export async function POST(req: NextRequest) {

  const userData = await req.json() as IUserCredentials;

  const { data, error } = await signInWithEmail(userData);

  if (error) {
    return NextResponse.json({error: error.message, status: error.status});
  }

  return NextResponse.json(data);
}