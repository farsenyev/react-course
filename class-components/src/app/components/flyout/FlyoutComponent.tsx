import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll } from '../../slices/ItemSlice';
import { downloadCsv } from '../../csv/CsvCreate';
import { RootState } from '../../store/Store';
import { IPeople } from '../../interfaces/people.interface';
import { IFilm } from '../../interfaces/films.interface';
import { IStarships } from '../../interfaces/starships.interface';

export const FlyoutComponent: React.FC = () => {
  const items = useSelector<RootState, (IPeople | IFilm | IStarships)[]>(
    (store) => store.items.items,
  );
  const dispatch = useDispatch();
  const downloadRef = React.useRef<HTMLAnchorElement>(null);

  const clickHandler = () => {
    const blob = downloadCsv(items);

    if (downloadRef.current) {
      downloadRef.current.setAttribute('href', URL.createObjectURL(blob));
      downloadRef.current.setAttribute('download', `${items.length}_items.csv`);
      downloadRef.current.click();
    }
  };

  const unselectAll = () => {
    dispatch(clearAll());
  };

  return (
    <div className={'flyout-container'}>
      <p className={'selected-items-p'}>Items selected: {items.length}</p>
      <button onClick={clickHandler}>Download</button>
      <a ref={downloadRef} />
      <button onClick={unselectAll}>Unselect all</button>
    </div>
  );
};
