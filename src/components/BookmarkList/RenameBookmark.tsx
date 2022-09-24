import React, { FC, useState } from 'react';
import {
	Box,
	Modal,
	Button,
	Typography,
	InputLabel,
	FormControl,
	TextField
} from '@mui/material';

import { useAppDispatch } from '../../redux/store';
// import { nanoid } from '@reduxjs/toolkit';

// import { useNavigate, useParams } from 'react-router-dom';
import { changeBookmark } from '../../redux/bookmark/slice';
import { Bookmark } from '../../redux/bookmark/types';
// import { Bookmarks, BookmarksOutlined } from '@mui/icons-material';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	maxWidth: '100%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
	// pt: 2,
	// px: 4,
	// pb: 3
};

interface RenameBookmarkProps {
	renameBookmarkOpen: any;
	setRenameBookmarkOpen: any;
	onClose: (value: string) => void;
	bookmark: Bookmark;
}

const RenameBookmark: FC<RenameBookmarkProps> = ({
	renameBookmarkOpen,
	setRenameBookmarkOpen,
	onClose,
	bookmark
}) => {
	console.log('bookmark', bookmark);
	// const { userId } = useParams();
	const dispatch = useAppDispatch();

	const [currentBookmark, setCurrentBookmark] = useState(bookmark);
	// const [open, setOpen] = useState(false);

	const onTitleChanged = (e: any) => {
		const item: Bookmark = {
			...currentBookmark,
			title: e.target.value as string
		};
		setCurrentBookmark(item);
	};
	const onBodyChanged = (e: any) => {
		const item: Bookmark = {
			...currentBookmark,
			body: e.target.value as string
		};
		setCurrentBookmark(item);
	};

	// const handleOpen = () => {
	// 	setOpen(true);
	// };
	const handleClose = () => {
		setRenameBookmarkOpen(false);
	};

	const canSave =
		Boolean(currentBookmark.title) && Boolean(currentBookmark.body);

	const renameBookmarkLine = () => {
		if (currentBookmark.title && currentBookmark.body) {
			dispatch(changeBookmark(currentBookmark));
		}
		setRenameBookmarkOpen(false);
	};
	return (
		<>
			<Modal
				open={renameBookmarkOpen}
				onClose={onClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h6">
						Rename folder
					</Typography>
					<form>
						<InputLabel shrink htmlFor="bookmarkTitle">
							Title
						</InputLabel>
						<FormControl fullWidth required variant="standard">
							<TextField
								type="text"
								id="bookmarkTitle"
								name="bookmarkTitle"
								variant="filled"
								autoComplete="title"
								autoFocus
								value={currentBookmark.title}
								onChange={onTitleChanged}
							/>
						</FormControl>
						<Box mt={2} />
						<InputLabel shrink htmlFor="bookmarkBody">
							Body
						</InputLabel>
						<FormControl fullWidth variant="standard">
							<TextField
								type="text"
								id="bookmarkBody"
								name="bookmarkBody"
								variant="filled"
								autoComplete="body"
								value={currentBookmark.body}
								onChange={onBodyChanged}
							/>
						</FormControl>
						<Box mt={2} sx={{ float: 'right' }}>
							<Button type="button" onClick={handleClose}>
								Cancel
							</Button>
							<Button
								type="button"
								variant="contained"
								onClick={renameBookmarkLine}
								disabled={!canSave}>
								Rename
							</Button>
						</Box>
					</form>
				</Box>
			</Modal>
		</>
	);
};

export default RenameBookmark;
