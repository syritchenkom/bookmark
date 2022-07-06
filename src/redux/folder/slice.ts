import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchFolders } from './asyncActions';
import { Folder, FolderSliceState, Status } from './types'

const initialState: FolderSliceState  = {
  folders: [],
  status: Status.LOADING, // loading | success | error
}

export const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {
   setFolders(state, action: PayloadAction<Folder[]>){
 			console.log('action.payload setFolders', action.payload);

    state.folders = action.payload;
   }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFolders.pending, (state, action) => {
      state.status = Status.LOADING;
      state.folders = [];
    });
    
    builder.addCase(fetchFolders.fulfilled, (state, action) => {
      state.folders = action.payload;
      state.status = Status.SUCCESS;
    })
    
    builder.addCase(fetchFolders.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.folders = [];
    })
  },
})

// Action creators are generated for each case reducer function
export const { setFolders } = folderSlice.actions

export default folderSlice.reducer