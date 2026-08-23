import { NextRequest, NextResponse } from "next/server";
import { signInWithEmail } from "@/lib/supabase/auth/authentication";
import { UserCredentials } from "@/lib/zod/schemas";
import { errorCodeToResponseMessage } from "@/lib/helper/response";

export async function POST(req: NextRequest) {

  try {
    const userData = await req.json();

    const validation = UserCredentials.safeParse(userData);

    if (!validation.success) {
      return NextResponse.json({message: "Invalid credentials"}, {status: 400});
    }

    const { data, error } = await signInWithEmail(userData);

    if (error) {
      let message: string | undefined;
      /* 
      Supabase uses GoTrue for authentication and uses error codes to indicate specific issues.
      Error codes are mapped to user-friendly messages.
      */
      if (error.code) {
        message = errorCodeToResponseMessage(error.code);
      }

      return NextResponse.json({message: message || "An error occurred during sign in"}, {status: error.status});
    }

    return NextResponse.json({ data }, { status: 200 }); 

  } catch (error) {
    return NextResponse.json({message: "An error occurred during sign in"}, {status: 500});
  }
}