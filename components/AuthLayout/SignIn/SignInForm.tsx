'use client';

import { fetchLogin } from "@/server-actions/Login";
import { useRouter } from 'next/navigation';
import { useState } from "react";

const SignInForm = () => {
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem(
      "email"
    ) as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem(
      "password"
    ) as HTMLInputElement).value;
    const res = await fetchLogin(email, password);
    if (res.message !== "Login successfully") {
      setError("Invalid credentials");
      return;
    }
    setError("");
    push("/dashboard");
  };

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
      <div className="rounded-lg border bg-card shadow-sm mx-auto max-w-sm">
        <div className="flex flex-col p-6 space-y-1">
          <h3 className="tracking-tight text-2xl font-bold">Sign In</h3>
          <p className="text-sm">
            Enter your email and password to access your account
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium "
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="flex h-10 rounded-md border px-3 py-2 text-sm bg-[#ffffff] w-full"
                id="email"
                placeholder="john@example.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium "
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="flex h-10 rounded-md border px-3 py-2 text-sm bg-[#ffffff] w-full"
                id="password"
                required
                type="password"
              />
            </div>
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-primary/90 h-10 px-4 py-2 w-full bg-blue-500 text-white"
              type="submit"
            >
              Sign In
            </button>
          </div>

          {error && <p>{error}</p>}
        </div>
      </div>
    </form>
  );
};
export default SignInForm;
