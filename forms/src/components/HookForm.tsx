import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { setHookFormData } from '../store/formSlice';
import { RootState, AppDispatch } from '../store/store';
import { validationSchema } from '../yup/validationSchema';
import { useNavigate } from 'react-router-dom';

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
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );

  const onSubmit = (data: FormInputs) => {
    const reader = new FileReader();
    reader.readAsDataURL(data.picture[0]);
    reader.onloadend = () => {
      const pictureBase64 = reader.result as string;
      dispatch(
        setHookFormData({
          ...data,
          picture: pictureBase64,
        })
      );
      navigate('/', { state: { formType: 'hookForm' } });
    };
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input id="age" type="number" {...register('age')} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" {...register('gender')}>
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="apache">McDonnell Douglas AH-64 Apache</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <select id="country" {...register('country')}>
          <option value="">Select...</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && <p>{errors.country.message}</p>}
      </div>
      <div>
        <label htmlFor="terms">Accept Terms and Conditions:</label>
        <input id="terms" type="checkbox" {...register('acceptTerms')} />
        {errors.acceptTerms && <p>{errors.acceptTerms.message}</p>}
      </div>
      <div>
        <label htmlFor="picture">Upload Picture:</label>
        <input
          id="picture"
          type="file"
          {...register('picture')}
          accept=".png,.jpeg,.jpg"
        />
        {errors.picture && <p>{errors.picture.message}</p>}
      </div>
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};
