import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Folder } from "./types";


export const fetchFolders = createAsyncThunk<Folder[]>('folder/fetchFolderStatus', async (params) => {
	const { data } = await axios.get<Folder[]>('https://jsonplaceholder.typicode.com/users');
	console.log("data", data)
	return data;
});