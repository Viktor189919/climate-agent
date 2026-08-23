'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();
  
  async function handleSignup() {

    setMessage("");
    
    if (!email || !password) {
      setMessage("Email and password are required");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email, password: password})
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.message || "An error occurred during signup");
        return;
      }

      router.push("/signin");
    } catch (error) {
      setMessage("An error occurred during signup");
      console.log(error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-100">
      <div className="w-80 h-80 border-2 p-10 rounded-lg shadow-lg bg-white">
        <h1 className="text-3xl font-semibold tracking-widest text-slate-900 transition mb-8">Sign Up</h1>
        <div className="space-y-4">

          <input className="w-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1 rounded-md" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input className="w-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1 rounded-md" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button onClick={(e) => {
            handleSignup();
          }} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition w-full" >
            Sign Up
          </button>
        </div>
      </div>

      {message && <p className="text-red-500">{message}</p>}

    </div>
  )
}