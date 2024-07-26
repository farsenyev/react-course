import React, { useEffect, useState } from 'react';
import { SearchComponent } from './header/SearchComponent';
import { ResultsComponent } from './result/ResultsComponent';
import '../App.css';
import { ThemeProvider } from '../context/ThemeContext';
import {useGetDetailsQuery, useGetItemsQuery} from "../service/ItemService";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {useNavigate} from "react-router-dom";

export const MainComponent = () => {
  const [pageNumber, setPageNumber] = useState(null)
  const [value, setValue] = useLocalStorage('', 'searchItem')
  const navigate = useNavigate()
  const {data, isLoading, isFetching} = useGetItemsQuery({item: value, page: pageNumber});

  if (isLoading) return <h3>Loading...</h3>

  const fetchItems = (term, page) => {
    setValue(term)
    setPageNumber(page)
  }

  const handleSelectedItem = (item) => {
    const id = item.url.match(/\/api\/[a-zA-Z]+\/(\d+)/)[1]
    navigate(`/${value}/${id}`)
  }

  return (
    <ThemeProvider>
      <div className={'main-container'}>
        <div className={'header'}>
          <SearchComponent
            onSearch={(term, page) =>
              fetchItems(term, page)
            }
          />
        </div>
        <div>
          {isLoading || isFetching ? <h3 className={'loader'}>load</h3> : <ResultsComponent items={data} onSelectItem={handleSelectedItem} />}
        </div>
      </div>
    </ThemeProvider>
  );
};
