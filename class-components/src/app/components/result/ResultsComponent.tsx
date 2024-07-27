import React from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../slices/ItemSlice';
import { IApi, IPeople, IPeopleAPI } from '../../interfaces/people.interface';
import { IFilm, IFilmsApi } from '../../interfaces/films.interface';

interface Props {
  items: IApi | IPeopleAPI | IFilmsApi;
  onSelectItem: (item: string | IPeople | IFilm) => void;
}

export const ResultsComponent: React.FC<Props> = ({ items, onSelectItem }) => {
  const storeItems = useSelector((store) => store.items);
  const dispatch = useDispatch();

  const checkBoxHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    item,
  ) => {
    event.stopPropagation();
    storeItems.items.find((e) => e.name === item.name)
      ? dispatch(removeItem(item))
      : dispatch(addItem(item));
  };

  const checkExistingItems = (item) => {
    return storeItems.items.find((e) => e.name === item.name) ? '1' : '';
  };

  const handleDetailedClick = (
    event: React.MouseEvent<HTMLDivElement>,
    item,
  ) => {
    if ((event.target as HTMLInputElement).type === 'checkbox') return;
    onSelectItem(item);
  };

  const startNames = Object.keys(items);

  return (
    <div className={'result-container'}>
      <div className={'results'}>
        {items !== undefined && 'results' in items
          ? items.results.map((item, index) => (
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
                <h3>{item.name || item.title}</h3>
              </div>
            ))
          : startNames.map((item) => <h3 key={item}>{item}</h3>)}
      </div>
      <Outlet />
    </div>
  );
};
