import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';


interface Props {
  onSearch: (searchTerm: string, pageNumber: number) => void
}

export const SearchComponent: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') || '',
  );
  const [pageNumber, setPage] = useState(1);
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
    onSearch(searchTerm, pageNumber);
    navigate(`/search/${searchTerm}`);
  };

  const handleNext = () => {
    const nextPage = pageNumber + 1;
    setPage(nextPage);
    onSearch(searchTerm, nextPage);
    navigate(`/search/${searchTerm}?page=${nextPage}`);
  };

  const handlePrev = () => {
    const prevPage = pageNumber > 1 ? pageNumber - 1 : 1;
    setPage(prevPage);
    onSearch(searchTerm, prevPage);
    navigate(`/search/${searchTerm}/?page=${prevPage}`);
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
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px"
      }}>
        <button onClick={handlePrev} disabled={pageNumber <= 1}>Prev</button>
        <div style={{
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <h4 style={{
            margin: "0"
          }}>{pageNumber}</h4></div>
        <button onClick={handleNext}>Next</button>
      </div>
      <button onClick={throwError}>Throw Error</button>
    </div>
  );
};
