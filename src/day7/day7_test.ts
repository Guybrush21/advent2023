import {
  assertEquals,
  assertLessOrEqual,
  assertGreaterOrEqual,
} from "https://deno.land/std@0.208.0/assert/mod.ts";
import {
  HandType,
  buildDeck,
  camelCards,
  cardCompare,
  getHandType,
  handleJokerForType,
} from "./day7.ts";

const data = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

Deno.test("D07.1 Camel Cards", () => {
  assertEquals(camelCards(data), 6440);
});

Deno.test("D07.2 Camel Cards Joker", () => {
  assertEquals(camelCards(data.replaceAll("J", "*")), 5905);
});

Deno.test("D07 build Deck", () => {
  const deck = `32T3K 765
T55J5 684`;
  assertEquals(buildDeck(deck), [
    { type: HandType.ONE_PAIR, hand: "32T3K", bid: 765 },
    { type: HandType.THREE_KIND, hand: "T55J5", bid: 684 },
  ]);
});

Deno.test("D07 getHandType", () => {
  assertEquals(getHandType("AAAAA"), HandType.FIVE_KIND);
  assertEquals(getHandType("AAKAA"), HandType.FOUR_KIND);
  assertEquals(getHandType("KAAAA"), HandType.FOUR_KIND);
  assertEquals(getHandType("AA33A"), HandType.FULL);
  assertEquals(getHandType("3KAAA"), HandType.THREE_KIND);
  assertEquals(getHandType("AAQQT"), HandType.TWO_PAIR);
  assertEquals(getHandType("AWQQA"), HandType.TWO_PAIR);
  assertEquals(getHandType("ATAQQ"), HandType.TWO_PAIR);
  assertEquals(getHandType("TT891"), HandType.ONE_PAIR);
  assertEquals(getHandType("T8891"), HandType.ONE_PAIR);
  assertEquals(getHandType("189K1"), HandType.ONE_PAIR);
  assertEquals(getHandType("23489"), HandType.HIGH_CARD);
});

Deno.test("D07 cardCompare", () => {
  assertLessOrEqual(
    cardCompare(
      { type: HandType.ONE_PAIR, hand: "AA234", bid: 1 },
      { type: HandType.TWO_PAIR, hand: "AA224", bid: 1 },
    ),
    -1,
  );
  assertLessOrEqual(
    cardCompare(
      { type: HandType.ONE_PAIR, hand: "2A234", bid: 1 },
      { type: HandType.ONE_PAIR, hand: "AA224", bid: 1 },
    ),
    -1,
  );
  assertGreaterOrEqual(
    cardCompare(
      { type: HandType.FIVE_KIND, hand: "2A234", bid: 1 },
      { type: HandType.ONE_PAIR, hand: "AA224", bid: 1 },
    ),
    1,
  );
  assertLessOrEqual(
    cardCompare(
      { type: HandType.ONE_PAIR, hand: "AA224", bid: 1 },
      { type: HandType.ONE_PAIR, hand: "AA224", bid: 1 },
    ),
    0,
  );
  assertLessOrEqual(
    cardCompare(
      { type: HandType.ONE_PAIR, hand: "*KKK2", bid: 1 },
      { type: HandType.ONE_PAIR, hand: "QQQQ2", bid: 1 },
    ),
    -1,
  );
});

Deno.test("D07 handle Joker", () => {
  assertEquals(
    handleJokerForType({ hand: "2345*", bid: 1, type: HandType.HIGH_CARD })
      .type,
    HandType.ONE_PAIR,
  );
  assertEquals(
    handleJokerForType({ hand: "2245*", bid: 1, type: HandType.ONE_PAIR }).type,
    HandType.THREE_KIND,
  );
  assertEquals(
    handleJokerForType({ hand: "2255*", bid: 1, type: HandType.TWO_PAIR }).type,
    HandType.FULL,
  );
  assertEquals(
    handleJokerForType({ hand: "2225*", bid: 1, type: HandType.THREE_KIND })
      .type,
    HandType.FOUR_KIND,
  );
  assertEquals(
    handleJokerForType({ hand: "2222*", bid: 1, type: HandType.FOUR_KIND })
      .type,
    HandType.FIVE_KIND,
  );
  assertEquals(
    handleJokerForType({ hand: "234**", bid: 1, type: HandType.ONE_PAIR }).type,
    HandType.THREE_KIND,
  );
  assertEquals(
    handleJokerForType({ hand: "233**", bid: 1, type: HandType.TWO_PAIR }).type,
    HandType.FOUR_KIND,
  );
  assertEquals(
    handleJokerForType({ hand: "333**", bid: 1, type: HandType.FULL }).type,
    HandType.FIVE_KIND,
  );
  assertEquals(
    handleJokerForType({ hand: "12***", bid: 1, type: HandType.THREE_KIND })
      .type,
    HandType.FOUR_KIND,
  );
  assertEquals(
    handleJokerForType({ hand: "*2225", bid: 1, type: HandType.THREE_KIND })
      .type,
    HandType.FOUR_KIND,
  );
  assertEquals(
    handleJokerForType({ hand: "22***", bid: 1, type: HandType.FULL }).type,
    HandType.FIVE_KIND,
  );
  assertEquals(
    handleJokerForType({ hand: "*****", bid: 1, type: HandType.FIVE_KIND })
      .type,
    HandType.FIVE_KIND,
  );
  assertEquals(
    handleJokerForType({ hand: "2****", bid: 1, type: HandType.FOUR_KIND })
      .type,
    HandType.FIVE_KIND,
  );
  assertEquals(
    handleJokerForType({ hand: "2222*", bid: 1, type: HandType.FOUR_KIND })
      .type,
    HandType.FIVE_KIND,
  );
});
