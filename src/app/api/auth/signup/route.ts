import { type NextRequest, NextResponse } from "next/server";
import { UserCredentials } from "@/lib/zod/schemas";
import { signUpNewUser } from "@/lib/supabase/auth/authentication";


export async function POST(req: NextRequest) {

  const userData = await req.json();

  const validation = UserCredentials.safeParse(userData);

  if (!validation.success) {
    return NextResponse.json({message: "Invalid credentials"}, {status: 400});
  }

  const { data, error } = await signUpNewUser(userData);

  if (error) {
    return NextResponse.json(error)
  }

  return NextResponse.json(data);
}