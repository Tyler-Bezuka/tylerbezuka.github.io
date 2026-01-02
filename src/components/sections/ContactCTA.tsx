"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { motion } from "framer-motion";
import Link from "next/link";

export function ContactCTA() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <p className="text-sm uppercase tracking-widest text-muted mb-8">contact</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-2xl font-medium mb-8 sm:text-3xl">
            <span className="text-green">Placeholder</span>{" "}
            <span className="text-muted">add text here.</span>
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              className="inline-block border border-foreground px-8 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
            >
              get in touch
            </Link>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
