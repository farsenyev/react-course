import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../store/store';

export const MainComponent: React.FC = () => {
  const uncontrolledFormData = useSelector(
    (state: RootState) => state.forms.uncontrolledForm
  );
  const hookFormData = useSelector((state: RootState) => state.forms.hookForm);
  const location = useLocation();
  const [highlightedForm, setHighlightedForm] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.formType) {
      setHighlightedForm(location.state.formType);
      const timeout = setTimeout(() => {
        setHighlightedForm(null);
      }, 3000); // Очищаем выделение через 3 секунды
      return () => clearTimeout(timeout);
    }
  }, [location.state]);

  return (
    <>
      <div className="page_wrapper">
        <h1>Main Page</h1>
        <div className="links">
          <Link to="/uncontrolled-form">Uncontrolled Form</Link>
          <Link to="/hook-form">React Hook Form</Link>
        </div>
        <div className={'data'}>
          <div>
            <h3>Uncontrolled Form Data</h3>
            {uncontrolledFormData ? (
              <div>
                <p>
                  <strong>Name:</strong> {uncontrolledFormData.name}
                </p>
                <p>
                  <strong>Age:</strong> {uncontrolledFormData.age}
                </p>
                <p>
                  <strong>Email:</strong> {uncontrolledFormData.email}
                </p>
                <p>
                  <strong>Gender:</strong> {uncontrolledFormData.gender}
                </p>
                <p>
                  <strong>Country:</strong> {uncontrolledFormData.country}
                </p>
                <p>
                  <strong>Picture:</strong>{' '}
                  <img
                    src={uncontrolledFormData.picture}
                    alt="Uploaded"
                    width="100"
                  />
                </p>
              </div>
            ) : (
              <p>No data submitted</p>
            )}
          </div>
          <div>
            <h3>Hook Form Data</h3>
            {hookFormData ? (
              <div>
                <p>
                  <strong>Name:</strong> {hookFormData.name}
                </p>
                <p>
                  <strong>Age:</strong> {hookFormData.age}
                </p>
                <p>
                  <strong>Email:</strong> {hookFormData.email}
                </p>
                <p>
                  <strong>Gender:</strong> {hookFormData.gender}
                </p>
                <p>
                  <strong>Country:</strong> {hookFormData.country}
                </p>
                <p>
                  <strong>Picture:</strong>{' '}
                  <img src={hookFormData.picture} alt="Uploaded" width="100" />
                </p>
              </div>
            ) : (
              <p>No data submitted</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
