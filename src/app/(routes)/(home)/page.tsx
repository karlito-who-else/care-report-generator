import Link from "next/link";
import { redirect } from 'next/navigation'
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SignOutButton from "../(auth)/components/button-signout";
import { getMe } from "@/actions/user";

export default async function Home() {
  const me = await getMe();

  if (me) {
    redirect("/generator")
  }

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <header>
        <h1 className="text-4xl font-bold sm:text-5xl">Care Report Generator</h1>
      </header>
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        {me ? (
          <div className="flex w-full flex-col gap-5">
            <SignOutButton />
            <br />
            <Link
              href={"/generator"}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Go To Generator
            </Link>
          </div>
        ) : (
          <div className="flex w-full flex-row gap-5">
            <Link
              href={"/signin"}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Sign In
            </Link>
            <Link
              href={"/signup"}
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Sign Up
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
