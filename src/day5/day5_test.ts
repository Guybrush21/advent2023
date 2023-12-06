import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { Almanac, FromToMap, minLocation } from "./day5.ts";
const data = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const t = new Almanac(data);

Deno.test("D05.1", () => {
  assertEquals(minLocation(t), 35);
});

Deno.test("parseSeeds", () => {
  assertEquals(t["parseSeeds"]("seeds: 79 14 55 13"), [79, 14, 55, 13]);
  assertEquals(t["parseSeeds"]("seeds: 7914 55 13  "), [7914, 55, 13]);
  assertEquals(t["parseSeeds"]("seeds: 13"), [13]);
});

Deno.test("parseMaps", () => {
  const parseSection = `seed-to-soil map:
50 98 2
52 50 48`;

  assertEquals(t["parseMap"](parseSection), [
    {
      source: 98,
      destination: 50,
      range: 2,
    },
    {
      source: 50,
      destination: 52,
      range: 48,
    },
  ]);
});

Deno.test("single navigate", () => {
  const maps: FromToMap[] = [
    {
      source: 98,
      destination: 50,
      range: 2,
    },
    {
      source: 50,
      destination: 52,
      range: 48,
    },
  ];
  assertEquals(t["navigate"](98, maps), 50);
  assertEquals(t["navigate"](99, maps), 51);
  assertEquals(t["navigate"](79, maps), 81);
  assertEquals(t["navigate"](14, maps), 14);
  assertEquals(t["navigate"](55, maps), 57);
  assertEquals(t["navigate"](13, maps), 13);
});

Deno.test("full navigation", () => {
  //Seed 79, soil 81, fertilizer 81, water 81, light 74, temperature 78, humidity 78, location 82
  let current = t.navigate(79, t.seedToSoil);
  assertEquals(current, 81);
  current = t.navigate(current, t.soilToFertilizer);
  assertEquals(current, 81);
  current = t.navigate(current, t.fertilizerToWater);
  assertEquals(current, 81);
  current = t.navigate(current, t.waterToLight);
  assertEquals(current, 74);
  current = t.navigate(current, t.lightToTemp);
  assertEquals(current, 78);
  current = t.navigate(current, t.tempToHumidity);
  assertEquals(current, 78);
  current = t.navigate(current, t.humidityToLocation);
  assertEquals(current, 82);
  //Seed 14, soil 14, fertilizer 53, water 49, light 42, temperature 42, humidity 43, location 43.
  current = t.navigate(14, t.seedToSoil);
  assertEquals(current, 14);
  current = t.navigate(current, t.soilToFertilizer);
  assertEquals(current, 53);
  current = t.navigate(current, t.fertilizerToWater);
  assertEquals(current, 49);
  current = t.navigate(current, t.waterToLight);
  assertEquals(current, 42);
  current = t.navigate(current, t.lightToTemp);
  assertEquals(current, 42);
  current = t.navigate(current, t.tempToHumidity);
  assertEquals(current, 43);
  current = t.navigate(current, t.humidityToLocation);
  assertEquals(current, 43);
  //Seed 55, soil 57, fertilizer 57, water 53, light 46, temperature 82, humidity 82, location 86.
  current = t.navigate(55, t.seedToSoil);
  assertEquals(current, 57);
  current = t.navigate(current, t.soilToFertilizer);
  assertEquals(current, 57);
  current = t.navigate(current, t.fertilizerToWater);
  assertEquals(current, 53);
  current = t.navigate(current, t.waterToLight);
  assertEquals(current, 46);
  current = t.navigate(current, t.lightToTemp);
  assertEquals(current, 82);
  current = t.navigate(current, t.tempToHumidity);
  assertEquals(current, 82);
  current = t.navigate(current, t.humidityToLocation);
  assertEquals(current, 86);

  //Seed 13, soil 13, fertilizer 52, water 41, light 34, temperature 34, humidity 35, location 35
  current = t.navigate(13, t.seedToSoil);
  assertEquals(current, 13);
  current = t.navigate(current, t.soilToFertilizer);
  assertEquals(current, 52);
  current = t.navigate(current, t.fertilizerToWater);
  assertEquals(current, 41);
  current = t.navigate(current, t.waterToLight);
  assertEquals(current, 34);
  current = t.navigate(current, t.lightToTemp);
  assertEquals(current, 34);
  current = t.navigate(current, t.tempToHumidity);
  assertEquals(current, 35);
  current = t.navigate(current, t.humidityToLocation);
  assertEquals(current, 35);
});
