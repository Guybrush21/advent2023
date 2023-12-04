import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import {
  gamecube,
  getGameId,
  getMaxColorForPlays,
  powerOfCubes,
} from "./day2.ts";

Deno.test("D02.1", () => {
  const data = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

  const result = gamecube(data);
  assertEquals(result, 8);
});

Deno.test("D02.2", () => {
  const data = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

  const result = powerOfCubes(data);
  assertEquals(result, 2286);
});

Deno.test("D02: GameId", () => {
  let gameid = getGameId(
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
  );
  assertEquals(gameid, 5);
  gameid = getGameId("Game 18: 8 red, 3 blue, 3 green; 2 blue, 1 red, 2 green");
  assertEquals(gameid, 18);
});

Deno.test("D02: MaxColors", () => {
  let game = "6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";
  let maxColors = getMaxColorForPlays(game);

  assertEquals(maxColors.red, 6);
  assertEquals(maxColors.green, 3);
  assertEquals(maxColors.blue, 2);

  game = "6 green, 11 blue, 3 green; 2 blue, 2 green";
  maxColors = getMaxColorForPlays(game);
  assertEquals(maxColors.red, 0);
  assertEquals(maxColors.green, 6);
  assertEquals(maxColors.blue, 11);
});
