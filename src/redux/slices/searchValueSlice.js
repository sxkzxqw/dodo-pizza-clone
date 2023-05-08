import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: '',
}

export const searchValue = createSlice({
    name: 'searchValue',
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.value = action.payload;
        },
    }
})

export const { setSearchValue } = searchValue.actions

export default searchValue.reducer;