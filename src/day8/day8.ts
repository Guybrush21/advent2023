import { logger } from "../log.ts";

interface Network {
  point: string;
  left: string;
  right: string;
}

interface Map {
  steps: string;
  network: Network[];
}

export function escapeDesert(data: string): number {
  const map = parseMap(data);
  return navigate(map);
}

export function escapeGhost(data: string): number {
  const map = parseMap(data);
  return ghostNavigation(map);
}

const gcd = (a: number, b: number): number => (b == 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number): number => (a / gcd(a, b)) * b;
const lcmAll = (ns: number[]) => ns.reduce(lcm, 1);

export function ghostNavigation(map: Map): number {
  const steps: number[] = [];

  const ghostsPoint = map.network.filter((x) => x.point.endsWith("A"));

  for (const point of ghostsPoint) {
    let current = point.point;
    let step = 0;
    while (!current.endsWith("Z")) {
      const direction = map.steps[step % map.steps.length];
      const node = map.network.find((x) => x.point === current);
      if (node === undefined)
        throw new Error("Cannot navigate the network. Destination not found");
      if (direction == "L") current = node?.left;
      else current = node?.right;
      logger.debug({ current, direction, node });
      step++;
    }
    steps.push(step);
    step = 0;
  }
  logger.debug(steps);
  return lcmAll(steps);
}

export function navigate(map: Map): number {
  let step = 0;
  let current = "AAA";
  while (current !== "ZZZ") {
    const direction = map.steps[step % map.steps.length];
    const node = map.network.find((x) => x.point === current);
    if (node === undefined)
      throw new Error("Cannot navigate the network. Destination not found");
    if (direction == "L") current = node?.left;
    else current = node?.right;
    logger.debug({ current, direction, node });
    step++;
  }
  return step;
}

export function parseMap(data: string): Map {
  const steps = data.split("\n")[0].trim();
  const network = parseNetwork(data.split("\n\n")[1]);

  return {
    network,
    steps,
  };
}

export function parseNetwork(networkData: string): Network[] {
  const network: Network[] = [];
  for (const line of networkData.split("\n")) {
    network.push({
      point: line.slice(0, 3),
      left: line.slice(7, 10),
      right: line.slice(12, 15),
    });
  }
  return network;
}

export async function solve81() {
  const data = await Deno.readTextFile("data/8.data");
  return escapeDesert(data);
}
export async function solve82() {
  const data = await Deno.readTextFile("data/8.data");
  return escapeGhost(data);
}
