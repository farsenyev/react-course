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
    navigate(`/${searchTerm}`);
  };

  const handleNext = () => {
    const nextPage = pageNumber + 1;
    setPage(nextPage);
    onSearch(searchTerm, nextPage);
    navigate(`/${searchTerm}?page=${nextPage}`);
  };

  const handlePrev = () => {
    const prevPage = pageNumber > 1 ? pageNumber - 1 : 1;
    setPage(prevPage);
    onSearch(searchTerm, prevPage);
    navigate(`/${searchTerm}/?page=${prevPage}`);
  };

  const throwError = () => {
    throw new Error('Manual error triggered');
  };

  const changeTheme = () => {
    console.log('theme changed')
  }

  return (
    <div
      className={'header-container'}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search here..."
      />
      <button onClick={handleSearch}>Search</button>
      <div className={'pagination-container'}>
        <button onClick={handlePrev} disabled={pageNumber <= 1}>Prev</button>
        <div className={'pagination-number'}>
          <h4>{pageNumber}</h4></div>
        <button onClick={handleNext}>Next</button>
      </div>
      <button onClick={changeTheme}>Change theme</button>
      <button onClick={throwError}>Throw Error</button>
    </div>
  );
};
