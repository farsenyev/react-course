import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z][a-z]*$/, 'Name should start with an uppercase letter.')
    .required('Name is required.'),
  age: yup
    .number()
    .positive('Age should be a non-negative number.')
    .integer('Age should be an integer.')
    .required('Age is required.'),
  email: yup
    .string()
    .email('Invalid email address.')
    .required('Email is required.'),
  password: yup
    .string()
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
      'Password must contain a number, an uppercase letter, a lowercase letter, and a special character.'
    )
    .required('Password is required.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match.')
    .required('Confirm Password is required.'),
  gender: yup.string().required('Gender is required.'),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions.'),
  picture: yup
    .mixed()
    .test('fileType', 'Only png, jpeg, and jpg are allowed.', (value) => {
      return (
        value &&
        value.length > 0 &&
        ['image/png', 'image/jpeg'].includes(value[0].type)
      );
    })
    .test('fileSize', 'File size should be less than 2MB.', (value) => {
      return value && value.length > 0 && value[0].size <= 2000000;
    })
    .required('Picture is required.'),
  country: yup.string().required('Country is required.'),
});
