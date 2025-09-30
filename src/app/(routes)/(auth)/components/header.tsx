import { ThemeToggle } from "@/components/ui/theme-toggle";
import SignOutButton from "./button-signout";
import { getMe } from "@/actions/user";

export default async function Header() {
    const me = await getMe();

    if (!me) {
        return null;
    }

    return (
        <header className="bg-gray-800 text-white p-4 gap-4 flex justify-between items-center">
            <h1 className="text-lg font-bold">Welcome, {me.name}!</h1>
            <menu className="flex gap-[inherit] items-center">
                <ThemeToggle />
                <SignOutButton />
            </menu>
        </header>
    );
}