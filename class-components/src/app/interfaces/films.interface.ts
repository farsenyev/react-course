export interface IFilm {
    characters: string[];
    created: string;
    director: string;
    edited: string;
    episode_id: 4;
    opening_crawl: string;
    planets: string[];
    producer: string;
    release_date: string;
    species: string[];
    starships: string[];
    title: string;
    url: string;
    vehicles: string[]
}

export interface IFilmsApi {
    count: number;
    next: string | null;
    previous: string | null;
    results: IFilm[]
}