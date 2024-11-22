import { makeStyles } from "@mui/styles";

const Navbarstyle = makeStyles({
    "@keyframes hoverAnimation": {
        "0%": { transform: "scale(1)" },
        "50%": { transform: "scale(1.1)" },
        "100%": { transform: "scale(1)" },
      },
  "@keyframes titleHover": {
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(1.1)' },
  },
  navbar: {
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#ffffff',
    padding: '10px 0',
    animation: '$fadeIn 1s ease-in-out', 
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: '#333333',
    textDecoration: 'none',
    animation: '$fadeIn 1s ease-in-out', 
    transition: 'color 0.3s ease', 
    '&:hover': {
      color: '#74b9ff', 
      animation: '$titleHover 0.3s ease-in-out forwards', 
    },
  },
  navGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  navlink: {
    color: "#747d8c",
    textDecoration: "none",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: 500,
    transition: "color 0.3s ease, transform 0.3s ease",
    '&:hover': {
      color: "#333333",
      animation: '$hoverAnimation 0.6s ease-in-out forwards',
    },
    '&.active': {
      color: "#333333",
      fontWeight: 600,
    },
  },
});

export default Navbarstyle;