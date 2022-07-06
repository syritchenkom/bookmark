import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Bookmark} from "./types"

 
export const fetchBookmarks = createAsyncThunk('bookmark/fetchBookmarkStatus', async (params: { userId: string | undefined} ) => {
	const {userId}  = params;
	console.log("userId", userId)
	const {data} = await axios.get<Bookmark[]>(
				`https://jsonplaceholder.typicode.com/users/${userId}/posts`
			);
	return data;
});

/*export const fetchBookmarks = createAsyncThunk<Bookmark[]>('bookmark/fetchBookmarkStatus', async (params) => {
	const {userId}  = params;
	console.log("params", params);
	console.log("userId", userId)
	const {data} = await axios.get<Bookmark[]>(
				`https://jsonplaceholder.typicode.com/users/${userId}/posts`
			);
	return data;
}); */