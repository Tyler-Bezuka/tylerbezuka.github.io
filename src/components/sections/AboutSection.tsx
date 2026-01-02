"use client";

import { FadeIn } from "@/components/animations/FadeIn";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 scroll-mt-24">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <p className="text-sm uppercase tracking-widest text-muted mb-8">about</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-2xl font-medium leading-relaxed sm:text-3xl max-w-3xl">
            <span className="text-muted">Placeholder add text here.</span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
