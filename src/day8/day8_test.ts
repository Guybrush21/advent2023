import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { parseMap, parseNetwork, navigate, escapeDesert } from "./day8.ts";
const data = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

Deno.test("D08.1", () => {
  assertEquals(escapeDesert(data), 6);
});

Deno.test("D08 parseMap", () => {
  assertEquals(parseMap(data), {
    steps: "LLR",
    network: [
      {
        point: "AAA",
        left: "BBB",
        right: "BBB",
      },
      {
        point: "BBB",
        left: "AAA",
        right: "ZZZ",
      },
      {
        point: "ZZZ",
        left: "ZZZ",
        right: "ZZZ",
      },
    ],
  });
});

Deno.test("D08 parse network", () => {
  assertEquals(parseNetwork(data.split("\n\n")[1]), [
    {
      point: "AAA",
      left: "BBB",
      right: "BBB",
    },
    {
      point: "BBB",
      left: "AAA",
      right: "ZZZ",
    },
    {
      point: "ZZZ",
      left: "ZZZ",
      right: "ZZZ",
    },
  ]);
});

Deno.test("D08 navigate", () => {
  assertEquals(navigate(map), 6);
});

const map = {
  steps: "LLR",
  network: [
    {
      point: "AAA",
      left: "BBB",
      right: "BBB",
    },
    {
      point: "BBB",
      left: "AAA",
      right: "ZZZ",
    },
    {
      point: "ZZZ",
      left: "ZZZ",
      right: "ZZZ",
    },
  ],
};
