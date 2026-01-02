"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { GITHUB_URL } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export function ProjectsPreview() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <p className="text-sm uppercase tracking-widest text-muted mb-8">work</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <motion.a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-2xl font-medium text-green transition-colors hover:text-foreground sm:text-3xl"
            whileHover={{ x: 4 }}
          >
            github
            <ArrowUpRight className="h-5 w-5 text-muted transition-colors group-hover:text-foreground" />
          </motion.a>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-8 text-muted max-w-md">
            placeholder add text here.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
