import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setUncontrolledFormData } from '../store/formSlice';

export const UncontrolledForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const countries = useSelector((state: RootState) => state.countries.countries);

    const nameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<HTMLSelectElement>(null);
    const termsRef = useRef<HTMLInputElement>(null);
    const pictureRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLSelectElement>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const name = nameRef.current?.value || '';
        const age = Number(ageRef.current?.value || 0);
        const email = emailRef.current?.value || '';
        const password = passwordRef.current?.value || '';
        const confirmPassword = confirmPasswordRef.current?.value || '';
        const gender = genderRef.current?.value || '';
        const acceptTerms = termsRef.current?.checked || false;
        const country = countryRef.current?.value || '';

        let picture = null;
        if (pictureRef.current?.files && pictureRef.current.files[0]) {
            const file = pictureRef.current.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                picture = reader.result as string;
                dispatch(setUncontrolledFormData({
                    name,
                    age,
                    email,
                    password,
                    confirmPassword,
                    gender,
                    acceptTerms,
                    picture,
                    country
                }));
            };
        } else {
            dispatch(setUncontrolledFormData({
                name,
                age,
                email,
                password,
                confirmPassword,
                gender,
                acceptTerms,
                picture,
                country
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input id="name" name="name" type="text" ref={nameRef} required pattern="[A-Z][a-z]*" />
            </div>
            <div>
                <label htmlFor="age">Age:</label>
                <input id="age" name="age" type="number" ref={ageRef} min="0" required />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" ref={emailRef} required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" ref={passwordRef} required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)" />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input id="confirmPassword" name="confirmPassword" type="password" ref={confirmPasswordRef} required />
            </div>
            <div>
                <label htmlFor="gender">Gender:</label>
                <select id="gender" name="gender" ref={genderRef} required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label htmlFor="country">Country:</label>
                <select id="country" name="country" ref={countryRef} required>
                    {countries.map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="terms">Accept Terms and Conditions:</label>
                <input id="terms" name="terms" type="checkbox" ref={termsRef} required />
            </div>
            <div>
                <label htmlFor="picture">Upload Picture:</label>
                <input id="picture" name="picture" type="file" ref={pictureRef} accept=".png,.jpeg,.jpg" />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};
