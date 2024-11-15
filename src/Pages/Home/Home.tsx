import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Chartdata from "../../Services/Chartdata/Chartdata";
import CircleChart from "../../Components/Chart/Circlechart";
import useStyles from "./Homestyle";

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <>
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
        <Grid container spacing={2} columns={10} >
          <Grid size={5} sx={{ backgroundColor: "background.paper"}} className={classes.chartitem}>
            <Chartdata />
          </Grid>
          <Grid size={5} sx={{ backgroundColor: "background.paper" }} className={classes.chartitem}>
            <CircleChart />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
