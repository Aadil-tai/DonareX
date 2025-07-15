import axios from 'axios';

export const createOrder = async (formData) => {
    try {
        const { data } = await axios.post('/create-order', formData);
        return data;
    } catch (err) {
        console.error('Error creating order:', err);
        return null;
    }
};
