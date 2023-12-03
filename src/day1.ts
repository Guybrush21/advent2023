import { logger } from "./log.ts";

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
