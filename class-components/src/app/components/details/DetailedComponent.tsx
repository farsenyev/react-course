import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDetailsQuery } from '../../service/ItemService';

export const DetailComponent: React.FC = () => {
  const { id, category } = useParams<{ id: string; category: string }>();
  const { data, isLoading, isFetching } = useGetDetailsQuery({ category, id });
  const navigate = useNavigate();

  console.log(data);

  const details = () => {
    const keys = Object.keys(data);
    return keys.map((key) => (
      <p key={key}>
        {key}: {data[key]}
      </p>
    ));
  };

  return (
    <div className={'details'}>
      <button onClick={() => navigate(-1)}>Close</button>
      {isLoading || isFetching ? (
        <h3 className="loader" />
      ) : (
        <div className={'detailed-list'}>
          <h3>{data.name}</h3>
          {details()}
        </div>
      )}
    </div>
  );
};
