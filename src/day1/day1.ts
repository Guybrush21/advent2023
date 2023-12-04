import { logger } from "../log.ts";

export function calibration(data: string[]): number {
  let total = 0;
  for (const entry of data) {
    if (entry) {
      total += getEntryCalibration(entry);
      logger.debug(`Entry: ${entry}`);
      logger.debug(`Total: ${total}`);
    }
  }
  return total;
}

function getEntryCalibration(entry: string): number {
  let first: number | undefined = undefined;
  let last: number | undefined = undefined;

  for (let i = 0; i < entry.length; i++) {
    const parsed = parseInt(entry[i]);
    if (!isNaN(parsed)) last = parsed;
    if (!isNaN(parsed) && !first) first = parsed;
  }
  if (first && last) return first * 10 + last;
  else {
    logger.error({ first, last, entry });

    throw Error(
      "Something wrong occurred while searching for first and last digit.",
    );
  }
}

export async function solveFirst() {
  const data = await Deno.readTextFile("data/1.data");
  const dataArray = data.split("\n");
  return calibration(dataArray);
}

export function betterCalibration(data: string[]): number {
  let total = 0;
  for (const entry of data) {
    if (entry) {
      const result = getEntryBetterCalibration(entry);
      total += result;
      logger.debug({ entry, result, total });
    }
  }
  return total;
}

export function getEntryBetterCalibration(entry: string): number {
  let first = 0;
  let last = 0;
  let firstIndex = 1000;
  let lastIndex = -1;

  const targets = [
    { key: "1", value: 1 },
    { key: "2", value: 2 },
    { key: "3", value: 3 },
    { key: "4", value: 4 },
    { key: "5", value: 5 },
    { key: "6", value: 6 },
    { key: "7", value: 7 },
    { key: "8", value: 8 },
    { key: "9", value: 9 },
    { key: "one", value: 1 },
    { key: "two", value: 2 },
    { key: "three", value: 3 },
    { key: "four", value: 4 },
    { key: "five", value: 5 },
    { key: "six", value: 6 },
    { key: "seven", value: 7 },
    { key: "eight", value: 8 },
    { key: "nine", value: 9 },
  ];

  for (const match of targets) {
    const firstMatchIndex = entry.indexOf(match.key);
    if (firstMatchIndex > -1 && firstMatchIndex < firstIndex) {
      firstIndex = firstMatchIndex;
      first = match.value;
    }

    const lastMatchIndex = entry.lastIndexOf(match.key);
    if (lastMatchIndex > lastIndex) {
      lastIndex = lastMatchIndex;
      last = match.value;
    }
    logger.debug({
      entry,
      match,
      firstFound: firstMatchIndex,
      lastFound: lastMatchIndex,
      firstIndex,
      lastIndex,
    });
  }
  logger.debug({ first, last });
  if (!!first && !!last) return first * 10 + last;
  else {
    logger.error({ entry, first, last, firstIndex, lastIndex });
    throw Error(
      "Something wrong occurred while searching for first and last digit.",
    );
  }
}

export async function solveSecond() {
  const data = await Deno.readTextFile("data/1.data");
  const dataArray = data.split("\n");
  return betterCalibration(dataArray);
}
