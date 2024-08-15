import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    acceptTerms: boolean;
    picture: string | null;
    country: string;
}

interface FormsState {
    uncontrolledForm: FormData | null;
    hookForm: FormData | null;
}

const initialState: FormsState = {
    uncontrolledForm: null,
    hookForm: null,
};

const formSlice = createSlice({
    name: 'forms',
    initialState,
    reducers: {
        setUncontrolledFormData(state, action: PayloadAction<FormData>) {
            state.uncontrolledForm = action.payload;
        },
        setHookFormData(state, action: PayloadAction<FormData>) {
            state.hookForm = action.payload;
        },
    },
});

export const { setUncontrolledFormData, setHookFormData } = formSlice.actions;
export default formSlice.reducer;
