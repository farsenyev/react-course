import {useState, useEffect, Dispatch, SetStateAction} from 'react';

type ReturnType = [string, Dispatch<SetStateAction<string>>];

export const useLocalStorage = (initialValue: string, key: string): ReturnType => {
  const getValue = () => {
    const storage = localStorage.getItem(key);
    if (storage) return storage;

    return initialValue;
  };

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};
