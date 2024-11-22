import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Grid, useMediaQuery, useTheme } from "@mui/material";
import Chartdata from "../../Services/Chartdata/Chartdata";
import CircleChart from "../../Components/Chart/Circlechart";
import useStyles from "./Homestyle";
import NavbarItem from '../../Components/Navbar/Navbar';
import { RootState } from '../../Auth/Store';

const Home: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      <NavbarItem/>
      <Typography
        className={classes.header}
        variant="h6"
        sx={{ 
          maxWidth: "xl", 
          mx: "auto", 
          my: "30px",
          fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
        }}
      >
        به سامانه اعتبارسنجی پارسیان(ساپ) خوش آمدید
      </Typography>
      <Box
        sx={{
          padding: { xs: 2, sm: 3, md: 4 },
          maxWidth: "xl",
          margin: "1.75rem auto",
          boxShadow: 3,
          borderRadius: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Grid container spacing={3} direction={isMobile || isTablet ? 'column' : 'row'}>
          <Grid item xs={12} md={6}>
            <Box className={classes.chartitem}>
              <Chartdata />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box 
              className={classes.chartitem} 
              sx={{
                pt: "30px", 
                pb: { xs: "30px", md: "76px" },
                height: { xs: 'auto', md: '100%' }
              }}
            >
              <CircleChart />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;