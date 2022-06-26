export interface MenuListProps {
	id: number;
	name: string;
	username: string;
	email: string;
	address: IAddress;
	phone: string;
	website: string;
	company: ICompany;
}

export interface IAddress {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: IGeo;
}

export interface IGeo {
	lat: string;
	lng: string;
}

export interface ICompany {
	name: string;
}

export interface UserItemProps {
	userId: number;
	id: number;
	title: string;
	body: string;
}
