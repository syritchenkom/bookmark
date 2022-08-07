import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Bookmark} from "./types"

 
export const fetchBookmarks = createAsyncThunk('bookmark/fetchBookmarkStatus', async (params: { userId: string | undefined} ) => {
	const {userId}  = params;
	// console.log("userId", userId)
	const {data} = await axios.get<Bookmark[]>(
				`https://jsonplaceholder.typicode.com/users/${userId}/posts`
			);
	return data;
});

export const renameBookmark = createAsyncThunk('bookmark/renameBookmark', async (params: {userId: string | undefined}) => {
	const {userId} = params;
	try {
		const response = await axios.put<Bookmark[]>(`https://jsonplaceholder.typicode.com/users/${userId}/posts`, params
		)
		return response.data
	}catch(err){
		//return err.message;
		return params; //only for testing Redux!
	}
})

export const deleteBookmark = createAsyncThunk('bookmark/deleteBookmark', async (params: {userId: string | undefined}) => {
	const {userId} = params;
	// console.log("userId", userId)
	const {data} = await axios.delete<Bookmark[]>(
				`https://jsonplaceholder.typicode.com/users/${userId}/posts`
			);
	return data;
})
