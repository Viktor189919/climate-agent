import { type NextRequest, NextResponse } from "next/server";
import { UserCredentials } from "@/lib/zod/schemas";
import { signUpNewUser } from "@/lib/supabase/auth/authentication";
import { errorCodeToResponseMessage } from "@/lib/helper/response";


export async function POST(req: NextRequest) {

  try {
    const userData = await req.json();

    const validation = UserCredentials.safeParse(userData);

    if (!validation.success) {
      return NextResponse.json({message: "Invalid credentials"}, {status: 400});
    }

    const { data, error } = await signUpNewUser(userData);

    if (error) {
      let message: string | undefined;
      if (error.code) {
        message = errorCodeToResponseMessage(error.code);
      }
      return NextResponse.json({message: message || "An error occurred during sign up"}, {status: error.status});
    }

    return NextResponse.json({ data }, { status: 200 });
  
  } catch (error) {
    return NextResponse.json({message: "An error occurred during sign up"}, {status: 500});
  }
}