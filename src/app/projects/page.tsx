"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { GITHUB_URL } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <h1 className="mb-2 text-3xl font-medium sm:text-4xl">work</h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mb-12 text-muted">
            placeholder add text here.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
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
      </div>
    </div>
  );
}
