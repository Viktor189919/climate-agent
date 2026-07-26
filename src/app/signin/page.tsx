'use client'

import { redirect } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 
  
  async function handlelogin() {
    
    setMessage("");
    
    if (!email || !password) {
      setMessage("Please fill in all fields");
      return;
    }
    
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: email, password: password})
      })

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.message || "An error occurred");
        return;
      }

      redirect("/dashboard");

    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-100">
      <div className="w-80 h-80 border-2 p-10 rounded-lg shadow-lg bg-white">
        <h1 className="text-3xl font-semibold tracking-widest text-slate-900 transition mb-8">Sign In</h1>
        <div className="space-y-4">

          <input className="w-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1 rounded-md" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input className="w-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1 rounded-md" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button onClick={(e) => {
            handlelogin();
          }} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition w-full" >
            Login
          </button>
          <p className="text-sm text-gray-500 mt-2">Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a></p>
        </div>
      </div>

      {message && <p className="text-red-500">{message}</p>}

    </div>
  )
}