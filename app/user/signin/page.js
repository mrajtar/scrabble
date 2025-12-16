'use client'

import { Suspense, useState } from "react";
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";

function SignInForm() {
  const auth = getAuth();
  const router = useRouter();
  const params = useSearchParams();
  const returnUrl = params.get("returnUrl");

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setErrorMessage(null);
    setLoading(true);

    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);

      router.push(returnUrl || "/");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#121212] text-neutral-content">
      <div className="w-full max-w-md bg-[#1E1E1E] p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>

        {errorMessage && (
          <div className="alert alert-error mb-4">
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="email@example.com"
              className="input input-bordered w-full bg-[#2A2A2A] border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="input input-bordered w-full bg-[#2A2A2A] border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 rounded-md font-semibold text-[#f1f1f1] bg-gray-700 hover:bg-gray-600 transition-all ${
              loading ? "loading" : ""
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}