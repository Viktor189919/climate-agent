"use client"

import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-slate-700 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="text-lg font-semibold tracking-[0.2em] text-slate-900 transition hover:text-slate-700">
          CLIMATE AGENT
        </Link>

        <nav className="flex items-center gap-4 text-sm text-slate-600 sm:gap-6">
          
          <button onClick={() => fetch('/api/auth/signout', { method: 'POST' })} className="transition hover:text-slate-900 hover:cursor-pointer">
            Sign Out
          </button>
        </nav>
      </div>
    </header>
  )
}