import { ThemeToggle } from "@/components/ui/theme-toggle";
import SignOutButton from "../(auth)/components/button-signout";
import { getMe } from "@/actions/user";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const me = await getMe();

  if (!me) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4 gap-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Welcome, {me.name}!</h1>
        <menu className="flex gap-[inherit] items-center">
          <ThemeToggle />
          <SignOutButton />
        </menu>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}