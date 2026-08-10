import { NextRequest, NextResponse } from "next/server";
import { signInWithEmail } from "@/lib/supabase/auth/authentication";
import { UserCredentials } from "@/lib/zod/schemas";

export async function POST(req: NextRequest) {

  const userData = await req.json();

  const validation = UserCredentials.safeParse(userData);

  if (!validation.success) {
    return NextResponse.json({message: "Invalid credentials"}, {status: 400});
  }

  const { data, error } = await signInWithEmail(userData);

  if (error) {
    return NextResponse.json({message: error.message}, {status: error.status});
  }

  return NextResponse.json(data);
}