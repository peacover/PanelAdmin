"use client";

import { TState } from "@/lib/types/TFormState";
import { LoginUserSchema } from "@/lib/validations/user.schema";
import { fetchLogin } from "@/server-actions/Login";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { useFormState } from "react-dom";

const handleSubmit = async (prevState: TState, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const user_login = LoginUserSchema.safeParse({
      email,
      password,
    });

    if (!user_login.success) {
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
    return {
      error: "Invalid Credentials test!!",
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
      push("/dashboard");
    }
  }, [signInState.success]);

  return (
    <div>
      <div className="rounded-lg border bg-card shadow-sm mx-auto max-w-sm">
        <form action={signInAction} className="flex flex-col space-y-4">
          <div className="flex flex-col p-6 space-y-1">
            <h3 className="tracking-tight text-2xl font-bold">Sign In</h3>
            <p className="text-sm">
              Enter your email and password to access your account
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
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
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium " htmlFor="password">
                  Password
                </label>
                <input
                  className="flex h-10 rounded-md border px-3 py-2 text-sm bg-[#ffffff] w-full"
                  id="password"
                  name="password"
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
          </div>
        </form>
        {signInState.error && (
          <div className="flex items-center justify-center p-6 border-t">
            <p>{signInState.error}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default SignInForm;
