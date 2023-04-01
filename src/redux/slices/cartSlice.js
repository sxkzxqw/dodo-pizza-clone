import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(item => item.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = state.items.reduce((sum, item) => { return sum + item.price * item.count }, 0)
        },
        removeItem(state, action) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
            state.totalPrice = state.items.reduce((sum, item) => { return sum + item.price * item.count }, 0)
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
        minusItem(state, action) {
            const findItem = state.items.find(item => item.id === action.payload);

            if (findItem) {
                findItem.count--;
                state.totalPrice = state.items.reduce((sum, item) => { return sum + item.price * item.count }, 0)
                if (findItem.count === 0) {
                    state.items = state.items.filter((obj) => obj.id !== action.payload);
                }
            }
        }
    }
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer;