import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Data} from "../interfaces/index";
import {SearchComponent} from "./header/SearchComponent";
import {ResultsComponent} from "./ResultsComponent";
import '../App.css'
import {ThemeProvider} from "../context/ThemeContext";

export const MainComponent = () => {
    const { category } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const searchTerm = localStorage.getItem('searchTerm') || '';
        let page = 1
        fetchItems(searchTerm, page, navigate);
    }, [navigate]);

    const fetchItems = (searchTerm, page, navigate) => {
        setLoading(true);
        const apiUrl = (searchTerm ? (page ? `https://swapi.dev/api/${searchTerm}?page=${page}` : `https://swapi.dev/api/${searchTerm}`) : 'https://swapi.dev/api/');
        setTimeout(() => {
            fetch(apiUrl)
                .then(response => response.json())
                .then((data) => {
                    let newItems;
                    if ('results' in data) {
                        newItems = data.results.map((item) => ({
                            ...item,
                            category: apiUrl.split('/')[4],
                            id: item.url.match(/\/api\/[a-zA-Z]+\/(\d+)/)[1]
                        }));
                    } else {
                        newItems = Object.keys(data) as (keyof Data)[]
                    }
                    setItems(newItems);
                })
                .catch(error => {
                    console.error('Failed to fetch items:', error);
                    navigate('/404');
                })
                .finally(() => setLoading(false));
        }, 100);
    };

    const handleSelectedItem = (item) => {
        navigate(`/${category}/${item.id}`)
    }

    return (
        <ThemeProvider>
            <div className={'main-container'}>
                <div className={'header'}>
                    <SearchComponent onSearch={(term, pageNumber) => fetchItems(term, pageNumber, navigate)} />
                </div>
                <div>
                    <ResultsComponent items={items} onSelectItem={handleSelectedItem}/>
                </div>
            </div>
        </ThemeProvider>
    );
};
