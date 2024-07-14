import React, {useEffect, useState} from "react";
import {Navigate, Route, Routes, useNavigate, Outlet} from "react-router-dom";
import {Data} from "../interfaces/index";
import {SearchComponent} from "./SearchComponent";
import {ResultsComponent} from "./ResultsComponent";
import {NotFoundPage} from "./NotFoundPage";
import {DetailComponent} from "./DetailedComponent";
import '../App.css'

export const MainComponent = () => {
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
                        console.log(data)
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

    const handleSelectItem = item => {
        setSelectedItem(item);
        console.log(item)
        navigate(`/search/${item.category}/${item.id}`, {replace: false});
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ flex: '0 1 100px', background: '#eee' }}>
                <SearchComponent onSearch={(term, pageNumber) => fetchItems(term, pageNumber, navigate)} />
            </div>
            <div style={{ flex: 1, overflow: 'auto', display: "flex", flexDirection: "row" }}>
                <div>
                    <Routes>
                        <Route path="/search" element={loading ? <div className="loader"/> : <ResultsComponent items={items}  onSelectItem={handleSelectItem}/>} />
                        <Route path="/search/:category" element={loading ? <div className="loader"/> : <ResultsComponent items={items}  onSelectItem={handleSelectItem} />} >
                            <Route path=":category/:id" element={<DetailComponent item={selectedItem}/> } />
                        </Route>
                        <Route path="/404" element={<NotFoundPage /> && <Navigate to="/404" replace />} />
                        <Route path="*" element={<Navigate to="/404" replace />} />
                    </Routes>
                </div>
                <Outlet />
            </div>
        </div>
    );
};