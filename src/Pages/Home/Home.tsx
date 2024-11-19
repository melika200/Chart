import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid/";
import Chartdata from "../../Services/Chartdata/Chartdata";
import CircleChart from "../../Components/Chart/Circlechart";
import useStyles from "./Homestyle";
import Navbar from '../../Components/Navbar/Navbar';
import NavbarItem from '../../Components/Navbar/Navbar';

interface RootState {
  auth: {
    isAuthenticated: boolean;
    user: User | null;
  };
}

interface User {
  id: string;
  name: string;
}

const Home: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  const classes = useStyles();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      <NavbarItem/>
      <Typography
        className={classes.header}
        variant="h6"
        sx={{ maxWidth: "lg", mx: "auto" }}
      >
        به سامانه اعتبارسنجی پارسیان(ساپ) خوش آمدید
      </Typography>
      <Box
        sx={{
          padding: 4,
          maxWidth: "lg",
          margin: "0.75rem auto",
        }}
      >
        <Grid container spacing={2} columns={10}>
          <Grid xs={5} sx={{ backgroundColor: "background.paper" }} className={classes.chartitem}>
            <Chartdata />
          </Grid>
          <Grid xs={5} sx={{ backgroundColor: "background.paper"}} className={classes.chartitem}>
            <CircleChart />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;