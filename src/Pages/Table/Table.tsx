import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography, Modal, TextField, Button, Grid } from "@mui/material";
import { FaTrashAlt, FaRegEdit, FaBookOpen } from "react-icons/fa";
import Tablemodal from "./Tablemodal";
import "./Table.css";
import Tabledata from "../../Services/Tableurl/Tabledata";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Tabledata.get("/");
        const data = response.data.data; 
        const formattedData = data.map((item: any) => ({
          id: item.id,
          title: item.pName, 
          summary: item.url,
          text: item.name,
          recordDate: item.id,
        }));
        setRows(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id: string) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleEditOpen = (row: any) => {
    setEditRow(row);
    setOpen(true);
  };

  const handleEditClose = () => {
    setEditRow(null);
    setOpen(false);
  };

  const handleSaveEdit = () => {
    setRows(rows.map((row) => (row.id === editRow.id ? editRow : row)));
    handleEditClose();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          margin: "1rem 0",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        <Box sx={{ backgroundColor: "#b6631a", borderRadius: "6px" }}>
          <Tablemodal />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ marginRight: "5px" }}>
            لیست مدارک تحصیلی
          </Typography>
          <FaBookOpen className="book" />
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ direction: "rtl" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">مقطع تحصیلی</StyledTableCell>
              <StyledTableCell align="right">ارگان صادرکننده</StyledTableCell>
              <StyledTableCell align="right">تاریخ</StyledTableCell>
              <StyledTableCell align="right">توضیحات</StyledTableCell>
              <StyledTableCell align="right">عملیات</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="right" component="th" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="right">{row.summary}</StyledTableCell>
                <StyledTableCell align="right">{row.text}</StyledTableCell>
                <StyledTableCell align="right">{row.recordDate}</StyledTableCell>
                <StyledTableCell align="right">
                  <Box>
                    <Grid item xs={8}>
                      <FaRegEdit
                        className="edit"
                        onClick={() => handleEditOpen(row)}
                      />
                      <FaTrashAlt
                        className="delete"
                        onClick={() => handleDelete(row.id)}
                      />
                    </Grid>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleEditClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {editRow && (
            <>
              <TextField
                label="مقطع تحصیلی"
                value={editRow.title}
                onChange={(e) =>
                  setEditRow({ ...editRow, title: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="ارگان صادرکننده"
                value={editRow.summary}
                onChange={(e) =>
                  setEditRow({ ...editRow, summary: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="تاریخ"
                value={editRow.text}
                onChange={(e) =>
                  setEditRow({ ...editRow, text: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="توضیحات"
                value={editRow.recordDate}
                onChange={(e) =>
                  setEditRow({ ...editRow, recordDate: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <Button onClick={handleSaveEdit} variant="contained">
                Save
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
