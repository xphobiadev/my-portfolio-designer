"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

const navLinks = [
    { name: "Work", path: "/work" },
    { name: "Photography", path: "/photography" },
    { name: "Audio", path: "/audio" },
    { name: "Mockups", path: "/mockups" },
    { name: "Videos", path: "/videos" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
];

export function Header() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 w-full z-50 glass px-6 md:px-12 py-5 flex justify-between items-center text-white border-b border-white/5">
            <Link href="/" className="text-2xl font-heading tracking-widest text-gold-400">
                MB
            </Link>

            <nav className="hidden lg:flex gap-10 text-xs uppercase tracking-[0.2em] font-sans font-medium">
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        href={link.path}
                        className={`transition-colors duration-500 ${pathname === link.path ? "text-gold-400" : "text-gray-400 hover:text-white"}`}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>

            <button className="p-3 border border-white/10 rounded-full hover:border-gold-400 transition-colors">
                <Menu className="w-5 h-5 text-gray-300 hover:text-gold-400 transition-colors" />
            </button>
        </header>
    );
}
