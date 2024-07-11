import React, { ChangeEvent } from 'react';

interface Props {
  onSearch: (searchTerm: string) => void;
}

interface State {
  searchTerm: string;
}

export class SearchComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const trimmedTerm = this.state.searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    this.props.onSearch(trimmedTerm);
  };

  throwError = () => {
    throw new Error('Manual error triggered');
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
        }}
      >
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          placeholder="Search here..."
        />
        <button onClick={this.handleSearch}>Search</button>
        <button onClick={this.throwError}>Throw Error</button>
      </div>
    );
  }
}
