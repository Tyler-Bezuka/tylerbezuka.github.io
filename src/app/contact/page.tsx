"use client";

import { FadeIn } from "@/components/animations/FadeIn";
import { GITHUB_URL } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";

const links = [
  { name: "email", href: "mailto:hello@tylerbezuka.com", color: "text-green" },
  { name: "github", href: GITHUB_URL, color: "text-orange" },
  { name: "linkedin", href: "https://linkedin.com/in/tylerbezuka", color: "text-blue" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <h1 className="mb-2 text-3xl font-medium sm:text-4xl">contact</h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mb-12 text-muted">
            placeholder add text here.
          </p>
        </FadeIn>

        <div className="space-y-0">
          {links.map((link, index) => (
            <FadeIn key={link.name} delay={0.2 + index * 0.1}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between border-b border-card-border py-4 transition-all hover:border-muted hover:pl-2"
              >
                <span className={`text-base font-medium sm:text-lg ${link.color}`}>
                  {link.name}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted transition-colors group-hover:text-foreground" />
              </a>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <p className="mt-12 text-sm text-muted">nyc</p>
        </FadeIn>
      </div>
    </div>
  );
}
