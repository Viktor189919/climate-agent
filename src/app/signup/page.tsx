'use client'

import { useState } from "react";
import { redirect } from "next/navigation";

export default function SignupPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
        setMessage(errorData.message || "Signup failed");
        return;
      }

      redirect("/signin");
    } catch (error) {
      setMessage("An error occurred during signup");
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center border-black min-h-screen gap-4">
      <h1>Sign Up</h1>
      <div className="flex flex-col gap-2">
        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSignup}>Sign Up</button>  
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}