"use client";

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-[#51624d] focus:ring-2 focus:ring-[#d9e5d4] ${props.className ?? ""}`}
    />
  );
}

export default Input;
