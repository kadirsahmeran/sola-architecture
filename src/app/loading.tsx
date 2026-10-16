export default function Loading() {
  return (
    <div className="min-h-svh bg-canvas" aria-busy="true" aria-live="polite">
      <span className="sr-only">Yükleniyor</span>
    </div>
  );
}
