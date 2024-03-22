import { Planet } from "../types/Planet";

export async function fetchPlanets(): Promise<Planet[]> {
    const res = await fetch('https://swapi.dev/api/planets');
    const data = await res.json();
    
    const characters: Planet[] = data.results.map((data: any) => ({
        id: data.id,
        name: data.name,
        terrain: data.terrain,
        climate: data.climate
    }));
    
    return characters;
}
