import { logger } from "../log.ts";

export function scratcards(data: string) {
  const cards = data.split("\n");
  let total = 0;

  for (const card of cards) {
    if (!card) continue;

    const winningNumbersString = card
      .split(":")[1]
      .split("|")[0]
      .trim()
      .split(" ");
    if (!winningNumbersString) {
      logger.error("Unable to parse card for winning numbers.");
      logger.error(card);
      throw new Error("Unable to parse card for winning numbers.");
    }
    const playedNumbersStr = card.split(":")[1].split("|")[1].split(" ");
    if (!playedNumbersStr) {
      logger.error("Unable to parse card for plays.");
      logger.error(card);
      throw new Error("Unable to parse card for plays.");
    }
    const winningNumbers: number[] = winningNumbersString.map((x) =>
      parseInt(x.trim())
    );
    const playedNumbers: number[] = playedNumbersStr.map((x) =>
      parseInt(x.trim())
    );

    const matches = playedNumbers.filter(
      (x) => !isNaN(x) && winningNumbers.includes(x)
    );
    logger.info(matches.sort());
    let result = 0;
    if (matches.length >= 1) result = Math.pow(2, matches.length - 1);
    logger.info({ winningNumbers, playedNumbers });
    logger.debug({ card, matches, result, total });

    total += result;
  }

  return total;
}

export async function solve41() {
  const data = await Deno.readTextFile("data/4.data");
  return scratcards(data);
}
