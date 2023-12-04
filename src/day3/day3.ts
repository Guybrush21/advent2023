import { logger } from "../log.ts";

const notSymbols = [".", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export function gearRatio(data: string): number {
  const dataArray = data.split("\n");
  let total = 0;
  for (let i = 0; i < dataArray.length; i++) {
    const currentRow = dataArray[i];
    let previousRow = "",
      nextRow = "";

    if (i > 0) previousRow = dataArray[i - 1];
    if (i < dataArray.length) nextRow = dataArray[i + 1];

    for (let rowIndex = 0; rowIndex < currentRow.length; rowIndex++) {
      if (!notSymbols.includes(currentRow[rowIndex])) {
        const adjacentNumber = searchAdjacent(
          currentRow,
          nextRow,
          previousRow,
          rowIndex,
        );
        total += adjacentNumber.reduce((p, c) => p + c, 0);
      }
    }
  }
  return total;
}

export function searchAdjacent(
  currentRow: string,
  nextRow: string,
  previousRow: string,
  index: number,
): number[] {
  const numbers: Set<number> = new Set<number>();

  if (previousRow != "") {
    numbers.add(getAdjacent(previousRow, index));
    numbers.add(getAdjacent(previousRow, index + 1));
    numbers.add(getAdjacent(previousRow, index - 1));
  }
  numbers.add(getAdjacent(currentRow, index));
  numbers.add(getAdjacent(currentRow, index + 1));
  numbers.add(getAdjacent(currentRow, index - 1));
  if (nextRow != "") {
    numbers.add(getAdjacent(nextRow, index));
    numbers.add(getAdjacent(nextRow, index + 1));
    numbers.add(getAdjacent(nextRow, index - 1));
  }

  return Array.from(numbers);
}

export function getAdjacent(row: string, index: number): number {
  logger.debug({ row, index, char: row[index] });
  if (NUMBERS.includes(row[index])) {
    if (index > 0 && NUMBERS.includes(row[index - 1]))
      return getAdjacent(row, index - 1);
    else {
      logger.debug(row.substring(index, 3));
      return parseInt(row.substring(index, index + 3));
    }
  }
  return 0;
}

export function gearRatioMultiply(data: string) {
  const dataArray = data.split("\n");
  let total = 0;
  for (let i = 0; i < dataArray.length; i++) {
    const currentRow = dataArray[i];
    let previousRow = "",
      nextRow = "";

    if (i > 0) previousRow = dataArray[i - 1];
    if (i < dataArray.length) nextRow = dataArray[i + 1];

    for (let rowIndex = 0; rowIndex < currentRow.length; rowIndex++) {
      if (currentRow[rowIndex] === "*") {
        const adjacentNumber = searchAdjacent(
          currentRow,
          nextRow,
          previousRow,
          rowIndex,
        ).filter((x) => x != 0);
        if (adjacentNumber.length > 1)
          total += adjacentNumber.reduce((p, c) => p * c, 1);
      }
    }
  }
  return total;
}

export async function solve31() {
  const data = await Deno.readTextFile("data/3.data");
  return gearRatio(data);
}
export async function solve32() {
  const data = await Deno.readTextFile("data/3.data");
  return gearRatioMultiply(data);
}
