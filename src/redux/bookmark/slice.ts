import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Bookmark, BookmarkSliceState, Status} from './types';
import { fetchBookmarks, renameBookmark, searchGlobalBookmark 
} from './asyncActions';
// import AddBookmark from '../../components/Header/AddBookmark';



const initialState: BookmarkSliceState = {
	bookmarks: [],
	searchValue: [],
	isSearch: false,
	status: Status.LOADING, // loading | success | error

};

export const bookmarkSlice = createSlice({  //postsSlice
	name: 'bookmark',
	initialState,
	reducers: {
		setBookmarks: (state, action: PayloadAction<Bookmark[]>) => {
			console.log('action.payload setBookmarks', action.payload);
			// state.bookmarks.push(action.payload);
			state.bookmarks = action.payload;
		},
		addBookmark: (state, action: PayloadAction<Bookmark>) => {
			// console.log('addBookmark', state, action, action.payload);
			state.bookmarks.push({...action.payload});
			// state.bookmarks = [action.payload, ...state.bookmarks];
		},
		changeBookmark: (state, action: PayloadAction<Bookmark>) => {
			// const {userId, id, title, body} = action.payload;
			const { id, title, body} = action.payload;
			const existingBookmark = state.bookmarks.find(bookmark => bookmark.id === id);
			if(existingBookmark){
				existingBookmark.title = title;
				existingBookmark.body = body;
			}
		},
		deleteBookmark: (state, action: PayloadAction <Bookmark>) => {
			const {id} = action.payload;
			const existingBookmark = state.bookmarks.find(bookmark => bookmark.id === id);
			if(existingBookmark){
				state.bookmarks = state.bookmarks.filter((bookmark) => bookmark.id !== id)
			}			
		},
		searchBookmark: (state, action: PayloadAction<string>) => {
			const value = action.payload.toLowerCase();
			console.log('searchBookmark_value:', value);
			const bookmarks = state.bookmarks.filter((el) => el.title.toLowerCase().includes(value) || el.body.toLowerCase().includes(value));
			state.isSearch = !!value;
			state.searchValue = bookmarks;
			console.log('searchBookmark_bookmarks:', bookmarks);
		} 
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder
			.addCase(fetchBookmarks.pending, (state) => {
			state.status = Status.LOADING;
			state.bookmarks = [];
		})
			.addCase(fetchBookmarks.fulfilled, (state, action) => {
			// Add user to the state array
			state.status = Status.SUCCESS;
			state.bookmarks = action.payload;
		})
			.addCase(fetchBookmarks.rejected, (state) => {
				state.status = Status.ERROR;
				state.bookmarks = [];
		})
			.addCase(renameBookmark.fulfilled, (state, action) => {
				state.status = Status.SUCCESS;
				// state.bookmarks = action.payload; //?????????
		})
			.addCase(searchGlobalBookmark.fulfilled, (state, action) => {
				// state.bookmarks = action.payload; 
				const {value, bookmarks} = action.payload
				console.log("valueGlobal", value);
				console.log("GlobalBookmarks", bookmarks);
			   state.status = Status.SUCCESS;
				state.isSearch = !!value;
				state.searchValue = bookmarks;
				console.log("bookmarksGlobal", bookmarks);
				console.log("searchGlobalBookmark", action.payload)
			})
			/* 
			.addCase(searchGlobalBookmark.pending, (state) => {
				state.isSearch = true;
			})
			.addCase(searchGlobalBookmark.pending, (state) => {
				state.isSearch = true;
			}) */
	}
});

export const getBookmarkStatus = (state: any) => state.bookmarks.status; 
export const getBookmarkError = (state: any) => state.bookmarks.error; 

// Action creators are generated for each case reducer function
export const { setBookmarks, addBookmark, changeBookmark, deleteBookmark, searchBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;