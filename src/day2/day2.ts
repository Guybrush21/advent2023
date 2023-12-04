import { logger } from "../log.ts";

export function gamecube(data: string): number {
  const dataArray = data.split("\n");

  const maxBlue = 14;
  const maxRed = 12;
  const maxGreen = 13;

  let sumOfPossibleGameIds = 0;
  for (const row of dataArray) {
    if (!row) continue;
    const gameId = getGameId(row);

    const games = row.split(":").at(1);
    if (!games) continue;

    const maxColors = getMaxColorForPlays(games);

    if (
      maxColors.green <= maxGreen &&
      maxColors.red <= maxRed &&
      maxColors.blue <= maxBlue
    ) {
      logger.debug(`VALID: ${row}`);
      sumOfPossibleGameIds += gameId;
    }
  }

  return sumOfPossibleGameIds;
}

export interface Colors {
  red: number;
  blue: number;
  green: number;
}

export function powerOfCubes(data: string) {
  const dataArray = data.split("\n");

  const maxBlue = 14;
  const maxRed = 12;
  const maxGreen = 13;

  let sumOfPowerOfCubes = 0;
  for (const row of dataArray) {
    if (!row) continue;
    const gameId = getGameId(row);

    const games = row.split(":").at(1);
    if (!games) continue;

    const maxColors = getMaxColorForPlays(games);
    const powerOfCurrentGame = maxColors.red * maxColors.blue * maxColors.green;
    sumOfPowerOfCubes += powerOfCurrentGame;
  }
  return sumOfPowerOfCubes;
}

export function getMaxColorForPlays(plays: string) {
  const maxColor: Colors = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const game of plays.split(";")) {
    if (!game) continue;
    for (let entry of game.split(",")) {
      //entry eg: 4 blue
      entry = entry.trim();
      const numberPart = entry.split(" ").at(0);

      let number = 0;
      if (numberPart && !isNaN(parseInt(numberPart)))
        number = parseInt(numberPart);

      if (entry.includes("blue"))
        if (number > maxColor.blue) maxColor.blue = number;

      if (entry.includes("green"))
        if (number > maxColor.green) maxColor.green = number;

      if (entry.includes("red"))
        if (number > maxColor.red) maxColor.red = number;
    }
  }

  return maxColor;
}

export function getGameId(row: string) {
  // exampleRow
  // Game 12: 3 blue, 4 red; 14 blue, 1 green, 3 red

  const firstPart = row.split(":").at(0);
  if (!firstPart) throw new Error("Cannot parse gameid from row.");

  const numberPart = firstPart.split(" ").at(1);
  if (!numberPart) throw new Error("Cannot parse gameid from row.");

  const number = parseInt(numberPart);
  if (isNaN(number))
    throw new Error("Cannot parse number from first row segment.");
  return number;
}

export async function solve21() {
  const data = await Deno.readTextFile("data/2.data");
  return gamecube(data);
}

export async function solve22() {
  const data = await Deno.readTextFile("data/2.data");
  return powerOfCubes(data);
}
