import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TPizzaRedux, TPizzaType } from "../../utils/types/types";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/totalPrice";

interface state {
    totalPrice: number;
    items: TPizzaRedux[];
}

const { json, totalPrice } = getCartFromLS()

const initialState: state = {
    totalPrice,
    items: json,
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

            state.totalPrice = calcTotalPrice(state.items)
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
            state.totalPrice = state.items.reduce((sum, item) => { return sum + item.price * item.count }, 0)
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
        minusItem(state, action: PayloadAction<string>) {
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