export type Folder = {
	id: number;
	name: string;
	username: string;
	email: string;
	address: IAddress;
	phone: string;
	website: string;
	company: ICompany;
}

export type IAddress = {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: IGeo;
}

export type IGeo = {
	lat: string;
	lng: string;
}

export type ICompany = {
	name: string;
   catchPhrase: string;
   bs: string;
}

export enum Status {
   LOADING = 'loading',
   SUCCESS = 'completed',
   ERROR = 'error',
}

export interface FolderSliceState {
   folders: Folder[];
	// sortBy: string;
   status: Status;
}