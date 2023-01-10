import React, { FC } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

import GoogleLogo from '../../assets/logo/googleLogo.png';

const Logo: FC = () => {
	return (
		<Box component="div" sx={{ flexGrow: 1 }}>
			<NavLink
				to="/"
				style={{
					display: 'flex',
					alignItems: 'center',
					textDecoration: 'none',
					color: '#eceff1'
				}}>
				<Avatar
					src={GoogleLogo}
					alt="Google logo"
					sx={{ width: 24, height: 24, marginRight: 1 }}
				/>
				<Typography
					variant="h6"
					noWrap
					component="div"
					// sx={{ display: { xs: 'block' } }
				>
					Bookmarks
				</Typography>
			</NavLink>
		</Box>
	);
};

export default Logo;
