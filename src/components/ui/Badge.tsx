import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  const variants = {
    default: "bg-card border-card-border text-muted",
    accent: "bg-accent/10 border-accent/20 text-accent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
