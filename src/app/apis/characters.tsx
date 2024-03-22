import { Character } from "../types/Character";
import { Planet } from "../types/Planet";
import { Film } from "../types/Film";

export async function fetchCharacters(search: string, currentPage: number): Promise<{ characters: Character[], isLastPage: boolean }> {
  const res = await fetch(`https://swapi.dev/api/people?page=${currentPage}&search=${search}`);
  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    return { characters: [], isLastPage: true };
  }

  const totalCharacters = data.count;

  const totalPages = Math.ceil(totalCharacters / data.results.length);

  const characters = await Promise.all(data.results.map(async (character: any) => {

    const homeworldResponse = await fetch(character.homeworld);
    const homeworldData = await homeworldResponse.json();
    const homeworld: Planet = {
      id: homeworldData.id,
      name: homeworldData.name,
      terrain: homeworldData.terrain,
      climate: homeworldData.climate
    };

    const films = await Promise.all(character.films.map(async (filmUrl: string) => {
      const filmResponse = await fetch(filmUrl);
      const filmData = await filmResponse.json();
      const film: Film = {
        title: filmData.title,
        episode_id: filmData.episode_id,
      };
      return film;
    }));

    return {
      id: character.id,
      name: character.name,
      height: character.height,
      mass: character.mass,
      birth_year: character.birth_year,
      films: films,
      homeworld: homeworld,
      image: `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`
    };
  }));

  const isLastPage = currentPage === totalPages;

  return { characters, isLastPage };
}
