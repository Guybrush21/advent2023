import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import {
  getPreviousHistory,
  mirage,
  mirageBack,
  nextHistory,
  parseData,
  prevHistory,
} from "./day9.ts";
const data = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

Deno.test("D09.1", () => {
  assertEquals(mirage(data), 114);
});

Deno.test("D09.2", () => {
  assertEquals(mirageBack(data), 2);
});

Deno.test("D09 next history", () => {
  const history = [0, 3, 6, 9, 12, 15, 18];
  assertEquals(nextHistory(history), 21);
});
Deno.test("D09 previous history generation", () => {
  const history = [0, 3, 6, 9, 12, 15, 18];
  assertEquals(getPreviousHistory(history), [3, 3, 3, 3, 3, 3]);
});
Deno.test("D09 back history", () => {
  let history = [0, 3, 6, 9, 12, 15, 18];
  assertEquals(prevHistory(history), -3);
  history = [10, 13, 16, 21, 30, 45];
  assertEquals(prevHistory(history), 5);
});
Deno.test("D09 parse", () => {
  const data = `0 3 6 9 12 15`;
  const history = [[0, 3, 6, 9, 12, 15]];
  assertEquals(parseData(data), history);
});
