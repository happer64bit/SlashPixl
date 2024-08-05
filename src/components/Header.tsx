import Link from "next/link";

export default function Header() {
    return (
        <header className="px-8 py-3 border-b">
            <nav className="flex items-center justify-between max-w-[1200px] mx-auto">
                <Link href={"/"}>
                    <h1 className="font-bold text-lg">SlashPixl</h1>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href={"https://github.com/happer64bit/SlashPixl"}>
                        <p>Source Code</p>
                    </Link>
                </div>
            </nav>
        </header>
    )
}