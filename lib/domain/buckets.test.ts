import { describe, it, expect } from "vitest";
import { BUCKETS, getBucket, bucketHours } from "./buckets";

describe("buckets", () => {
  it("has the three expected buckets in order", () => {
    expect(BUCKETS.map((b) => b.id)).toEqual(["morning", "afternoon", "evening"]);
  });

  it("getBucket returns the matching bucket", () => {
    expect(getBucket("afternoon").startHour).toBe(12);
  });

  it("getBucket throws on an unknown id", () => {
    // @ts-expect-error — testing the runtime guard with an invalid id
    expect(() => getBucket("night")).toThrow();
  });

  it("bucketHours formats the display range", () => {
    expect(bucketHours("morning")).toBe("7:00–12:00");
  });

  it("buckets do not overlap and cover a continuous span", () => {
    for (let i = 1; i < BUCKETS.length; i++) {
      expect(BUCKETS[i].startHour).toBe(BUCKETS[i - 1].endHour);
    }
  });
});
