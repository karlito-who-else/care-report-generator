import { type Metadata } from "next";
import SignInForm from "./form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col rounded-2xl border border-foreground/10 px-8 py-5 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <p>Sign in to access the Care Report Generator</p>
        <SignInForm />
        <div className="flex items-center justify-center gap-2">
          <small>Don&apos;t have account?</small>
          <Link href={"/signup"} className="text-sm font-bold leading-none">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
