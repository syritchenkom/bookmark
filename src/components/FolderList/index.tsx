import React, { FC, useEffect, useState } from 'react';
import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Skeleton
} from '@mui/material';
import { Folder } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchFolders } from '../../redux/folder/asyncActions';
import { selectFolderData } from '../../redux/folder/selectors';

const FolderList: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
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
		const timer: any = setTimeout(() => {
			if (!folders?.length) {
				dispatch(fetchFolders());
				setIsLoading(false);
			}
		}, 1000);

		return () => clearTimeout(timer);
	}, [dispatch, folders?.length]);

	// const skeletons = Array.from(new Array(10)).map((item, index) => (
	// 	<Skeleton key={index} height={64} />
	// ));
	const skeletons = [...new Array(10)].map((_, index) => (
		<Skeleton key={index} height={64} />
	));

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
			{isLoading
				? skeletons
				: folders.map((folder) => (
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
				  ))}
		</List>
	);
};

export default FolderList;
