import React, {useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../slices/ItemSlice';
import {IApi, IPeople, IPeopleAPI} from "../../interfaces/people.interface";
import {IFilm, IFilmsApi} from "../../interfaces/films.interface";
import {useGetDetailsQuery} from "../../service/ItemService";

interface Props {
  items: (IApi | IPeopleAPI | IFilmsApi);
  onSelectItem: (item: string | IPeople | IFilm) => void;
}

export const ResultsComponent: React.FC<Props> = ({ items, onSelectItem }) => {

  const checkBoxHandler = () => {}

  const startNames = Object.keys(items);

  return (
    <div className={'result-container'}>
      <div className={'results'}>
        {items !== undefined && "results" in items ? (
          items.results.map((item, index) => (
            <div
              key={index}
              onClick={() => onSelectItem(item)}
              className={'item'}
            >
              <input
                type={'checkbox'}
                onClick={(e) => checkBoxHandler()}
                className={'select-item'}
                id={``}
              />
              <h3>{item.name || item.title}</h3>
            </div>
          ))
        )
        : (
            startNames.map(item =>
              <h3 key={item}>{item}</h3>
            )
        )}
      </div>
         <Outlet />
    </div>
  );
};
