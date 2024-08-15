import React, { useRef, useState } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setUncontrolledFormData } from '../store/formSlice';
import { validationSchema } from '../yup/validationSchema';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  picture: FileList | null;
  country: string;
}

export const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData: FormData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value || 0),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      acceptTerms: termsRef.current?.checked || false,
      picture: pictureRef.current?.files || null,
      country: countryRef.current?.value || '',
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      let pictureBase64 = null;
      if (formData.picture && formData.picture[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(formData.picture[0]);
        reader.onloadend = () => {
          pictureBase64 = reader.result as string;
          dispatch(
            setUncontrolledFormData({
              ...formData,
              picture: pictureBase64,
            })
          );
        };
        navigate('/', { state: { formType: 'hookForm' } });
      } else {
        dispatch(
          setUncontrolledFormData({
            ...formData,
            picture: pictureBase64,
          })
        );
      }
    } catch (err) {
      const validationErrors: { [key: string]: string } = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
      }
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" type="text" ref={nameRef} />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input id="age" name="age" type="number" ref={ageRef} />
        {errors.age && <p>{errors.age}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" ref={emailRef} />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          ref={passwordRef}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          ref={confirmPasswordRef}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender" ref={genderRef}>
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="Apache">McDonnell Douglas AH-64 Apache</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p>{errors.gender}</p>}
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <select id="country" name="country" ref={countryRef}>
          <option value="">Select...</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && <p>{errors.country}</p>}
      </div>
      <div>
        <label htmlFor="terms">Accept Terms and Conditions:</label>
        <input id="terms" name="terms" type="checkbox" ref={termsRef} />
        {errors.acceptTerms && <p>{errors.acceptTerms}</p>}
      </div>
      <div>
        <label htmlFor="picture">Upload Picture:</label>
        <input
          id="picture"
          name="picture"
          type="file"
          ref={pictureRef}
          accept=".png,.jpeg,.jpg"
        />
        {errors.picture && <p>{errors.picture}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
