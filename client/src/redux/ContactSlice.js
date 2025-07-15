import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Initial state for the contact form
const initialState = {
    status: 'idle',
    responseMessage: '',
};
const backendURL = import.meta.env.VITE_BACKEND_URL;


export const sendContactForm = createAsyncThunk(
    'contact/send',
    async (formData, thunkAPI) => {
        try {
            const response = await axios.post(
                `${backendURL}/api/contact`,
                formData,
                { withCredentials: true } 
            );

            return response.data; 
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || 'Something went wrong'
            );
        }
    }
);


const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        clearStatus: (state) => {
            state.status = 'idle';
            state.responseMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendContactForm.pending, (state) => {
                state.status = 'submitting';
            })
            .addCase(sendContactForm.fulfilled, (state, action) => {
                state.status = 'success';
                state.responseMessage = action.payload.message;
            })
            .addCase(sendContactForm.rejected, (state, action) => {
                state.status = 'error';
                state.responseMessage = action.payload || 'Something went wrong.';
            });
    },
});

export const { clearStatus } = contactSlice.actions;
export default contactSlice.reducer;
