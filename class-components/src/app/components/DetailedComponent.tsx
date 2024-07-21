import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Item {
    name: string;
    films: string[];
}

export const DetailComponent: React.FC = () => {
    const { id, category } = useParams<{ id: string; category: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (id === undefined || category === undefined) {
        return;
    }

    const fetchDetails = async (url: string) => {
        const response = await fetch(url);
        return response.json();
    };

    useEffect(() => {
        setLoading(true);
        fetch(`https://swapi.dev/api/${category}/${id}`)
            .then(response => response.json())
            .then(async (data) => {
                const films = await Promise.all(data.films.map((url: string) => fetchDetails(url)));
                setItem({
                    ...data,
                    films: films.map(film => film.title),
                });
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch item:', error);
                setLoading(false);
            });
    }, [id, category]);

    if (loading) {
        return <div className={'details'}>Loading...</div>;
    }

    if (!item) {
        return <div className={'details'}>Loading</div>;
    }

    return (
        <div className={'details'}>
            <button onClick={() => navigate(-1)}>Close</button>
            <h1>{item.name}</h1>
            <p>Films: {item.films.join(', ')}</p>
        </div>
    );
};
