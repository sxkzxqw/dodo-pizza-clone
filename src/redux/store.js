import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";
import pizzasSlice from "./slices/pizzasSlice";
import searchValueSlice from "./slices/searchValueSlice";

export const store = configureStore({
    reducer: {
        filters: filterSlice,
        cart: cartSlice,
        pizza: pizzasSlice,
        searchValue: searchValueSlice,
    }
})