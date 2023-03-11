import React, { FC, useEffect, useState } from 'react';
import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Skeleton
} from '@mui/material';
import { Folder as FolderIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchFolders } from '../../redux/folder/asyncActions';
import { selectFolderData } from '../../redux/folder/selectors';
import { Folder } from '../../redux/folder/types';

const FolderList: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [open] = useState(false);

	//========= start redux components
	const dispatch = useAppDispatch();
	// const folders = useAppSelector(({ folder }) => folder.folders);
	const folders = useAppSelector(selectFolderData);
	const { filterFolders, searchGlobal } = useAppSelector(
		(state) => state.folder
	);

	const data: Folder[] = searchGlobal ? filterFolders : folders;

	/* const dataFiltered = data
		.slice()
	 	.sort((a, b) => a.name.localeCompare(b.name));
	*/

	const toggleTheme = useAppSelector(({ theme }) => theme.darkTheme);

	// ============end
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
			aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					Folder List Items
				</ListSubheader>
			}>
			{isLoading
				? skeletons
				: data.map(
						(folder: {
							id: React.Key | null | undefined;
							name:
								| boolean
								| React.ReactChild
								| React.ReactFragment
								| React.ReactPortal
								| null
								| undefined;
						}) => (
							<NavLink
								to={`/${folder.id}`}
								key={folder.id}
								style={({ isActive }) => {
									if (toggleTheme) {
										return isActive
											? {
													display: 'block',
													color: 'black',
													backgroundColor: 'skyBlue',
													textDecoration: 'none',
													borderRadius: '25px 0 0 25px'
											  }
											: {
													color: 'white',
													textDecoration: 'none'
											  };
									}
									return isActive
										? {
												display: 'block',
												color: 'black',
												backgroundColor: 'skyBlue',
												borderRadius: '25px 0 0 25px',
												textDecoration: 'none'
										  }
										: { color: 'black', textDecoration: 'none' };
								}}>
								<ListItemButton selected={open}>
									<ListItemIcon sx={{ minWidth: 40 }}>
										<FolderIcon />
									</ListItemIcon>
									<ListItemText primary={folder.name} />
								</ListItemButton>
							</NavLink>
						)
				  )}
		</List>
	);
};

export default FolderList;
