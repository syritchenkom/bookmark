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

// import { useAppDispatch } from '../../redux/store';
// import { nanoid } from '@reduxjs/toolkit';
// import { renameBookmark } from '../../redux/bookmark/slice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

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
}

const RenameBookmark: FC<RenameBookmarkProps> = ({
	renameBookmarkOpen,
	setRenameBookmarkOpen,
	onClose
}) => {
	const { userId } = useParams();
	/* const bookmark = useSelector((state) =>
		selecBookmarkId(state, Number(userIdre))
	); */
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setRenameBookmarkOpen(false);
	};

	const canSave = Boolean(title) && Boolean(body);

	const changedBookmarkLine = () => {
		if (title && body) {
			dispatch();
		}
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
						<InputLabel shrink htmlFor="postTitle">
							Title
						</InputLabel>
						<FormControl fullWidth required variant="standard">
							<TextField
								type="text"
								id="postTitle"
								name="postTitle"
								variant="filled"
								autoComplete="title"
								autoFocus
								// value={title}
								// onChange={onTitleChanged}
							/>
						</FormControl>
						<Box mt={2} />
						<InputLabel shrink htmlFor="postBody">
							Body
						</InputLabel>
						<FormControl fullWidth variant="standard">
							<TextField
								type="text"
								id="postBody"
								name="postBody"
								variant="filled"
								autoComplete="body"
								// value={body}
								// onChange={onBodyChange}
							/>
						</FormControl>
						<Box mt={2} sx={{ float: 'right' }}>
							<Button type="button" onClick={handleClose}>
								Cancel
							</Button>
							<Button
								type="submit"
								variant="contained"
								onClick={changedBookmarkLine}
								disabled={!canSave}>
								Save
							</Button>
						</Box>
					</form>
				</Box>
			</Modal>
		</>
	);
};

export default RenameBookmark;
