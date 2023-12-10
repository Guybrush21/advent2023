import { logger } from "../log.ts";

export async function solve91() {
  const data = await Deno.readTextFile("data/9.data");
  return mirage(data);
}

export async function solve92() {
  const data = await Deno.readTextFile("data/9.data");
  return mirageBack(data);
}

export function mirage(data: string): number {
  const history = parseData(data);
  let result = 0;
  for (const h of history) {
    const next = nextHistory(h);
    logger.debug({ h, next });
    result += next;
  }
  return result;
}

export function nextHistory(history: number[]): number {
  const previous = getPreviousHistory(history);
  logger.debug(previous.join(","));
  if (previous.every((x) => x === 0)) return history[history.length - 1];
  else return history[history.length - 1] + nextHistory(previous);
}

export function getPreviousHistory(history: number[]): number[] {
  const result = [];
  for (let i = 0; i < history.length - 1; i++)
    result.push(history[i + 1] - history[i]);
  return result;
}

export function parseData(data: string): number[][] {
  const result = [];
  for (const row of data.split("\n")) {
    if (!row) continue;
    result.push(row.split(" ").map(Number));
  }
  return result;
}

export function prevHistory(history: number[]): number {
  const previous = getPreviousHistory(history);
  logger.debug(previous.join(","));
  if (previous.every((x) => x === 0)) return history[0];
  else return history[0] - prevHistory(previous);
}

export function mirageBack(data: string): number {
  const history = parseData(data);
  let result = 0;
  for (const h of history) {
    const next = prevHistory(h);
    logger.debug({ h, next });
    result += next;
  }
  return result;
}
