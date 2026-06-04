'use client'

export default function SignInPage() {
  
  async function handleSignIn() {
    
    try {
      const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'vigus006@gmail.com',
        password: 'Iaq9yqob89'
      })
    });


    if (!res.ok) {
      console.log('Response not ok');
      return;
    }
    console.log(res);
   } catch (error) {
    console.log(error);
  }
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign In test</button>
    </div>
  )
}