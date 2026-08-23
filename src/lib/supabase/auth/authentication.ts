import { createClient } from '../server';
import { IUserCredentials } from '@/types/auth';

export async function signUpNewUser(userData: IUserCredentials) {

  const supabase = await createClient(false);

  const { email, password } = userData;

  const supabaseRes = await supabase.auth.signUp({
    email: email,
    password: password,
  })

  return supabaseRes
}

export async function signInWithEmail(userData: IUserCredentials) {

  const supabase = await createClient(false);

  const { email, password } = userData;

  const supabaseRes = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  return supabaseRes
}

export async function signOutUser() {

  const supabase = await createClient(false);

  const supabaseRes = await supabase.auth.signOut();

  return supabaseRes
}