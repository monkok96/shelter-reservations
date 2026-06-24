// Domain config: time-of-day buckets.
// Buckets are modeled as DATA (not hardcoded in the UI) so adding/retiming a bucket
// is a one-line change here — the rest of the app reads from this single source.
// See CLAUDE.md → "Model domain types as data, open for extension".

/** The shelter's local timezone — all bucket hours are interpreted in this zone. */
export const SHELTER_TIMEZONE = "Europe/Warsaw";

/** A coarse time-of-day slot. A dog has at most one walk per bucket per day. */
export type BucketId = "morning" | "afternoon" | "evening";

export type Bucket = {
  id: BucketId;
  label: string;
  /** Inclusive start hour (0–23) in shelter local time. */
  startHour: number;
  /** Exclusive end hour (1–24) in shelter local time. */
  endHour: number;
};

/** Ordered list — display order on the board follows this array. */
export const BUCKETS: readonly Bucket[] = [
  { id: "morning", label: "Morning", startHour: 7, endHour: 12 },
  { id: "afternoon", label: "Afternoon", startHour: 12, endHour: 17 },
  { id: "evening", label: "Evening", startHour: 17, endHour: 21 },
] as const;

/** Look up a bucket by id (e.g. when reading a walk row from the DB). */
export function getBucket(id: BucketId): Bucket {
  const bucket = BUCKETS.find((b) => b.id === id);
  if (!bucket) throw new Error(`Unknown bucket id: ${id}`);
  return bucket;
}

/** Human-readable hours for a bucket, e.g. "7:00–12:00" — for display only. */
export function bucketHours(id: BucketId): string {
  const { startHour, endHour } = getBucket(id);
  return `${startHour}:00–${endHour}:00`;
}
