import Link from "next/link";

export default function Header() {
    return (
        <header className="px-8 py-3 flex items-center justify-between border-b">
            <Link href={"/"}>
                <h1 className="font-bold text-lg">SlashPixl</h1>
            </Link>
            <div className="flex items-center gap-4">
                
            </div>
        </header>
    )
}