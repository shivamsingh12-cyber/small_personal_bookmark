"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost";
};

export function Button({ variant = "default", className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    default: "bg-[#142013] text-white hover:bg-[#1d2c1c]",
    ghost: "bg-transparent text-[#142013] border border-transparent hover:bg-[#f3f6f2]",
  };

  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export default Button;
