import { NextResponse } from "next/server";
import { signOutUser } from "@/lib/supabase/auth/authentication";


export async function POST() {

  try {
    const { error } = await signOutUser();

    if (error) {
      return NextResponse.json({message: "An error occurred during sign out"}, {status: error.status});
    }

    return NextResponse.json({ message: "Successfully signed out" }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({message: "An error occurred during sign out"}, {status: 500});
  }
}