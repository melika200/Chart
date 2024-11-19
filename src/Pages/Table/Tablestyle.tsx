import { makeStyles } from "@mui/styles";

const useTableStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    margin: "1rem 0",
    padding: "15px",
    borderRadius: "10px",
  },
  addDoc: {
    color: "white",
  },
  doc: {
    color: "white",
    fontSize: "19px",
    marginLeft: "5px",
  },

  tableHeader: {
    backgroundColor: "#cccccc93",
    color: "black",
    fontWeight: "bold",
  },
  tableRow: {
    backgroundColor: "white",
    borderBottom: "1px solid #eeecec",
    "&:nth-of-type(odd)": {
      backgroundColor: "#f9f9f9",
    },
  },
  edit: {
    color: "rgb(255, 153, 0)",
    fontWeight: "bold",
    fontSize: "18px",
    cursor: "pointer",
  },
  delete: {
    color: "red",
    fontSize: "16px",
    margin: "0 9px",
    cursor: "pointer",
  },
  buttonStyle: {
    border: "none",
    borderRadius: "10px",
  },
  modalText: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  modalIcon: {
    fontSize: "19px",
  },
  saveButton: {
    marginTop: "20px",
  },
  modaledit: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "30px",
  },
 
  
});

export default useTableStyles;
