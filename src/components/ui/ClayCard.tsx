import type { HTMLAttributes, ReactNode } from "react";

type ClayCardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "article" | "section" | "aside" | "div";
  interactive?: boolean;
};

export function ClayCard({
  as: Component = "section",
  children,
  className = "",
  interactive = false,
  ...props
}: ClayCardProps) {
  return (
    <Component
      className={`relative overflow-hidden rounded-[32px] bg-white/70 p-6 text-clay-foreground shadow-clayCard backdrop-blur-xl transition-all duration-500 sm:p-8 ${
        interactive ? "hover:-translate-y-2 hover:scale-[1.01]" : ""
      } ${className}`}
      {...props}
    >
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </Component>
  );
}
