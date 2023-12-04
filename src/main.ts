import { solveFirst, solveSecond } from "./day1/day1.ts";
import { solve21 } from "./day2/day2.ts";
import { logger } from "./log.ts";

if (import.meta.main) {
  logger.info("AOC - 2023");
  logger.info("Day 1 - First Part");
  const day1_1 = await solveFirst();
  logger.info(`Day 1 calibration:  ${day1_1}`);
  const day1_2 = await solveSecond();
  logger.info(`Day 1 better calibration:  ${day1_2}`);

  logger.info("Day 2 - First Part");
  const day2_1 = await solve21();
  logger.info(`Day 2 gamecube:  ${day2_1}`);
}
