import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { boatRace, getRaceWinningOptions, parseRace } from "./day6.ts";
const data = `Time:      7  15   30
Distance:  9  40  200`;
Deno.test("D06.1 BOAT RACE", () => {
  assertEquals(boatRace(data), 288);
});

Deno.test("D06 Winning Options", () => {
  assertEquals(getRaceWinningOptions({ time: 7, distance: 9 }), 4);
  assertEquals(getRaceWinningOptions({ time: 15, distance: 40 }), 8);
  assertEquals(getRaceWinningOptions({ time: 30, distance: 200 }), 9);
});

Deno.test("D06 Parse Races", () => {
  assertEquals(parseRace(data), [
    {
      time: 7,
      distance: 9,
    },
    {
      time: 15,
      distance: 40,
    },
    {
      time: 30,
      distance: 200,
    },
  ]);
});
