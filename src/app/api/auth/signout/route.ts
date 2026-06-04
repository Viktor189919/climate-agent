import { NextResponse } from "next/server";
import { signOutUser } from "../../../../lib/supabase/auth/authentication";


export async function POST() {

  const { error } = await signOutUser();

  if (error) {
    return NextResponse.json(error)
  }

  return NextResponse.json({success: true});
}