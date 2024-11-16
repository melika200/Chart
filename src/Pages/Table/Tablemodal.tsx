import * as React from "react"; 
import Box from "@mui/material/Box"; 
import Button from "@mui/material/Button"; 
import Typography from "@mui/material/Typography"; 
import Modal from "@mui/material/Modal"; 
import IconButton from "@mui/material/IconButton"; 
import CloseIcon from "@mui/icons-material/Close"; 
import { LuBookmarkPlus } from "react-icons/lu"; 
import { TextField, MenuItem } from "@mui/material"; 
import { IoSaveOutline } from "react-icons/io5"; 
import { TbCreditCardPay } from "react-icons/tb"; 
import "./Table.css"; 

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

export default function Tablemodal({ addRow }: { addRow: (row: any) => void }) { 
    const [open, setOpen] = React.useState(false); 
    const [degree, setDegree] = React.useState<string | null>(""); 
    const [issuer, setIssuer] = React.useState<string>(""); 
    const [description, setDescription] = React.useState<string>(""); 
    const [date, setDate] = React.useState<string>(""); 

    const handleOpen = () => setOpen(true); 
    const handleClose = () => setOpen(false); 

    const handleSave = () => { 
        const newRow = { 
            id: new Date().getTime().toString(), 
            title: degree, 
            summary: issuer, 
            text: description, 
            recordDate: date, 
        }; 
        addRow(newRow); 
        handleClose(); 
    }; 

    const resetForm = () => { 
        setDegree(""); 
        setIssuer(""); 
        setDescription(""); 
        setDate(""); 
    }; 

    const handleDegreeChange = (event: React.ChangeEvent<{ value: unknown }>) => { 
        setDegree(event.target.value as string); 
    }; 

    return ( 
        <div> 
            <Button onClick={handleOpen}> 
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", px: "15px" }}> 
                    <Typography className="adddoc">افزودن مدرک تحصیلی</Typography> <LuBookmarkPlus className="doc" /> 
                </Box> 
            </Button> 

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"> 

                <Box sx={style}> 

                    <IconButton aria-label="close" onClick={handleClose} sx={{ position: "absolute", left: 8, top: 20, color: (theme) => theme.palette.grey[500], }}> <CloseIcon /> </IconButton> 

                    <Box component="form" sx={{ "& .MuiTextField-root": { m: 1, width: "45ch", direction: "rtl" }, }} noValidate autoComplete="off"> 

                        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}> 

                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", px: "15px", justifyContent: "right", borderBottom: "1px solid #ccc", paddingBottom: "20px" }}> <Typography className="modaltext"> افزودن مدرک تحصیلی </Typography> <LuBookmarkPlus className="modalicon" /> </Box> 

                            <Box sx={{ display: "flex", justifyContent: "space-between" }}> 

                                <TextField required id="outlined-required-issuer" label="ارگان صادر کننده" value={issuer} onChange={(e) => setIssuer(e.target.value)} InputProps={{ sx: { borderColor: "lightgray", "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "lightgray" }, "&:hover fieldset": { borderColor: "gray" }, "&.Mui-focused fieldset": { borderColor: "gray" }, }, }, }} InputLabelProps={{ shrink: true, sx: { transform: "translate(12px, -6px) scale(0.75)", right: "auto" }, }} /> 

                                <TextField required id="outlined-required-degree" select label="مدرک تحصیلی" value={degree} onChange={handleDegreeChange} InputProps={{ sx: { borderColor: "lightgray", "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "lightgray" }, "&:hover fieldset": { borderColor: "gray" }, "&.Mui-focused fieldset": { borderColor: "gray" }, }, }, }} InputLabelProps={{ shrink: true, sx: { transform: "translate(12px, -6px) scale(0.75)", right: "auto" }, }} > 

                                    <MenuItem value="دیپلم">دیپلم</MenuItem> <MenuItem value="کاردانی">کاردانی</MenuItem> <MenuItem value="کارشناسی">کارشناسی</MenuItem> <MenuItem value="کارشناسی ارشد">کارشناسی ارشد</MenuItem> <MenuItem value="دکتری">دکتری</MenuItem> 

                                </TextField> 

                            </Box> 

                            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}> 

                                <TextField id="outlined-explanation-input" label="توضیحات" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={1} InputProps={{ sx: { borderColor: "lightgray", "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "lightgray" }, "&:hover fieldset": { borderColor: "gray" }, "&.Mui-focused fieldset": { borderColor: "gray" }, }, }, }} InputLabelProps={{ shrink: true, sx: { transform: "translate(12px, -6px) scale(0.75)", right: "auto" }, }} /> 

                                <TextField id="outlined-date-input" label="تاریخ" type="text" value={date} onChange={(e) => setDate(e.target.value)} InputProps={{ sx:{borderColor:"lightgray","& .MuiOutlinedInput-root":{"& fieldset":{"borderColor":"lightgray"},"& :hover fieldset":{"borderColor":"gray"},"&.Mui-focused fieldset":{"borderColor":"gray"}}}}} InputLabelProps={{shrink:true,sx:{transform:"translate(12px,-6px) scale(0.75)",right:"auto"}}}/> 

                            </Box> 

                        </Box> 

                    </Box> 

                    {/* Buttons for Save and Reset */}  
                    <Box sx={{ display:"flex", marginTop:"2"}} >  
                        <Button variant="outlined"
                            onClick={resetForm}
                            sx={{
                                backgroundColor:"#b2bec3",
                                color:"white",
                                border:"none",
                                borderRadius:"9px",
                                px:"15px",
                                py:"2px",
                            }}>
                            <span style={{ fontSize:"18px"}} >بازنشانی</span>
                            <TbCreditCardPay className="save"/>
                        </Button>
                        <Button variant="contained"
                            onClick={handleSave}
                            sx={{
                                backgroundColor:"#197e3e",
                                color:"white",
                                border:"none",
                                borderRadius:"9px",
                                px:"20px",
                                py:"2px",
                                ml:"5px",
                            }}>
                            <Box sx={{ alignItems:"center"}}>
                                <span style={{ fontSize:"18px"}} >ثبت</span>
                                <IoSaveOutline className="save"/>
                            </Box>
                        </Button>
                    </Box>

                </Box> 

            </Modal> 

        </div>
    );  
}