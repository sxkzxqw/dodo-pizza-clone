import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TSortProperty = 'rating' | 'title' | 'price' | '-rating' | '-title' | '-price';

type TSort = {
    name: string;
    sortProperty: TSortProperty;
}

interface IFilterSlice {
    categoryId: number;
    pageCount: number;
    sort: TSort;
}

const initialState: IFilterSlice = {
    categoryId: 0,
    pageCount: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state, action: PayloadAction<TSort>) {
            state.sort = action.payload;
        },
        setPageCount(state, action: PayloadAction<number>) {
            state.pageCount = action.payload;
        },
    }
})

export const { setCategoryId, setSort, setPageCount } = filterSlice.actions

export default filterSlice.reducer;