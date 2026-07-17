export const SHELTER_TIMEZONE = "Europe/Warsaw";

export type BucketId = "morning" | "afternoon" | "evening";

export type Bucket = {
  id: BucketId;
  label: string;
  startHour: number;
  endHour: number;
};

export const BUCKETS: readonly Bucket[] = [
  { id: "morning", label: "Rano", startHour: 7, endHour: 12 },
  { id: "afternoon", label: "Popołudnie", startHour: 12, endHour: 17 },
  { id: "evening", label: "Wieczór", startHour: 17, endHour: 21 },
] as const;

export function getBucket(id: BucketId): Bucket {
  const bucket = BUCKETS.find((b) => b.id === id);
  if (!bucket) throw new Error(`Unknown bucket id: ${id}`);
  return bucket;
}

export function bucketHours(id: BucketId): string {
  const { startHour, endHour } = getBucket(id);
  return `${startHour}:00–${endHour}:00`;
}
