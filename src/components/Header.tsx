"use client"
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="px-8 py-2.5 border-b">
            <nav className="flex items-center justify-between max-w-[1200px] mx-auto">
                <Link href={"/"} className="flex items-center gap-2">
                    <Image src={require("./../app/favicon.ico")} alt="SlashPixl" width={40} height={40} className="rounded-full"/>
                    <h1 className="font-bold text-lg">SlashPixl</h1>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href={"https://github.com/happer64bit/SlashPixl"}>
                        <GitHubLogoIcon width={30} height={30}/>
                    </Link>
                </div>
            </nav>
        </header>
    )
}