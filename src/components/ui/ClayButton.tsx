import type { ButtonHTMLAttributes, ReactNode } from "react";

type ClayButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "default" | "lg";
};

const variants = {
  primary:
    "bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] text-white shadow-clayButton hover:shadow-clayButtonHover",
  secondary: "bg-white/80 text-clay-foreground shadow-clayButton",
  ghost:
    "bg-transparent text-clay-foreground hover:bg-clay-accent/10 hover:text-clay-accent",
};

const sizes = {
  sm: "h-11 px-4 text-sm",
  default: "h-14 px-6 text-base",
  lg: "h-16 px-8 text-lg",
};

export function ClayButton({
  children,
  className = "",
  variant = "primary",
  size = "default",
  type = "button",
  ...props
}: ClayButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-[20px] font-bold tracking-wide transition-all duration-200 hover:-translate-y-1 active:scale-[0.92] active:shadow-clayPressed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-clay-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-clay-canvas disabled:pointer-events-none disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
