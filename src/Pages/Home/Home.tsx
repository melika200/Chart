import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Chartdata from "../../Services/Chartdata/Chartdata";
import CircleChart from "../../Components/Chart/Circlechart";
import useStyles from "./Homestyle";

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <>
       <Typography  className={classes.header} variant="h6" sx={{maxWidth:"lg", mx:"auto"}}>
          به سامانه اعتبارسنجی پارسیان(ساپ) خوش آمدید
        </Typography>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "background.paper",
          maxWidth: "lg",
          margin: "1.75rem auto",
        }}
      >
     
        <Grid container spacing={2} columns={10} className={classes.chart}>
          <Grid size={5}>
            <Chartdata />
          </Grid>
          <Grid size={5}>
            <CircleChart />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
