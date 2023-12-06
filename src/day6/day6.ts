import { logger } from "../log.ts";

interface Race {
  time: number;
  distance: number;
}

export function boatRace(data: string) {
  const races = parseRace(data);
  logger.info(races);
  const options: number[] = [];
  for (const race of races) {
    options.push(getRaceWinningOptions(race));
  }
  return options.reduce((p, c) => p * c);
}

export function getRaceWinningOptions(race: Race) {
  let options = 0;

  for (let i = 0; i < race.time; i++) {
    const velocity = i;
    const distance = velocity * (race.time - i);
    const isWin = distance > race.distance;
    if (isWin) {
      logger.debug({ mess: "WIN", velocity, distance });
      options++;
    }
  }

  return options;
}

export async function solve61() {
  const data = await Deno.readTextFile("data/6.data");
  return boatRace(data);
}

export function solve62() {
  return boatRace(`Time: 55999793
Distance: 401148522741405`);
}

export function parseRace(data: string) {
  const times = data.split("\n").at(0)?.replace("Time:", "").trim().split("  ");
  const distances = data
    .split("\n")
    .at(1)
    ?.replace("Distance:", "")
    .trim()
    .split("  ");
  logger.debug({ times, distances });
  if (!times || !distances)
    throw new Error("Error occurred while parsing data.");

  const races: Race[] = [];

  for (let i = 0; i < times.length; i++) {
    races.push({
      time: parseInt(times[i]),
      distance: parseInt(distances[i]),
    });
  }

  return races;
}
