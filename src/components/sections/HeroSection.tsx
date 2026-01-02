"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "about", href: "#about", className: "text-orange" },
  { name: "work", href: "/projects", className: "text-green" },
  {
    name: "contact",
    href: "/contact",
    className: "text-white [text-shadow:_-1px_-1px_0_#dc2626,_1px_-1px_0_#dc2626,_-1px_1px_0_#dc2626,_1px_1px_0_#dc2626]",
  },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-center px-6 pt-24">
      <div className="mx-auto w-full max-w-5xl">
        <motion.p
          className="mb-6 text-lg text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          nyc
        </motion.p>

        <div className="flex flex-col gap-1">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <Link href={link.href}>
                <motion.span
                  className={`inline-block text-3xl font-medium sm:text-4xl md:text-5xl cursor-pointer font-[family-name:var(--font-display)] ${link.className}`}
                  whileHover={{
                    scale: 1.05,
                    y: -6,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.name.split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      whileHover={{
                        y: [0, -6, 0],
                        transition: {
                          duration: 0.4,
                          delay: i * 0.03,
                        },
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Decorative dots */}
        <motion.div
          className="mt-12 flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="h-2 w-2 rounded-full bg-green" />
          <span className="h-2 w-2 rounded-full bg-orange" />
          <span className="h-2 w-2 rounded-full bg-red" />
        </motion.div>
      </div>
    </section>
  );
}
