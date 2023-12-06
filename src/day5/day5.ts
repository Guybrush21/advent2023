import { logger } from "../log.ts";

export interface FromToMap {
  source: number;
  destination: number;
  range: number;
}
export function minLocation(almanac: Almanac) {
  const locations = almanac.getLocationsForSeeds();
  return locations;
}

export async function solve51() {
  const data = await Deno.readTextFile("data/5.data");
  const almanac = new Almanac(data);
  return minLocation(almanac);
}

export async function solve52() {
  // this get overly complicated. Therefore the need for generatorFunction and type.
  // I really want to avoid that for readability but, at least with Deno,
  // I incurred in to many memory problem. Despite having 32GB of RAM on the machine...
  // this also take more than 5 minutes to resolve...
  try {
    const data = await Deno.readTextFile("data/5.data");
    const almanac = new Almanac(data, true);
    return minLocation(almanac);
  } catch (e) {
    logger.error(e);
  }
}

export class Almanac {
  MAPS = {
    SEED_SOIL: 1,
    SOIL_FERTILIZER: 2,
    FERTILIZER_WATER: 3,
    WATER_LIGHT: 4,
    LIGHT_TEMP: 5,
    TEMP_HUMIDITY: 6,
    HUMIDITY_LOCATION: 7,
  };
  seedToSoil: FromToMap[];
  seeds: number[];
  seedsGenerator: Generator<number>[] = [];
  soilToFertilizer: FromToMap[];
  fertilizerToWater: FromToMap[];
  waterToLight: FromToMap[];
  lightToTemp: FromToMap[];
  tempToHumidity: FromToMap[];
  humidityToLocation: FromToMap[];

  constructor(data: string, seedsRange: boolean = false) {
    const rawSections = data.split("\n\n");
    this.seeds = this.parseSeeds(rawSections[0]);
    if (seedsRange) this.seedsGenerator = this.parseSeedsRange(rawSections[0]);

    this.seedToSoil = this.parseMap(rawSections[this.MAPS.SEED_SOIL]);
    this.soilToFertilizer = this.parseMap(
      rawSections[this.MAPS.SOIL_FERTILIZER],
    );
    this.fertilizerToWater = this.parseMap(
      rawSections[this.MAPS.FERTILIZER_WATER],
    );
    this.waterToLight = this.parseMap(rawSections[this.MAPS.WATER_LIGHT]);
    this.lightToTemp = this.parseMap(rawSections[this.MAPS.LIGHT_TEMP]);
    this.tempToHumidity = this.parseMap(rawSections[this.MAPS.TEMP_HUMIDITY]);
    this.humidityToLocation = this.parseMap(
      rawSections[this.MAPS.HUMIDITY_LOCATION],
    );
  }
  public navigate(value: number, next: FromToMap[]): number {
    logger.debug({ value, next });
    for (const m of next) {
      if (value >= m.source && value < m.source + m.range) {
        if (value == m.source) return m.destination;
        else return value - m.source + +m.destination;
      } else continue;
    }
    return value;
  }

  public getLocationsForSeeds(): number {
    let minLocation: number | undefined = undefined;
    if (this.seedsGenerator.length) {
      for (const g of this.seedsGenerator) {
        for (const s of g) {
          let current = s;
          current = this.navigate(s, this.seedToSoil);
          current = this.navigate(current, this.soilToFertilizer);
          current = this.navigate(current, this.fertilizerToWater);
          current = this.navigate(current, this.waterToLight);
          current = this.navigate(current, this.lightToTemp);
          current = this.navigate(current, this.tempToHumidity);
          current = this.navigate(current, this.humidityToLocation);
          if (!minLocation) minLocation = current;
          if (current < minLocation) minLocation = current;
        }
      }
    } else
      for (const s of this.seeds) {
        let current = s;
        current = this.navigate(s, this.seedToSoil);
        current = this.navigate(current, this.soilToFertilizer);
        current = this.navigate(current, this.fertilizerToWater);
        current = this.navigate(current, this.waterToLight);
        current = this.navigate(current, this.lightToTemp);
        current = this.navigate(current, this.tempToHumidity);
        current = this.navigate(current, this.humidityToLocation);
        if (!minLocation) minLocation = current;
        if (current < minLocation) minLocation = current;
      }

    if (!minLocation) throw new Error("MinLocation not even found...");
    return minLocation;
  }

  private parseSeeds(data: string): number[] {
    const firstline = data.split("\n")[0].replace("seeds: ", "");
    const seeds = firstline
      .split(" ")
      .map((x) => parseInt(x))
      .filter((x) => !isNaN(x));
    if (!seeds) throw new Error("Cannot parse the seeds.");
    return seeds;
  }

  private parseSeedsRange(data: string): Generator<number>[] {
    const firstline = data.split("\n")[0].replace("seeds: ", "");
    const seeds = firstline
      .split(" ")
      .map((x) => parseInt(x))
      .filter((x) => !isNaN(x));
    if (!seeds) throw new Error("Cannot parse the seeds.");
    else {
      logger.debug(seeds);
      const seedsRange: Generator<number>[] = [];
      for (let i = 0; i < seeds.length; i += 2) {
        const range = this.generateNumbers(seeds[i], seeds[i + 1]);
        logger.debug(`range build ${range}`);
        if (range) seedsRange.push(range);
      }
      logger.debug(`range seeds: ${seedsRange}`);
      return seedsRange;
    }
  }

  private *generateNumbers(start: number, end: number): Generator<number> {
    for (let i = start; i < start + end; i++) {
      yield i;
    }
  }

  private parseMap(data: string): FromToMap[] {
    const result: FromToMap[] = [];
    logger.debug(data.split("\n"));
    const lines = data.split("\n").slice(1);
    lines.map((l) => {
      const raw = l.split(" ");
      result.push({
        range: Number(raw[2]),
        source: Number(raw[1]),
        destination: Number(raw[0]),
      });
    });

    return result;
  }
}
