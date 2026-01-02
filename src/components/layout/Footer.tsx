import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { GITHUB_URL } from "@/lib/projects";

const socialLinks = [
  { icon: Github, href: GITHUB_URL, label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/tylerbezuka", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@tylerbezuka.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-card-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <p className="text-sm text-muted">© 2025</p>

        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-muted transition-colors hover:text-green"
              aria-label={link.label}
            >
              <link.icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
