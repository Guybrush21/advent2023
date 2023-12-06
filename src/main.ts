import { solveFirst, solveSecond } from "./day1/day1.ts";
import { solve21, solve22 } from "./day2/day2.ts";
import { solve31, solve32 } from "./day3/day3.ts";
import { solve41, solve42 } from "./day4/day4.ts";
// deno-lint-ignore no-unused-vars
import { solve51, solve52 } from "./day5/day5.ts";
import { solve61 } from "./day6/day6.ts";
import { logger } from "./log.ts";

if (import.meta.main) {
  logger.info("AOC - 2023");
  logger.info("=== Day 1 ===");
  const day1_1 = await solveFirst();
  logger.info(`Day 1 calibration:  ${day1_1}`);
  const day1_2 = await solveSecond();
  logger.info(`Day 1 better calibration:  ${day1_2}`);

  logger.info("=== Day 2 ===");
  const day2_1 = await solve21();
  logger.info(`Day 2 gamecube:  ${day2_1}`);
  const day2_2 = await solve22();
  logger.info(`Day 2 power of cubes:  ${day2_2}`);

  logger.info("=== Day 3 ===");
  const day3_1 = await solve31();
  logger.info(`Day 2 Gear Ratio:  ${day3_1}`);
  logger.info(`Day 3 Gear Ratio Multiplier: ${await solve32()}`);

  logger.info("=== Day 4 ===");
  const day4_1 = await solve41();
  logger.info(`Day 4 Scratchcards:  ${day4_1}`);
  const day4_2 = await solve42();
  logger.info(`Day 4 Scratchcards copies:  ${day4_2}`);

  logger.info("=== Day 5 ===");
  const s51 = await solve51();
  logger.info(`Day 5 Almanac lowest location:  ${s51}`);
  // const s52 = await solve52();
  // logger.info(`Day 5 Almanac full seeds lowest location:  ${s52}`);
  logger.info("=== Day 6 ===");
  const s61 = await solve61();
  logger.info(`Day 6 Racing options:  ${s61}`);
}
