import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { ErrorBoundary } from './components/error/ErrorComponent';
import { MainComponent } from './components/MainComponent';
import { ResultsComponent } from './components/result/ResultsComponent';
import { DetailComponent } from './components/details/DetailedComponent';
import { NotFoundPage } from './components/404/NotFoundPage';

export const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/*" element={<MainComponent />}>
            <Route
              path=":category"
              element={<ResultsComponent items={{}} onSelectItem={{}} />}
            >
              <Route path=":id" element={<DetailComponent />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};
