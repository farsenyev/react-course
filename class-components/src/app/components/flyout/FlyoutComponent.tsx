import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAll } from '../../slices/ItemSlice';
import { downloadCsv } from '../../csv/CsvCreate';

export const FlyoutComponent: React.FC = () => {
  const items = useSelector((store) => store.items);
  const dispatch = useDispatch();
  const downloadRef = React.useRef<HTMLAnchorElement>(null);

  const clickHandler = () => {
    const blob = downloadCsv(items.items);

    if (downloadRef.current) {
      downloadRef.current.setAttribute('href', URL.createObjectURL(blob));
      downloadRef.current.setAttribute(
        'download',
        `${items.items.length}_items.csv`,
      );
      downloadRef.current.click();
    }
  };

  const unselectAll = () => {
    dispatch(clearAll(items));
  };

  return (
    <div className={'flyout-container'}>
      <p className={'selected-items-p'}>Items selected: {items.items.length}</p>
      <button onClick={clickHandler}>Download</button>
      <a ref={downloadRef} />
      <button onClick={unselectAll}>Unselect all</button>
    </div>
  );
};
