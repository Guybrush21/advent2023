import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import {
  gearRatio,
  gearRatioMultiply,
  getAdjacent,
  searchAdjacent,
} from "./day3.ts";

Deno.test("D03.1", () => {
  const data = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

  const result = gearRatio(data);
  assertEquals(result, 4361);
});

Deno.test("D03.2", () => {
  const data = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

  const result = gearRatioMultiply(data);
  assertEquals(result, 467835);
});

Deno.test("D03 getAdjacent", () => {
  const data = `467..114...`;
  assertEquals(getAdjacent(data, 0), 467);
  assertEquals(getAdjacent(data, 1), 467);
  assertEquals(getAdjacent(data, 2), 467);
  assertEquals(getAdjacent(data, 5), 114);
  assertEquals(getAdjacent(data, 6), 114);
  assertEquals(getAdjacent(data, 7), 114);
  assertEquals(getAdjacent(data, 10), 0);
});

Deno.test("D03 searchAdjacent", () => {
  //prettierignore
  const befo = `617*......`;
  const curr = `.....+58..`;
  const next = `..592.....`;

  assertEquals(
    searchAdjacent(curr, next, befo, 5).reduce((p, v) => p + v),
    58 + 592,
  );
});
