import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { filterFolders } from "../folder/slice";
import { Bookmark } from "./types";



export const fetchBookmarks = createAsyncThunk('bookmark/fetchBookmarkStatus', async (params: { userId: string | undefined}, thunkAPI ) => {
	try {
	const {userId}  = params;
	// console.log(thunkAPI.getState())
	const {data} = await axios.get<Bookmark[]>(
				`https://jsonplaceholder.typicode.com/users/${userId}/posts`
			);
	return data;
	} catch (error: any){ // ?????????????
		// return thunkAPI.rejectWithValue('Something went wrong...');
		return thunkAPI.rejectWithValue(error.message);
	}
});

export const renameBookmark = createAsyncThunk('bookmark/renameBookmarkStatus', async (params: {userId: string | undefined}) => {
	const {userId} = params;
	try {
		const response = await axios.put<Bookmark[]>(`https://jsonplaceholder.typicode.com/users/${userId}/posts`, params
		)
		return response.data
	}catch(error){
		//return err.message;
		return params; //only for testing Redux!
	}
});

export const deleteBookmark = createAsyncThunk('bookmark/deleteBookmarkStatus', async (params: {userId: number | undefined}) => {
	const {userId} = params;
	// console.log("userId", userId)
	const {data} = await axios.delete<Bookmark[]>(
				`https://jsonplaceholder.typicode.com/users/${userId}/posts`
			);
	return data;
});

export const searchGlobalBookmark = createAsyncThunk('bookmark/searchGlobalBookmarkStatus', async(title: string, thunkAPI) => {
	console.log('searchGlobalBookmark');
	const {data} = await axios.get<Bookmark[]>(
		`https://jsonplaceholder.typicode.com/posts`
	);
	const value = title.toLowerCase();
			console.log('value', value);
			const bookmarks = data.filter((el) => el.title.toLowerCase().includes(value) || el.body.toLowerCase().includes(value));
			const userIds = bookmarks.map(bookmark => bookmark.userId)
			thunkAPI.dispatch(filterFolders(userIds))
			console.log("bookmark", bookmarks)

			
	return {value, bookmarks};
});