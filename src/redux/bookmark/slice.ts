import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Bookmark, BookmarkSliceState, Status} from './types';
import { fetchBookmarks, 
	renameBookmark 
} from './asyncActions';
// import AddBookmark from '../../components/Header/AddBookmark';



const initialState: BookmarkSliceState = {
	bookmarks: [],
	status: Status.LOADING,

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
		/* renameBookmark (state, action: PayloadAction<Bookmark>){
			if(!action.payload?.id){
				console.log('update could not complete')
				console.log(action.payload);
				return;
			}
			const {id} = action.payload;
			const bookmarks = state.bookmarks.filter(bookmark => bookmark.id !== id);
			state.bookmarks = [...bookmarks, action.payload]
		}, */
		deleteBookmark: (state, action: PayloadAction <Bookmark>) => {
			const {id} = action.payload;
			// const checkedBookmark = state.bookmarks.find(bookmark => bookmark.id === id);
			// if(checkedBookmark){
			// 	return state.bookmarks.filter(bookmark => bookmark.id !== id);
			// }
			state.bookmarks.filter(bookmark => bookmark.id !== id);
			state.bookmarks = state.bookmarks.filter((bookmark) => bookmark.id !== action.payload.id)
			
		},
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder
			.addCase(fetchBookmarks.pending, (state, action) => {
			state.status = Status.LOADING
		})
			.addCase(fetchBookmarks.fulfilled, (state, action) => {
			// Add user to the state array
			// state.bookmarks.push(action.payload);
			state.bookmarks = action.payload;
		})
			.addCase(renameBookmark.fulfilled, (state, action) => {

		})
	}
});

// Action creators are generated for each case reducer function
export const { setBookmarks, addBookmark, changeBookmark, deleteBookmark } = bookmarkSlice.actions;

// export const selectBookmarkId = (state, userId) => state.bookmarks.bookmark.find(bookmark => bookmark.id === userId);

export default bookmarkSlice.reducer;
