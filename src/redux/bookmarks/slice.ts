import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Bookmark } from '../../types/types';
import {BookmarkState, BookmarkArrayState} from './types';

import { fetchBookmarks } from './asyncActions';



const initialBookmarkState: BookmarkArrayState = {
	bookmarks: [], 
	addBookmark: {
		"userId": 0,
		"id": 0,
		"name": "",
		"url": ""	 
	}
};

export const bookmarkSlice = createSlice({
	name: 'bookmark',
	initialState: initialBookmarkState,
	reducers: {
		setBookmarks (state, action: PayloadAction<BookmarkState[]>){
			console.log('payload', action.payload);
			// state.bookmarks.push(action.payload);
			state.bookmarks = action.payload;
		}
		// setAddBookmark(state, action:PayloadAction<BookmarkState>){
		// 	state.addBookmark = action.payload
		// }
	},
	/* extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(fetchBookmarks.fulfilled, (state, action) => {
			// Add user to the state array
			state.bookmarks.push(action.payload);
		});
	} */
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = bookmarkSlice.actions;
// export const { addBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
