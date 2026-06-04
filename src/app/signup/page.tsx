'use client'

export default function SignupPage() {

  async function handleSignup() {

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: 'vigus006@gmail.com',
          password: 'Iaq9yqob89'
        })
      })

      if (!res.ok) {
        console.log('Res not ok');
      }

      console.log(await res.json());

    } catch (error) {
      console.log(error)
    }
  }

  async function handleSignout() {

    try {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      })

      if (!res.ok) {
        console.log('Res not ok');
      }

      console.log(await res.json());

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button onClick={handleSignup}>Signup test</button>
      <button onClick={handleSignout}>Signout test</button>
    </div>
  )
}