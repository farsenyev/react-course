import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorComponent';
import { MainComponent } from "./components/MainComponent";
import {ResultsComponent} from "./components/ResultsComponent";
import {DetailComponent} from "./components/DetailedComponent";
import {NotFoundPage} from "./components/NotFoundPage";

export const App = () => {
    return (
        <Router>
            <ErrorBoundary>
                <Routes>
                    <Route path="/*" element={<MainComponent/>}>
                        <Route path=":category" element={<ResultsComponent items={null} onSelectItem={null}/>}>
                            <Route path=":id" element={<DetailComponent />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
            </ErrorBoundary>
        </Router>
    );
};
