import { redirect } from 'next/navigation';

export default function RootPage() {
  // Root page is not used, always redirect to dashboard or signin based on user authentication status
  redirect('/dashboard');
  return null;
}
