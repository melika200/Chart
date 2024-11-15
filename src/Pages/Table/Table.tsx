import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import Tablemodal from "./Tablemodal";

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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
  return (
    <>
       <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between' ,backgroundColor:"#fff",margin:'1rem 0',padding:'15px' }}>
        <Tablemodal/>
        <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',textAlign:'center'}}>
        <FaBookOpen />
        <Typography
        variant="h6"
      >
      لیست مدارک تحصیلی
      </Typography>
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
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  دکتری
                </StyledTableCell>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">
                  <Box>
                    <Grid item xs={8}>
                      <FaTrashAlt />
                      <FaRegEdit />
                    </Grid>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
