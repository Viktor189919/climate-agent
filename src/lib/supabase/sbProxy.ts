import { createClient } from './server';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  
  let supabaseResponse = NextResponse.next({
    request,
  });
  
    try {
      const supabase = await createClient();

      const { data } = await supabase.auth.getClaims();
      const user = data?.claims;

      if (
        !user &&
        !request.nextUrl.pathname.startsWith('/signin') &&
        !request.nextUrl.pathname.startsWith('/signup') &&
        !request.nextUrl.pathname.startsWith('/api/auth')
      ) {
        const url = request.nextUrl.clone();
        url.pathname = '/signin';
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error('Middleware error:', error);
      // Låt requesten fortsätta istället för att krascha
    }

  return supabaseResponse
}