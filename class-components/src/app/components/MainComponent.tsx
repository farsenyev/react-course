import React, {useEffect, useState} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {Data} from "../interfaces/index";
import {SearchComponent} from "./SearchComponent";
import {ResultsComponent} from "./ResultsComponent";
import {NotFoundPage} from "./NotFoundPage";
import '../App.css'

export const MainComponent = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Now correctly within the context of <Router>

    useEffect(() => {
        const searchTerm = localStorage.getItem('searchTerm') || '';
        fetchItems(searchTerm, navigate);
    }, [navigate]); // useEffect dependency on navigate

    const fetchItems = (searchTerm, navigate) => {
        setLoading(true);
        const apiUrl = searchTerm ? `https://swapi.dev/api/${searchTerm}` : 'https://swapi.dev/api/';
        setTimeout(() => {
            fetch(apiUrl)
                .then(response => response.json())
                .then((data) => {
                    let newItems;
                    if ('results' in data) {
                        newItems = data.results.map((item) => ({
                            name: item.name || item.title,
                            description: item.gender || item.episode_id,
                        }));
                    } else {
                        newItems = Object.keys(data) as (keyof Data)[]
                    }
                    setItems(newItems);
                })
                .catch(error => {
                    console.error('Failed to fetch items:', error);
                    navigate('/404'); // Correct use of navigate
                })
                .finally(() => setLoading(false));
        }, 100);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ flex: '0 1 100px', background: '#eee' }}>
                <SearchComponent onSearch={(term) => fetchItems(term, navigate)} />
            </div>
            <div style={{ flex: '1 1 auto', overflow: 'auto' }}>
                <Routes>
                    <Route path="/" element={loading ? <div className="loader"/> : <ResultsComponent items={items} />} />
                    <Route path="/search/:category" element={loading ? <div className="loader"/> : <ResultsComponent items={items} />} />
                    <Route path="/search" element={loading ? <div className="loader"/> : <ResultsComponent items={items} />} />
                    <Route path="/404" element={<NotFoundPage />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
            </div>
        </div>
    );
};