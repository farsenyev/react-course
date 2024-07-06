import React from 'react';
import { SearchComponent } from './components/SearchComponent';
import { ErrorBoundary } from './components/ErrorComponent';
import { ResultsComponent } from './components/ResusltComponent';
import {
  People,
  Films,
  Vehicles,
  Planets,
  Species,
  Starships,
  Data,
} from './interfaces/index';

interface State {
  items: { name: string; description: string }[];
}

export class App extends React.Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.fetchItems(localStorage.getItem('searchTerm') || '');
  }

  fetchItems = (searchTerm: string) => {
    const apiUrl = searchTerm
      ? `https://swapi.dev/api/${searchTerm}`
      : 'https://swapi.dev/api/';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let items;
        if ('results' in data) {
          items = data.results.map(
            (
              item: Planets | People | Starships | Species | Films | Vehicles,
            ) => ({
              name: item.name || item.title,
              description: item.gender || item.episode_id,
            }),
          );
        } else {
          items = Object.keys(data) as (keyof Data)[];
        }
        this.setState({ items });
      })
      .catch((error) => console.error('Failed to fetch items:', error));
  };

  render() {
    return (
      <ErrorBoundary>
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
        >
          <div style={{ flex: '0 1 100px', background: '#eee' }}>
            <SearchComponent onSearch={this.fetchItems} />
          </div>
          <div style={{ flex: '1 1 auto', overflow: 'auto' }}>
            <ResultsComponent items={this.state.items} />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}
