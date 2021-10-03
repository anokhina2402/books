import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { searchAPI, getBookAPI } from './searchAPI';

export interface GenericState {
  q: string;
  category: string;
  sort: string;
  startIndex: number;
  status: 'idle' | 'loading' | 'failed';
  data: any;
  currentBook: any;
}

const initialState = {
  q: "",
  category: "all",
  sort: "relevance",
  startIndex: 0,
  status: 'idle',
  data: {},
  currentBook: {}
} as GenericState;


export const search = createAsyncThunk(
  'search/searchAPI',
  async (values: any) => {
    const data = await searchAPI(values);
    return data;
  }
);

export const setCurrentBook = createAsyncThunk(
    'search/getBookAPI',
    async (token: string) => {
      const data = await getBookAPI(token);
      return data;
    }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQ: (state, action: PayloadAction<string>) => {
      state.q = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setStartIndex: (state, action: PayloadAction<number>) => {
      state.startIndex = action.payload;
    },
    setCurrentBook: (state, action: PayloadAction<any>) => {
      state.currentBook = action.payload;
    },
    clearData: (state) => {
      state.startIndex = 0;
      state.currentBook = {};
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(search.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        if (state.data.items) {
          state.data.items = [...state.data.items, ...action.payload.items];
          console.log(state.data.items);
        }
        else {
          state.data = action.payload;
        }
      })
      .addCase(setCurrentBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setCurrentBook.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        state.currentBook = action.payload;
      });
  },
});

export const { setQ, setCategory, setSort, setStartIndex, clearData } = searchSlice.actions;

export const getData = (state: RootState) => state.search.data;

export const getQ = (state: RootState) => state.search.q;
export const getCategory = (state: RootState) => state.search.category;
export const getSort = (state: RootState) => state.search.sort;
export const getStartIndex = (state: RootState) => state.search.startIndex;
export const getCurrentBook = (state: RootState) => state.search.currentBook;
export const getStatus = (state: RootState) => state.search.status;

export default searchSlice.reducer;
