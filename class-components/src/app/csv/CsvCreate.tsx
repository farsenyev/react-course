import React from 'react';

export const convertToCsv = (data) => {
  const dataKeys = data.map((item) => Object.keys(item));
  const dataForCsv = dataKeys.map((keys, index) => {
    return keys
      .map((key) => {
        return data[index][key];
      })
      .join(';');
  });
  const headers = dataKeys[0].join(',');
  return [headers, ...dataForCsv].join('\r\n');
};

export const downloadCsv = (data) => {
  const csvData = convertToCsv(data);
  return new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
};
