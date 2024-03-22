import { Film } from "../types/Film";

export async function fetchFilms(): Promise<Film[]> {
    const res = await fetch('https://swapi.dev/api/films');
    const data = await res.json();
    
    const characters: Film[] = data.results.map((result: any) => ({
        title: result.title,
    }));
    
    return characters;
}
