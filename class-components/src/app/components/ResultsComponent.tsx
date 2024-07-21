import React from 'react';
import { Outlet } from "react-router-dom";

interface Item {
  name: string;
  description: string;
  category: string;
  id: string;
}

interface Props {
  items: (string | Item)[];
  onSelectItem: (item: string | Item) => void;
}

export const ResultsComponent: React.FC<Props> = ({ items, onSelectItem }) => {
  return (
      <div className={'result-container'}>
          <div className={'results'}>
            {!items ? (<p></p>) : (
                items.map((item, index) => (
                    <div key={index} onClick={() => onSelectItem(item)} style={{ cursor: 'pointer' }}>
                      <h3>{typeof item === 'string' ? item : item.name}</h3>
                    </div>
                ))
            )}
          </div>
        <Outlet/>
      </div>
  );
};
