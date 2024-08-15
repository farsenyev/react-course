import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainComponent } from './components/mainComponent';
import { UncontrolledForm } from './components/UncontrolledForm';
import { HookForm } from './components/HookForm';
import store from './store/store';
import { Provider } from 'react-redux';
import { Header } from './components/header';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="header">
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
          <Route path="/hook-form" element={<HookForm />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
