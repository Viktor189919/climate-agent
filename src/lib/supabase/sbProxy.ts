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

      if (request.nextUrl.pathname === '/') {
        const url = request.nextUrl.clone();
        url.pathname = user ? '/dashboard' : '/signin';
        return NextResponse.redirect(url);
      }

      if (
        !user &&
        !request.nextUrl.pathname.startsWith('/signin') &&
        !request.nextUrl.pathname.startsWith('/signup') &&
        !request.nextUrl.pathname.startsWith('/api/auth') &&
        !request.nextUrl.pathname.startsWith('/api/v1')
      ) {
        const url = request.nextUrl.clone();
        url.pathname = '/signin';
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error('Middleware error:', error);
      const url = request.nextUrl.clone();
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }

  return supabaseResponse
}