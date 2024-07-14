import React from 'react';

interface Item {
  name: string;
  description: string;
}

interface Props {
  items: (string | Item)[];
  onSelectItem: (item: string | Item) => void;
}

export const ResultsComponent: React.FC<Props> = ({ items, onSelectItem }) => {
  return (
      <div>
        {items.length === 0 ? (
            <p>No cards available</p>
        ) : (
            items.map((item, index) => (
                <div key={index} onClick={() => onSelectItem(item)} style={{ cursor: 'pointer' }}>
                  <h3>{typeof item === 'string' ? item : item.name}</h3>
                </div>
            ))
        )}
      </div>
  );
};
