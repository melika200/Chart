import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { LuBookmarkPlus } from "react-icons/lu";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Tablemodal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  return (
    <div>
      <Button onClick={handleOpen}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography>افزودن مدرک تحصیلی</Typography>
          <LuBookmarkPlus />
        </Box>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "45ch" } }} // Adjusted width for better spacing
            noValidate
            autoComplete="off"
          >
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
              {/* First Row of Inputs */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <TextField
                  required
                  id="outlined-required"
                  label="مدرک تحصیلی"
                  defaultValue=""
                />
                <TextField
                  required
                  id="outlined-required-issuer"
                  label="ارگان صادر کننده"
                  defaultValue=""
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                <TextField
                  id="outlined-date-input"
                  type="date"
                 
                />
                <TextField
                  id="outlined-explanation-input"
                  label="توضیحات"
                  defaultValue=""
                  multiline
                  rows={1}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <Button variant="contained">ثبت</Button>
            <Button variant="outlined">بازنشانی</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}