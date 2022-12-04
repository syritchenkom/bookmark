import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchFolders } from './asyncActions';
import { Folder, FolderSliceState, Status } from './types'

const initialState: FolderSliceState  = {
  folders: [],
  filterFolders: [],
  // sortBy: "name",
  status: Status.LOADING, // loading | success | error
}

export const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {
   setFolders(state, action: PayloadAction<Folder[]>){
 		console.log('action.payload setFolders', action.payload);

    state.folders = action.payload;
   },
   addFolder(state, action: PayloadAction<Folder>){
    state.folders.push({...action.payload});
   },
   sortFolders(state){
      // const sortBy = action.payload.name;
      // state.folders = state.folders.sort((a, b) => b.name < a.name);
    // ===============
    console.log(state.folders.sort((a,b) => a.name.localeCompare(b.name)))
    state.folders = state.folders.sort((a,b) => a.name.localeCompare(b.name))
   },
   filterFolders(state, {payload}: PayloadAction<number[]>){
    state.folders = state.folders.filter((folder) => payload.includes(folder.id))
    // state.filterFolders = state.folders;
    state.folders = state.filterFolders;  
   }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state, action) => {
      state.status = Status.LOADING;
      state.folders = [];
    })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.folders = action.payload;
        state.status = Status.SUCCESS;

      })
      .addCase(fetchFolders.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.folders = [];
    })
  },
})

// Action creators are generated for each case reducer function
export const { setFolders, addFolder, sortFolders, filterFolders } = folderSlice.actions

export default folderSlice.reducer