import { logger } from "../log.ts";

export enum HandType {
  HIGH_CARD = 1,
  ONE_PAIR = 2,
  TWO_PAIR = 3,
  THREE_KIND = 4,
  FULL = 5,
  FOUR_KIND = 6,
  FIVE_KIND = 7,
}

interface CardHand {
  hand: string;
  bid: number;
  type: HandType;
}

export const Card = {
  "*": 0,
  "2": 1,
  "3": 2,
  "4": 5,
  "5": 6,
  "6": 7,
  "7": 8,
  "8": 9,
  "9": 10,
  T: 11,
  J: 12,
  Q: 13,
  K: 14,
  A: 15,
};

export function getHandType(hand: string): HandType {
  const sorted = Array.from(hand).sort();
  logger.debug(sorted.join(""));

  if (sorted[0] === sorted[4]) return HandType.FIVE_KIND;
  if (sorted[0] === sorted[3] || sorted[1] === sorted[4])
    return HandType.FOUR_KIND;
  if (
    (sorted[0] === sorted[2] && sorted[3] === sorted[4]) ||
    (sorted[0] === sorted[1] && sorted[2] === sorted[4])
  )
    return HandType.FULL;
  if (
    sorted[0] === sorted[2] ||
    sorted[1] === sorted[3] ||
    sorted[2] === sorted[4]
  )
    return HandType.THREE_KIND;
  if (
    (sorted[0] === sorted[1] && sorted[2] === sorted[3]) ||
    (sorted[0] === sorted[1] && sorted[3] === sorted[4]) ||
    (sorted[1] === sorted[2] && sorted[3] === sorted[4])
  )
    return HandType.TWO_PAIR;
  if (
    sorted[0] === sorted[1] ||
    sorted[1] === sorted[2] ||
    sorted[2] === sorted[3] ||
    sorted[3] === sorted[4]
  )
    return HandType.ONE_PAIR;
  return HandType.HIGH_CARD;
}

export function buildDeck(data: string): CardHand[] {
  const result: CardHand[] = [];

  for (const row of data.split("\n")) {
    if (!row) continue;
    const hand = row.split(" ").at(0);
    const bid = Number(row.split(" ").at(1));
    if (!!hand && !!bid) {
      let card = {
        hand,
        bid,
        type: getHandType(hand),
      };

      if (hand.includes("*")) {
        card = handleJokerForType(card);
      }

      result.push(card);
    } else {
      logger.error({ bid, hand, row });
      throw new Error("Error while parsing card");
    }
  }

  return result;
}

export function cardCompare(a: CardHand, b: CardHand): number {
  if (a.type === b.type) {
    for (let i = 0; i < a.hand.length; i++) {
      const avalue = Card[a.hand[i] as keyof typeof Card];
      const bvalue = Card[b.hand[i] as keyof typeof Card];
      if (avalue !== bvalue) return avalue - bvalue;
    }
    return 0;
  }
  return a.type - b.type;
}

export function camelCards(data: string) {
  const deck = buildDeck(data);
  const sorted = deck.sort(cardCompare);
  logger.debug(sorted.map((x) => x.hand).join("\n"));

  let result = 0;
  for (let i = 1; i <= sorted.length; i++) {
    const win = i * sorted[i - 1].bid;
    logger.debug({ i, current: sorted[i - 1], win, result });
    logger.debug(
      `i:${i} - hand: ${sorted[i - 1].hand} ${HandType[sorted[i - 1].type]} `,
    );
    result += win;
  }

  return result;
}

export async function solve71() {
  const data = await Deno.readTextFile("data/7.data");

  return camelCards(data);
}

export async function solve72() {
  const data = await Deno.readTextFile("data/7.data");
  const dataWithJoker = data.replaceAll("J", "*");
  return camelCards(dataWithJoker);
}

export function handleJokerForType(card: CardHand): CardHand {
  let numberOfJoker = 0;
  for (const c of card.hand) if (c === "*") numberOfJoker++;
  if (
    (numberOfJoker === 1 && card.type === HandType.ONE_PAIR) ||
    (numberOfJoker === 1 && card.type === HandType.TWO_PAIR) ||
    (numberOfJoker === 2 && card.type === HandType.TWO_PAIR) ||
    (numberOfJoker === 1 && card.type === HandType.THREE_KIND)
  )
    numberOfJoker++;
  else if (numberOfJoker === 3 && card.type === HandType.THREE_KIND)
    numberOfJoker--;

  let newType = card.type + numberOfJoker;
  if (newType > HandType.FIVE_KIND) newType = HandType.FIVE_KIND;
  return { ...card, type: newType };
}
