export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <header className="editorial pb-12 pt-8 md:pb-20">
      <p className="label">{eyebrow}</p>
      <h1 className="mt-5 max-w-5xl font-serif text-[clamp(3rem,7vw,6.4rem)] leading-[0.9]">
        {title}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{text}</p>
    </header>
  );
}
