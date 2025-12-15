"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
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
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    try {
      await setPersistence(auth, browserSessionPersistence);
      await createUserWithEmailAndPassword(auth, email, password);
      router.push(returnUrl || "/");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1E1E1E] p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        {errorMessage && (
          <div className="alert alert-error mb-4">
            <span>{errorMessage}</span>
          </div>
        )}

        <form
          onSubmit={onSubmit}
          className="space-y-4 bg-base-200 p-6 rounded-lg shadow-md"
        >
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

          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
