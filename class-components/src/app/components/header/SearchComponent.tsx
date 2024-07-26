import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import {useLocalStorage} from "../../hooks/useLocalStorage";

interface Props {
  onSearch: (term: string, page: number) => void;
}

export const SearchComponent: React.FC<Props> = ({ onSearch }) => {
  const [pageNumber, setPageNumber] = useState(1)
  const [value, setValue] = useLocalStorage('', 'searchItem')
  const theme = useTheme();
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
  }

  const handleSearch = () => {
      onSearch(value, pageNumber)
      navigate(`/${value}`);
  }

  const handlePrev = () => {
    const prevPage = pageNumber - 1
    setPageNumber(prevPage)
    onSearch(value, prevPage)
    navigate(`/${value}/?page=${prevPage}`);
  }

  const handleNext = () => {
    const nextPage = pageNumber + 1;
    setPageNumber(nextPage);
    onSearch(value, nextPage);
    navigate(`/${value}/?page=${nextPage}`);
  }

  const throwError = () => {
    throw new Error('Manual error triggered');
  };

  const changeTheme = () => {
    theme.toggleTheme();
  };

  return (
    <div className={'header-container'}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Search here..."
      />
      <button onClick={handleSearch}>Search</button>
      <div className={'pagination-container'}>
        <button onClick={handlePrev}
                disabled={pageNumber <= 1}
        >
          Prev
        </button>
        <div className={'pagination-number'}>
          <h4>{pageNumber}</h4>
        </div>
        <button onClick={handleNext}>Next</button>
      </div>
      <div className={'checkbox-wrapper-22'}>
        <label className={'switch'} htmlFor={'checkbox'}>
          <input type={'checkbox'} id={'checkbox'} onChange={changeTheme} />
          <div className={'slider round'} />
        </label>
      </div>
      <button onClick={throwError}>Throw Error</button>
    </div>
  );
};
