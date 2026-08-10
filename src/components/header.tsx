"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/signout', { method: 'POST' });

      if (response.ok) {
        router.push('/signin');
      }

    } catch (error) {
      console.error('Error signing out:', error);
    } 
  }
  
  return (
    <header className="border-b border-slate-700 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="text-lg font-semibold tracking-[0.2em] text-slate-900 transition hover:text-slate-700">
          CLIMATE AGENT
        </Link>

        <nav className="flex items-center gap-4 text-sm text-slate-600 sm:gap-6">
          
          <button onClick={handleSignOut} className="transition hover:text-slate-900 hover:cursor-pointer">
            Sign Out
          </button>
        </nav>
      </div>
    </header>
  )
}