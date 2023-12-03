import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { calibration } from "./day1.ts";

Deno.test("D01: calibration", () => {
  const data = `1abc2
                pqr3stu8vwx
                a1b2c3d4e5f
                treb7uchet`;

  assertEquals(calibration(data.split("\n")), 142);
});
