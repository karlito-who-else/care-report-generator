import { getMe } from "@/actions/user";
import Header from "../(auth)/components/header";

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
    <>
      <Header />
      <main className="flex-1">{children}</main>
    </>
  );
}