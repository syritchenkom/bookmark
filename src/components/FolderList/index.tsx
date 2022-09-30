import React, { FC, useEffect, useState } from 'react';
import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from '@mui/material';
import { Folder } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

// import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchFolders } from '../../redux/folder/asyncActions';

const FolderList: FC = () => {
	const [open] = useState(false);

	const dispatch = useAppDispatch();
	const folders = useAppSelector(({ folder }) => folder.folders);

	useEffect(() => {
		if (!folders?.length) {
			dispatch(fetchFolders());
		}
	}, [dispatch, folders?.length]);

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
			{folders ? (
				folders.map((folder) => (
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
				))
			) : (
				<div>Could not find folders</div>
			)}
		</List>
	);
};

export default FolderList;
