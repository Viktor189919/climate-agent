'use client'

export default function SignInPage() {
  
  async function handlelogin() {
    
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email: "viktor.gustafsson@chasacademy.se", password: "drowssap123"})
      })

      const data = await res.json();
      console.log(data)
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div>
      <button onClick={(handlelogin)}>login</button>
    </div>
  )
}