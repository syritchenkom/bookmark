import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Grid, Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import FolderList from '../../components/FolderList';
import Header from '../../components/Header';

import { useAppSelector } from '../../redux/store';
import { darkTheme, lightTheme } from '../../components/Theme/Theme';


const Home: FC = () => {
  // get theme from store
  const theme = useAppSelector(({ theme }) => theme.darkTheme);

  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <CssBaseline />
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ paddingLeft: '0' }}>
          <Header />
          <Container
            sx={{
              display: 'flex',
              margin: '0',
              padding: '0'
            }}>
            <FolderList />
            <Outlet />
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Home;
