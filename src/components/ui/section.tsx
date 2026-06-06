type SectionProps = Readonly<{
  title: string;
  description: string;
}>;

export function Section({ title, description }: SectionProps) {
  return (
    <section className="rounded-2xl border bg-white/70 p-6">
      <h2 className="text-lg font-semibold text-[#142013]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-[#495747]">{description}</p>
    </section>
  );
}
