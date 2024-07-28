import itemReducer, {
  addItem,
  removeItem,
  clearAll,
} from '../app/slices/ItemSlice';
import { IPeople } from '../app/interfaces/people.interface';
import { IFilm } from '../app/interfaces/films.interface';
import { IStarships } from '../app/interfaces/starships.interface';

const people: IPeople = {
  id: '1',
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  eye_color: 'blue',
  films: ['some-url'],
  gender: 'male',
  hair_color: 'blond',
  height: '172',
  homeworld: 'some-url',
  mass: '77',
  skin_color: 'fair',
  created: 'some-date',
  edited: 'some-date',
  species: ['some-url'],
  starships: ['some-url'],
  url: 'some-url',
  vehicles: ['some-url'],
};
const film: IFilm = {
  characters: ['character1', 'character2'],
  created: 'date',
  director: 'director',
  edited: 'edited',
  episode_id: 4,
  opening_crawl: 'opening_crawl',
  planets: ['planet1', 'planet2'],
  producer: 'producer',
  release_date: 'release_date',
  species: ['specie1', 'specie2'],
  starships: ['starship1', 'starship2'],
  title: 'title',
  url: 'url',
  vehicles: ['vehicles'],
};
const starShip: IStarships = {
  MGLT: 'MGLT',
  cargo_capacity: 'cargo_capacity',
  consumables: 'consumables',
  cost_in_credits: 'cost_in_credits',
  created: 'created',
  crew: 'crew',
  edited: 'edited',
  hyperdrive_rating: 'hyperdrive_rating',
  length: 'length',
  manufacturer: 'manufacturer',
  max_atmosphering_speed: 'max_atmosphering_speed',
  model: 'model',
  name: 'name',
  passengers: 'passengers',
  films: ['films'],
  pilots: ['pilots'],
  starship_class: 'starship_class',
  url: 'url',
};

describe('item slice', () => {
  const initialState = {
    items: [],
  };

  it('should handle initial state', () => {
    expect(itemReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
    });
  });

  it('should handle addItem', () => {
    const newState = itemReducer(initialState, addItem(people));
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toEqual(people);
  });

  it('should handle removeItem', () => {
    const newStateWithItems = itemReducer(initialState, addItem(people));
    const finalState = itemReducer(newStateWithItems, removeItem(people));
    expect(finalState.items).toHaveLength(0);

    const newStateWithFilm = itemReducer(initialState, addItem(film));
    const finalStateFilm = itemReducer(newStateWithFilm, removeItem(film));
    expect(finalStateFilm.items).toHaveLength(0);

    const newStateWithStarShip = itemReducer(initialState, addItem(starShip));
    const finalStateStarShip = itemReducer(
      newStateWithStarShip,
      removeItem(starShip),
    );
    expect(finalStateStarShip.items).toHaveLength(0);
  });

  it('should handle clearAll', () => {
    const newState = itemReducer(initialState, addItem(people));
    expect(newState.items).toHaveLength(1);
    const clearedState = itemReducer(newState, clearAll());
    expect(clearedState.items).toHaveLength(0);
  });
});
