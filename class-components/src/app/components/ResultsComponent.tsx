import React from 'react';

interface Props {
  items: { name: string; description: string }[];
}

export const ResultsComponent: React.FC<Props> = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <h3>{item.name || item}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};
