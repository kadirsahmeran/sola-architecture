"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="editorial flex min-h-[70svh] flex-col justify-end pb-20 pt-40">
      <p className="label">Hata</p>
      <h1 className="mt-4 max-w-3xl font-serif text-6xl leading-[0.95]">
        Bu sayfa şu anda açılamadı.
      </h1>
      <p className="mt-6 max-w-md text-muted">
        Bağlantı ya da geçici bir sorun olabilir. Yeniden deneyebilirsiniz.
      </p>
      <button
        type="button"
        onClick={reset}
        className="btn-sweep mt-8 w-full max-w-xs border border-ink bg-ink text-paper [--sweep:#F5F3EF] hover:border-paper hover:text-ink sm:w-auto"
      >
        Yeniden dene
      </button>
    </div>
  );
}
