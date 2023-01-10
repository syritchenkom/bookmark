import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		background: {
			paper: '#f2f2f2'
		},
		text: {
			primary: '#11111'
		}
	}
});

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		/* background: {
			paper: '#222'
		},
		text: {
			primary: '#fff'
		} */
		primary: {
			main: '#dbf4ff'
		},
		divider: '#004282',
		background: {
			default: '#000e21',
			paper: '#000e21'
		},
		text: {
			primary: '#fff',
			secondary: '#71717a'
		}
	}
});
