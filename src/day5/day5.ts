import { logger } from "../log.ts";

export interface FromToMap {
  source: number;
  destination: number;
  range: number;
}
export function minLocation(almanac: Almanac) {
  const locations = almanac.getLocationsForSeeds();
  logger.debug(locations);
  return locations.sort((a, b) => a - b).at(0);
}

export async function solve51() {
  const data = await Deno.readTextFile("data/5.data");
  const almanac = new Almanac(data);
  return minLocation(almanac);
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
  soilToFertilizer: FromToMap[];
  fertilizerToWater: FromToMap[];
  waterToLight: FromToMap[];
  lightToTemp: FromToMap[];
  tempToHumidity: FromToMap[];
  humidityToLocation: FromToMap[];

  constructor(data: string) {
    const rawSections = data.split("\n\n");
    this.seeds = this.parseSeeds(rawSections[0]);
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

  public getLocationsForSeeds(): number[] {
    const locations: number[] = [];
    for (const s of this.seeds) {
      let current = s;
      current = this.navigate(s, this.seedToSoil);
      current = this.navigate(current, this.soilToFertilizer);
      current = this.navigate(current, this.fertilizerToWater);
      current = this.navigate(current, this.waterToLight);
      current = this.navigate(current, this.lightToTemp);
      current = this.navigate(current, this.tempToHumidity);
      current = this.navigate(current, this.humidityToLocation);
      locations.push(current);
    }
    logger.debug(locations);
    return locations;
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
