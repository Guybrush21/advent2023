import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import {
  betterCalibration,
  calibration,
  getEntryBetterCalibration,
} from "./day1.ts";

Deno.test("D01.1: calibration", () => {
  const data = `1abc2
                pqr3stu8vwx
                a1b2c3d4e5f
                treb7uchet`;

  assertEquals(calibration(data.split("\n")), 142);
});

Deno.test("D01.2: better calibration", () => {
  const data = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

  assertEquals(betterCalibration(data.split("\n")), 281);
});

Deno.test("Better calculation", () => {
  assertEquals(getEntryBetterCalibration("two1nine"), 29);
  assertEquals(getEntryBetterCalibration("eightwothree"), 83);
});
