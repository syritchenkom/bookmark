import React, { FC, useEffect, useState } from 'react';
import { MenuListProps } from '../../types/types';
import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from '@mui/material';
import { Folder } from '@mui/icons-material';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

// interface MenuListProps {
// 	folders: IUser[];
// }

const MenuList: FC = () => {
	const [open] = useState(false); //setOpen
	// const [users, setUsers] = useState<IUser[]>([]);
	const [folders, setFolders] = useState<MenuListProps[]>([]);

	// const { userId } = useParams();

	useEffect(() => {
		fetchMenuUsers();
	}, []);
	async function fetchMenuUsers() {
		try {
			const response = await axios.get(
				'https://jsonplaceholder.typicode.com/users'
			);
			setFolders(response.data);
		} catch (error) {
			alert(error);
		}
	}

	/* 	const handleClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
		// index: number
	) => {
		// setSelectedButton(true);
		setOpen(!open);
	}; */

	return (
		<List
			sx={{
				maxHeight: 450,
				width: '100%',
				maxWidth: 350,
				marginTop: '4rem',
				bgcolor: 'background.paper',
				position: 'relative',
				overflow: 'auto',
				marginRight: 5,
				'& ul': { padding: 0 }
			}}
			component="nav"
			aria-labelledby="nested-list-subheader">
			{/* {console.log('folders', folders)} */}
			{folders.map((folder) => (
				<NavLink
					style={({ isActive }) => {
						return {
							display: 'block',
							margin: '1rem 0',
							color: 'black',
							backgroundColor: isActive ? 'skyBlue' : '',
							borderRadius: '25px 0 0 25px',
							textDecoration: 'none'
						};
					}}
					to={`/${folder.id}`}
					key={folder.id}>
					<ListItemButton
						// sx={{ borderRadius: '25px 0 0 25px' }}
						selected={open}>
						<ListItemIcon sx={{ minWidth: 40 }}>
							<Folder />
						</ListItemIcon>
						<ListItemText primary={folder.name} />
					</ListItemButton>
				</NavLink>
			))}
		</List>
	);
};

export default MenuList;
