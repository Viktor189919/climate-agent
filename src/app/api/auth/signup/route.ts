import { type NextRequest, NextResponse } from "next/server";
import type { IUserCredentials } from "@/types/auth";
import { signUpNewUser } from "../../../../lib/supabase/auth/authentication";


export async function POST(req: NextRequest) {

  const userData = await req.json() as IUserCredentials;

  const { data, error } = await signUpNewUser(userData);

  if (error) {
    return NextResponse.json(error)
  }

  return NextResponse.json(data);
}