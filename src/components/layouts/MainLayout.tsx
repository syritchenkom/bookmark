import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header/Header';
import MenuList from '../FolderList/FolderList';

const MainLayout: FC = () => {
	return (
		<div>
			<Header />
			<MenuList />
			<div>{/* <Outlet /> */}</div>
		</div>
	);
};

export default MainLayout;
