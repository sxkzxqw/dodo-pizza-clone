import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ISearchSlice {
    value: string;
}

const initialState: ISearchSlice = {
    value: '',
}

export const searchValue = createSlice({
    name: 'searchValue',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.value = action.payload;
        },
    }
})

export const { setSearchValue } = searchValue.actions

export default searchValue.reducer;