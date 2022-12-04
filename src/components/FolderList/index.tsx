import React, { FC, useEffect, useState } from 'react';
import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from '@mui/material';
import { Folder } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchFolders } from '../../redux/folder/asyncActions';
import { selectFolderData } from '../../redux/folder/selectors';
//??? \/ Test \/
import { searchBookmark } from '../../redux/bookmark/slice';

const FolderList: FC = () => {
	const [open] = useState(false);

	const dispatch = useAppDispatch();
	// const folders = useAppSelector(({ folder }) => folder.folders);
	const folders = useAppSelector(selectFolderData);

	// const activeStyle = {
	// 	display: 'block',
	// 	margin: '1rem 0',
	// 	color: 'black',
	// 	// backgroundColor: isActive ? 'skyBlue' : '',
	// 	// backgroundColor: 'skyBlue',
	// 	backgroundColor: searchGlobalBookmark ? '' : 'skyBlue',
	// 	borderRadius: '25px 0 0 25px',
	// 	textDecoration: 'none'
	// };

	useEffect(() => {
		if (!folders?.length) {
			dispatch(fetchFolders());
		}
	}, [dispatch, folders?.length]);

	/* let activeStyle = {
		textDecoration: 'underline'
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
						// isActive={activeStyle}
						key={folder.id}>
						<ListItemButton selected={open}>
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
