import { type Metadata } from "next";
import Link from "next/link";
import SignUpForm from "./form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-10">
      <div className="flex w-full flex-col rounded-2xl border border-foreground/10 px-8 py-5 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        {process.env.SIGN_UP_ENABLED ? (
          <>
            <p className="mb-4">Sign up to access the Care Report Generator</p>
            <SignUpForm />
          </>
        ) : <p className="mb-4">Sign up is currently disabled.</p>}
        <div className="flex items-center justify-center gap-2">
          <small>Already have account?</small>
          <Link href={"/signin"} className="text-sm font-bold leading-none">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
