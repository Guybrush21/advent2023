import { solveFirst } from "./day1.ts";
import { logger } from "./log.ts";

if (import.meta.main) {
  logger.info("AOC - 2023");
  logger.info("Day 1 - First Part");
  const day1_1 = await solveFirst();
  logger.info(`Day 1 calibration:  ${day1_1}`);
}
