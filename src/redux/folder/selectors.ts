import { RootState } from "../store";

export const selectFolderData = (state: RootState) => state.folder.folders;
