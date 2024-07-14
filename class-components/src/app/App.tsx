import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorComponent';
import { MainComponent } from "./components/MainComponent";

export const App = () => {
    return (
        <Router>
            <ErrorBoundary>
                <MainComponent />
            </ErrorBoundary>
        </Router>
    );
};
