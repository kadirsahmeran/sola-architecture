type Bucket = number[];

const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  if (buckets.size > 500) {
    for (const [entry, times] of buckets) {
      const fresh = times.filter((time) => now - time < windowMs);
      if (fresh.length === 0) buckets.delete(entry);
      else buckets.set(entry, fresh);
    }
  }
  const recent = (buckets.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  return true;
}
