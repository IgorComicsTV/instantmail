import type { InputHTMLAttributes } from "react";

export function ClayInput({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`flex h-16 w-full rounded-[20px] border-0 bg-clay-pressed px-6 py-4 text-lg font-bold text-clay-foreground shadow-clayPressed outline-none transition-all duration-200 placeholder:text-clay-muted focus:bg-white focus:ring-4 focus:ring-clay-accent/20 ${className}`}
      {...props}
    />
  );
}
