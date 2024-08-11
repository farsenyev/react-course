import React, { useState } from 'react';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { json } from '@remix-run/node';
import { SearchComponent } from '../components/header/SearchComponent';
import { ResultsComponent } from '../components/result/ResultsComponent';
import { ThemeProvider } from '../context/ThemeContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Загрузка данных с SWAPI
export const loader = async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('search') || '';
    const page = url.searchParams.get('page') || 1;

    const response = await fetch(`https://swapi.dev/api/people/?search=${searchTerm}&page=${page}`);
    const data = await response.json();

    return json({ items: data });
};

export default function Index() {
    const { items } = useLoaderData();
    const [value, setValue] = useLocalStorage('', 'searchItem');
    const [pageNumber, setPageNumber] = useState(1);
    const navigate = useNavigate();

    const fetchItems = (term, page) => {
        setValue(term);
        setPageNumber(page);
        navigate(`/?search=${term}&page=${page}`);
    };

    const handleSelectedItem = (item) => {
        const id = item.url.match(/\/api\/[a-zA-Z]+\/(\d+)/)[1];
        navigate(`/detail/${id}`);
    };

    if (!items) return <h3>Loading...</h3>;

    return (
        <ThemeProvider>
            <div className={'main-container'}>
                <div className={'header'}>
                    <SearchComponent onSearch={fetchItems} />
                </div>
                <div>
                    {items.results.length === 0 ? (
                        <h3>No results found</h3>
                    ) : (
                        <ResultsComponent items={items} onSelectItem={handleSelectedItem} />
                    )}
                </div>
            </div>
        </ThemeProvider>
    );
}
