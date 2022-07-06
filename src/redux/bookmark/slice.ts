import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Bookmark, BookmarkSliceState, Status} from './types';
import { fetchBookmarks } from './asyncActions';



const initialState: BookmarkSliceState = {
	bookmarks: [],
	status: Status.LOADING,
	// addBookmark: {
	// 	"userId": 0,
	// 	"id": 0,
	// 	"name": "",
	// 	"url": ""	 
	// }
};

export const bookmarkSlice = createSlice({
	name: 'bookmark',
	initialState,
	reducers: {
		setBookmarks (state, action: PayloadAction<Bookmark[]>){
			console.log('action.payload setBookmarks', action.payload);
			// state.bookmarks.push(action.payload);
			state.bookmarks = action.payload;
		}
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(fetchBookmarks.fulfilled, (state, action) => {
			// Add user to the state array
			// state.bookmarks.push(action.payload);
			state.bookmarks = action.payload;
		});
	}
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = bookmarkSlice.actions;
export const { setBookmarks } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
