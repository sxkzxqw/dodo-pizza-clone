import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TPizzaType } from "../../utils/types/types";

interface IPizzaSlice {
    items: TPizzaType[];
    isLoading: boolean;
}

const initialState: IPizzaSlice = {
    items: [],
    isLoading: false,
}

type TFetchArgs = {
    order: string,
    search: string,
    currentPage: number,
    categoryId: number,
    sortType: string,
};

export const fetchPizzas = createAsyncThunk<TPizzaType[], TFetchArgs>(
    'pizza/fetchPizzas',
    async (params) => {
        const { order,
            search,
            currentPage,
            categoryId,
            sortType } = params;
        const requestURL = (`https://64247d6f9e0a30d92b1d3695.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}${search}&sortBy=${sortType.replace('-', '')}&order=${order}`);
        const response = await axios.get<TPizzaType[]>(`${requestURL}`)
        return response.data;
    }
)

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<TPizzaType[]>) {
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