import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




export const fetchBookmarks = createAsyncThunk('bookmarks/fetchBookmarksStatus', async (params: { page?: number } = {}) => {
	const userId  = params;
	const {data} = await axios.get(
				`https://jsonplaceholder.typicode.com/users/${userId}/posts`
			);
 
	return data;
});