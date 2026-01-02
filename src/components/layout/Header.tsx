"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "work", href: "/projects" },
  { name: "contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 bg-background/80 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between">
        <Link
          href="/"
          className="text-base font-medium lowercase transition-colors hover:text-green"
        >
          tylerbezuka
        </Link>

        <ul className="flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm lowercase transition-colors ${
                    isActive ? "text-orange" : "text-muted hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
