import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookmarkState {
	value: string;
}

const initialState: BookmarkState = {
	value: ''
};

export const bookmarkSlice = createSlice({
	name: 'bookmark',
	initialState,
	reducers: {}
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = bookmarkSlice.actions;
export const {} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
