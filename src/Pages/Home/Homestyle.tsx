import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
 
  header: {
    textAlign: "center",
    fontFamily: "fantasy",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding:"23px 6px",
    marginTop:'1.2rem',
    borderRadius:'10px'
    
  },
  chartitem:{
   padding:'30px 5px',
   borderRadius:'20px'
  }
}));
export default useStyles;
