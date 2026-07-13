"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";

export default function LoginForm() {
  const router = useRouter();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [showPassword,setShowPassword]=useState(false);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setLoading(true); setError("");
    try{
      await authService.signIn({
        email,
        password,
      });
      router.push("/dashboard");
    }catch(err:any){
      setError(err?.message ?? "Login failed.");
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border bg-white/10 p-8 shadow-2xl backdrop-blur">
      <h1 className="mb-6 text-center text-3xl font-bold">Welcome Back</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full rounded border p-3" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <div className="flex rounded border">
          <input className="flex-1 p-3 outline-none" type={showPassword?"text":"password"} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button type="button" className="px-3" onClick={()=>setShowPassword(!showPassword)}>{showPassword?"Hide":"Show"}</button>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="w-full rounded bg-black py-3 text-white">{loading?"Signing in...":"Login"}</button>
      </form>
      <button
      onClick={() => authService.signInWithGoogle()}
      className="mt-4 w-full rounded border py-3"
>
  Continue with Google
</button>
      <p className="mt-6 text-center text-sm">Don't have an account? <a className="text-blue-600" href="/register">Register</a></p>
    </div>
  );
}
