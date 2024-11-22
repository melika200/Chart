import { makeStyles } from "@mui/styles";
import { keyframes } from "@mui/system";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const useStyles = makeStyles(() => ({
  header: {
    textAlign: "center",
    fontFamily: "fantasy",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: "23px 6px",
    borderRadius: '5px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    animation: `${fadeIn} 0.8s ease-out`,
  },
  chartitem: {
    padding: '30px 5px',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    animation: `${fadeIn} 1s ease-out`,
    '&:hover': {
      boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
      transition: 'box-shadow 0.1s ease-in-out',
    },
  }
}));

export default useStyles;