import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Grid, Container } from '@mui/material';

import FolderList from '../../components/FolderList';
import Header from '../../components/Header';
// import UserItem from '../../components/UserItem/UserItem';

const Home: FC = () => {
	return (
		<Grid container spacing={7}>
			<Grid item xs={12} sm={12} md={12} lg={12}>
				<Header />
				<Container
					sx={{ display: 'flex', margin: '0', padding: '0', paddingLeft: '0' }}>
					<FolderList />
					<Outlet />
				</Container>
			</Grid>
		</Grid>
	);
};

export default Home;
