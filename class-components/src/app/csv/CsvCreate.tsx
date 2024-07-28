import { IPeople } from '../interfaces/people.interface';
import { IFilm } from '../interfaces/films.interface';
import { IStarships } from '../interfaces/starships.interface';

export const convertToCsv = (data: (IPeople | IFilm | IStarships)[]) => {
  if (data.length === 0) {
    return '';
  }

  const headers = Object.keys(data[0]);

  const csvData = data.map((item) => {
    return headers
      .map((header) => {
        const value = item[header as keyof typeof item];
        if (Array.isArray(value)) {
          return `"${value.join(';')}"`;
        } else if (value !== undefined && value !== null) {
          return `"${value}"`;
        }
        return '""';
      })
      .join(';');
  });

  return [headers.join(';'), ...csvData].join('\r\n');
};

export const downloadCsv = (data: (IPeople | IFilm | IStarships)[]) => {
  const csvData = convertToCsv(data);
  return new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
};
