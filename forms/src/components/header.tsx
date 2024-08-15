import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <>
      <nav>
        <Link to="/">Main page</Link>
        <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        <Link to="/hook-form">React Hook Form</Link>
      </nav>
    </>
  );
};
