import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    isLoading: false,
}

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',
    async (params) => {
        const { order, search, currentPage, categoryId, sortType } = params;
        const response = await axios.get(`https://64247d6f9e0a30d92b1d3695.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''}${search}&sortBy=${sortType.replace('-', '')}&order=${order}`);
        return response.data;
    }
)

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isLoading = false;
            }).addCase(fetchPizzas.pending, (state) => {
                state.items = [];
                state.isLoading = true;
            }).addCase(fetchPizzas.rejected, (state) => {
                state.items = [];
                state.isLoading = false;
                alert('Ошибка запроса')
            })
    }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer;