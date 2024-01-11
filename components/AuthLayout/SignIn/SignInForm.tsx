"use client";

import { TState } from "@/lib/types/TFormState";
import { LoginUserSchema } from "@/lib/validations/user.schema";
import { fetchLogin } from "@/server-actions/Login";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

const handleSubmit = async (prevState: TState, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const user_login = LoginUserSchema.safeParse({
      email,
      password,
    });

    if (!user_login.success) {
      user_login.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return {
        error: "Invalid Credentials!",
        success: false,
      };
    }
    const res = await fetchLogin(
      user_login.data.email,
      user_login.data.password
    );
    if (res.message !== "Login successfully") {
      toast.error(res.message);
      return {
        error: "Invalid Credentials!!",
        success: false,
      };
    }
    return {
      error: null,
      success: true,
    };
  } catch (error) {
    toast.error((error as Error).message);
    return {
      error: "Invalid Credentials!",
      success: false,
    };
  }
};

const SignInForm = () => {
  const { push } = useRouter();
  const [signInState, signInAction] = useFormState(handleSubmit, {
    error: null,
    success: false,
  });

  useEffect(() => {
    if (signInState.success) {
      toast.success("Login successfully");
      push("/dashboard");
    }
  }, [signInState.success]);

  return (
    <div className="rounded-lg border bg-card shadow-sm mx-auto max-w-sm flex flex-col space-y-4">
      <form action={signInAction}>
        <div className="flex flex-col p-6 space-y-1">
          <h3 className="tracking-tight text-2xl font-bold">Sign In</h3>
          <p className="text-sm">
            Enter your email and password to access your account
          </p>
        </div>
        <div className="p-6 mb-3">
          <div className="space-y-2">
            <label className="text-sm font-medium " htmlFor="email">
              Email
            </label>
            <input
              className="flex h-10 rounded-md border px-3 py-2 text-sm bg-[#ffffff] w-full"
              id="email"
              name="email"
              placeholder="john@example.com"
              required
              type="email"
              autoComplete="email"
            />
          </div>
          <div className="space-y-2 mt-4 mb-10">
            <label className="text-sm font-medium " htmlFor="password">
              Password
            </label>
            <input
              className="flex h-10 rounded-md border px-3 py-2 text-sm bg-[#ffffff] w-full"
              id="password"
              name="password"
              required
              type="password"
              autoComplete="current-password"
            />
          </div>
          <button
            className="rounded-md text-sm font-medium h-10 w-full bg-gray-900 text-white"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
