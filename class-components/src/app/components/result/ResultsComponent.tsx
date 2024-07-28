import React from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from "../../slices/ItemSlice";
import { RootState } from "../../store/Store";
import {IApi, IPeople, IPeopleAPI} from "../../interfaces/people.interface";
import {IFilm, IFilmsApi} from "../../interfaces/films.interface";
import {IStarships, IStarshipsApi} from "../../interfaces/starships.interface";

interface Props {
  items: IApi | IPeopleAPI | IFilmsApi | IStarshipsApi;
  onSelectItem: (item: IPeople | IFilm | IStarships) => void;
}

export const ResultsComponent: React.FC<Props> = ({ items, onSelectItem }) => {
  const storeItems = useSelector<RootState, (IPeople | IFilm | IStarships)[]>((state) => state.items.items);
  const dispatch = useDispatch();

  const checkBoxHandler = (
      event: React.ChangeEvent<HTMLInputElement>,
      item: IPeople | IFilm | IStarships
  ) => {
    event.stopPropagation();
    const identifier = 'name' in item ? item.name : item.title;
    const isExisting = storeItems.find((e: IPeople | IFilm | IStarships) => ('name' in e ? e.name : e.title) === identifier);
    isExisting ? dispatch(removeItem(item)) : dispatch(addItem(item));
  };

  const checkExistingItems = (item: IPeople | IFilm | IStarships): boolean => {
    const identifier = 'name' in item ? item.name : item.title;
    return !!storeItems.find((e: IPeople | IFilm | IStarships) => ('name' in e ? e.name : e.title) === identifier);
  };

  const handleDetailedClick = (
      event: React.MouseEvent<HTMLDivElement>,
      item: IPeople | IFilm | IStarships
  ) => {
    if ((event.target as HTMLInputElement).type === 'checkbox') return;
    onSelectItem(item);
  };

  if (items === undefined) return <h3>No results found</h3>

  const startNames = Object.keys(items);

  return (
      <div className={'result-container'}>
        <div className={'results'}>
          {('results' in items
              ? (items.results.length > 0 ? items.results.map((item, index) => (
                  <div
                      key={index}
                      onClick={(event) => handleDetailedClick(event, item)}
                      className={'item'}
                  >
                    <input
                        type={'checkbox'}
                        onChange={(e) => checkBoxHandler(e, item)}
                        className={'select-item'}
                        id={``}
                        checked={checkExistingItems(item)}
                    />
                    <h3>{('name' in item) ? item.name : item.title}</h3>
                  </div>
              )) : <h3>No results found</h3>)
              : startNames.map((key) => <h3 key={key}>{key}</h3>))}
        </div>
        <Outlet />
      </div>
  );
};
