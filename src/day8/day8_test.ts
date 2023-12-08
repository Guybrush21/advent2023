import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import {
  parseMap,
  parseNetwork,
  navigate,
  escapeDesert,
  escapeGhost,
} from "./day8.ts";
const data = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const ghostData = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

Deno.test("D08.1", () => {
  assertEquals(escapeDesert(data), 6);
});

Deno.test("D08.2", () => {
  assertEquals(escapeGhost(ghostData), 6);
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
