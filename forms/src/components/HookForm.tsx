import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setHookFormData } from '../store/formSlice';
import { RootState, AppDispatch } from '../store/store';

interface FormInputs {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    acceptTerms: boolean;
    picture: FileList;
    country: string;
}

export const HookForm: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>();
    const dispatch = useDispatch<AppDispatch>();
    const countries = useSelector((state: RootState) => state.countries.countries);

    const onSubmit = (data: FormInputs) => {
        const reader = new FileReader();
        reader.readAsDataURL(data.picture[0]);
        reader.onloadend = () => {
            const pictureBase64 = reader.result as string;
            dispatch(setHookFormData({
                ...data,
                picture: pictureBase64,
            }));
        };
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Name:</label>
                <input id="name" {...register('name', { required: true, pattern: /^[A-Z][a-z]*$/ })} />
                {errors.name && <span>Name should start with an uppercase letter.</span>}
            </div>
            <div>
                <label htmlFor="age">Age:</label>
                <input id="age" type="number" {...register('age', { required: true, min: 0 })} />
                {errors.age && <span>Age should be a non-negative number.</span>}
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" {...register('email', { required: true })} />
                {errors.email && <span>Invalid email address.</span>}
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" {...register('password', { required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/ })} />
                {errors.password && <span>Password must contain a number, an uppercase letter, a lowercase letter, and a special character.</span>}
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input id="confirmPassword" type="password" {...register('confirmPassword', { required: true, validate: value => value === watch('password') })} />
                {errors.confirmPassword && <span>Passwords do not match.</span>}
            </div>
            <div>
                <label htmlFor="gender">Gender:</label>
                <select id="gender" {...register('gender', { required: true })}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {errors.gender && <span>Gender is required.</span>}
            </div>
            <div>
                <label htmlFor="country">Country:</label>
                <select id="country" {...register('country', { required: true })}>
                    {countries.map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
                {errors.country && <span>Country is required.</span>}
            </div>
            <div>
                <label htmlFor="terms">Accept Terms and Conditions:</label>
                <input id="terms" type="checkbox" {...register('acceptTerms', { required: true })} />
                {errors.acceptTerms && <span>You must accept the terms and conditions.</span>}
            </div>
            <div>
                <label htmlFor="picture">Upload Picture:</label>
                <input id="picture" type="file" {...register('picture', { required: true })} accept=".png,.jpeg,.jpg" />
                {errors.picture && <span>Invalid file. Only png, jpeg, and jpg are allowed.</span>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};
