import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDetailsQuery } from '../../service/ItemService';
import { IPeople } from '../../interfaces/people.interface';
import { IFilm } from '../../interfaces/films.interface';
import { IStarships } from '../../interfaces/starships.interface';

export const DetailComponent: React.FC = () => {
  const { id, category } = useParams<{ id: string; category: string }>();
  const safeCategory = category || '';
  const safeId = id || '';
  const { data, isLoading, isFetching } = useGetDetailsQuery({
    category: safeCategory,
    id: safeId,
  });
  const navigate = useNavigate();

  if (!data) return <div>No data found</div>;

  const details = () => {
    const keys = Object.keys(data) as Array<
      keyof (IPeople | IFilm | IStarships)
    >;
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
        <h3 className="loader">Loading...</h3>
      ) : (
        <div className={'detailed-list'}>
          {'name' in data && <h3>{data.name}</h3>}{' '}
          {/* Проверяем наличие свойства 'name' перед его использованием */}
          {details()}
        </div>
      )}
    </div>
  );
};
