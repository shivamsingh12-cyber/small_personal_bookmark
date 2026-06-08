import React from "react";

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mt-8 rounded-[2rem] border border-dashed bg-white p-10 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4d5b48]">{title}</p>
      {description ? (
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#142013]">{description}</h2>
      ) : null}
    </div>
  );
}

export default EmptyState;
