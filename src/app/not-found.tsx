import Link from "next/link";

export default function NotFound() {
  return (
    <div className="editorial flex min-h-[70svh] flex-col justify-end pb-20 pt-40">
      <p className="label">404</p>
      <h1 className="mt-4 max-w-3xl font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.92]">
        Aradığınız sayfa yok.
      </h1>
      <p className="mt-6 max-w-md text-muted">
        Adres değişmiş ya da hiç açılmamış olabilir. Projelere ya da ana sayfaya dönebilirsiniz.
      </p>
      <div className="mt-8 flex gap-6 text-sm tracking-[0.14em] uppercase">
        <Link href="/" className="link-underline">
          Ana sayfa
        </Link>
        <Link href="/projeler" className="link-underline">
          Projeler
        </Link>
      </div>
    </div>
  );
}
