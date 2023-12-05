import { logger } from "../log.ts";

export function scratcards(data: string) {
  const cards = data.replaceAll("  ", " ").split("\n");
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
      parseInt(x.trim()),
    );
    const playedNumbers: number[] = playedNumbersStr.map((x) =>
      parseInt(x.trim()),
    );

    const matches = playedNumbers.filter((x) => winningNumbers.includes(x));
    logger.debug(matches.sort());
    let result = 0;
    if (matches.length >= 1) result = Math.pow(2, matches.length - 1);
    logger.debug({ winningNumbers, playedNumbers });
    logger.debug({ card, matches, result, total });

    total += result;
  }

  return total;
}

class ScratchCard {
  id: number;
  winningNumbers: number[];
  playedNumbers: number[];
  matches: number;
  copies = 1;
  constructor(card: string) {
    try {
      const idPart = card.split(":")[0].replaceAll("Card ", "").trim();
      if (isNaN(parseInt(idPart)))
        throw new Error("Unable to parse id for card.");

      const winningNumbersString = card
        .split(":")[1]
        .split("|")[0]
        .trim()
        .split(" ");
      if (!winningNumbersString) {
        throw new Error("Unable to parse card for winning numbers.");
      }

      const playedNumbersStr = card.split(":")[1].split("|")[1].split(" ");
      if (!playedNumbersStr) {
        throw new Error("Unable to parse card for plays.");
      }

      this.id = parseInt(idPart);
      this.winningNumbers = winningNumbersString.map((x) => parseInt(x.trim()));
      this.playedNumbers = playedNumbersStr.map((x) => parseInt(x.trim()));
      this.matches = this.playedNumbers.filter((x) =>
        this.winningNumbers.includes(x),
      ).length;
    } catch (e) {
      logger.error(e.message);
      logger.error(card);
      throw e;
    }
  }
}

export function countTotalScratchards(data: string): number {
  const rawCards = data.replaceAll("  ", " ").split("\n");
  const cards: ScratchCard[] = [];
  for (const card of rawCards) {
    if (!card) continue;
    cards.push(new ScratchCard(card));
  }

  for (const c of cards) {
    for (let ins = 1; ins <= c.copies; ins++)
      for (let w = 1; w <= c.matches; w++) {
        const toEdit = cards.find((x) => x.id == c.id + w);
        if (toEdit) toEdit.copies++;
      }
  }

  return cards.map((x) => x.copies).reduce((p, v) => p + v);
}

export async function solve41() {
  const data = await Deno.readTextFile("data/4.data");
  return scratcards(data);
}

export async function solve42() {
  const data = await Deno.readTextFile("data/4.data");
  return countTotalScratchards(data);
}
