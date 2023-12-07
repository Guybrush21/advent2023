import { logger } from "../log.ts";

export async function solveX1() {
  const data = await Deno.readTextFile("data/1.data");
  logger.info(data.length);
  return 0;
}
