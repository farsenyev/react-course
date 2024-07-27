export interface IPeople {
  id: string;
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface IPeopleAPI {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPeople[];
}

export interface IApi {
  people: string;
  planets: string;
  films: string;
  species: string;
  vehicles: string;
  starships: string;
}
