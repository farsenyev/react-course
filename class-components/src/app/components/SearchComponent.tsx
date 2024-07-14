import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';


interface Props {
  onSearch: (searchTerm: string) => void;
}

export const SearchComponent: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') || '',
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);

    return () => {
      localStorage.setItem('searchTerm', searchTerm);
    };
  }, [searchTerm]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
    navigate(`/search/${searchTerm}`);
  };

  const throwError = () => {
    throw new Error('Manual error triggered');
  };

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
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search here..."
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={throwError}>Throw Error</button>
    </div>
  );
};
