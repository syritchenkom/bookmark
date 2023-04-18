import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Bookmark, BookmarkSliceState, Status} from './types';
import {fetchBookmarks, renameBookmark, searchGlobalBookmark} from './asyncActions';
// import AddBookmark from '../../components/Header/AddBookmark';



const initialState: BookmarkSliceState = {
	bookmarks: [],
	filterBookmarks: [],
	searchValue: [],
	isSearch: false,
	status: Status.LOADING, // loading | success | error
	position: 0,
};

export const bookmarkSlice = createSlice({  //postsSlice
	name: 'bookmark',
	initialState,
	reducers: {
		setBookmarks: (state: { bookmarks: Bookmark[]; }, action: PayloadAction<Bookmark[]>) => {
			console.log('action.payload setBookmarks', action.payload);
			// state.bookmarks.push(action.payload);
			state.bookmarks = action.payload;
		},
		addBookmark: (state: { bookmarks: Bookmark[]; }, action: PayloadAction<Bookmark>) => {
			state.bookmarks.push({...action.payload});
		},
    setBookmarkFavorite: (state: { bookmarks: Bookmark[]; }, action: PayloadAction<Bookmark>) => {
			// const {userId, id, title, body} = action.payload;
			const { id, name, isFavorite} = action.payload;
			const existingBookmark = state.bookmarks.find((bookmark: { id: number; }) => bookmark.id === id);
			if(existingBookmark){
				existingBookmark.isFavorite = !isFavorite;
			}
			// state.bookmarks.push({...action.payload});

      console.log("existingBookmark", existingBookmark?.isFavorite);
		},
		changeBookmark: (state: { bookmarks: Bookmark[]; }, action: PayloadAction<Bookmark>) => {
			// const {userId, id, title, body} = action.payload;
			const { id, title, body} = action.payload;
			const existingBookmark = state.bookmarks.find((bookmark: { id: number; }) => bookmark.id === id);
			if(existingBookmark){
				existingBookmark.title = title;
				existingBookmark.body = body;
			}
		},
		deleteBookmark: (state: { bookmarks: Bookmark[]; }, action: PayloadAction <Bookmark>) => {
			const {id} = action.payload;
			console.log("action.payload", action.payload)
			const existingBookmark = state.bookmarks.find((bookmark: { id: number; }) => bookmark.id === id);
			if(existingBookmark){
				state.bookmarks = state.bookmarks.filter((bookmark: { id: number; }) => bookmark.id !== id)
			}			
		},
		searchBookmark: (state: { bookmarks: Bookmark[]; isSearch: boolean; searchValue: Bookmark[]; }, action: PayloadAction<string>) => {
			const value = action.payload.toLowerCase();
			const bookmarks = state.bookmarks.filter((el: { title: string; body: string; }) => el.title.toLowerCase().includes(value) || el.body.toLowerCase().includes(value));
			state.isSearch = !!value;
			state.searchValue = bookmarks;
		},
		updateBookmark: (state, action) => {
			state.position = action.payload;
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
        // state.error = action.error.message || 'Error fetching user data';
		})
			.addCase(renameBookmark.fulfilled, (state, action) => {
				state.status = Status.SUCCESS;
				// state.bookmarks = action.payload; //?????????
		})
			/*.addCase(searchGlobalBookmark.pending, (state) => {state.isSearch = true;}) */
			.addCase(searchGlobalBookmark.fulfilled, (state, action) => {
				// state.bookmarks = action.payload; 
				const {value, bookmarks} = action.payload
			   state.status = Status.SUCCESS;
				state.isSearch = !!value;
				state.searchValue = bookmarks;
			})
			/* .addCase(updateScrollBookmark.fulfilled, (state, action) => {
				state.position = action.payload
			}) */
	}
});

export const getBookmarkStatus = (state: any) => state.bookmarks.status; 
export const getBookmarkError = (state: any) => state.bookmarks.error;

// Action creators are generated for each case reducer function
export const { setBookmarks, addBookmark, setBookmarkFavorite, changeBookmark, deleteBookmark, searchBookmark, updateBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;