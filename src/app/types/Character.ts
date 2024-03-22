import { Film } from "./Film";
import { Planet } from "./Planet";

export interface Character {
  id: number;
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  films: Film[];
  homeworld: Planet;
  image: string;
}
