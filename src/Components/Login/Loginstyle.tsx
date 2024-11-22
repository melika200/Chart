import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin:"5rem auto"
  },
  card: {
    width: '400px', 
    padding: '24px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
    borderRadius: '8px', 
  },
  title: {
    marginBottom: '16px', 
    textAlign: 'center', 
    color: '#3f51b5', 
  },
  submitButton: {
    marginTop: '16px', 
    width: '100%', 
    backgroundColor: '#3f51b5', 
    color: '#ffffff', 
    padding: '10px', 
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer', 
    '&:hover': {
      backgroundColor: '#303f9f', 
    },
  },
});

export default useStyles;