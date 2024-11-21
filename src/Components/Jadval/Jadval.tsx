import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import Tabledata from "../../Services/Tableurl/Tabledata";
import { selectIsAuthenticated, checkAuth } from "../../Auth/Authslice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdReadMore, MdEdit, MdDelete } from "react-icons/md";
import NavbarItem from "../Navbar/Navbar";

interface RowData {
  id: string;
  title: string;
  recordDateFa: string;
  position: string;
}

export const Jadval: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await Tabledata.get(
          "/merchantnew/News/Search?_page=1&_limit=10"
      );
      const formattedData: RowData[] = response.data.value.data.map(
          (item: any) => ({
            id: item.id,
            title: item.title,
            recordDateFa: item.recordDateFa,
            position: item.isActive ? "فعال" : "غیر فعال",
          })
      );
      setRows(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {

      fetchData();
    }
  }, [isAuthenticated]);



  if (!isAuthenticated) {
    return <Typography>Please log in to view this content.</Typography>;
  }

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      try {
        await axios.delete(`https://sit-bnpl.saminray.com/merchantnew/NewsGroup/ChangeStatus/${id}`);
        fetchData();
        setRows(rows.filter(row => row.id !== id));
        navigate('/jadval');
      } catch (err) {
        console.error("Error deleting data:", err);
      }
    }
  };

  return (
    <>
    <NavbarItem/>
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: "background.paper", height: "100vh", py: 8, direction: "rtl" }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          فهرست کاربران
        </Typography>
        <TableContainer component={Paper} elevation={3} sx={{ bgcolor: "#fff" }}>
          <Box sx={{ display: "flex", justifyContent: "end", p: 2 }}>
            <Button
              component={Link}
              to="/create"
              variant="contained"
              color="primary"
            >
              افزودن +
            </Button>
          </Box>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ bgcolor: "#f1f2f6" }}>
                <TableCell sx={{ borderBottom: "1px solid gray", fontWeight: "bold" }}>مقطع تحصیلی</TableCell>
                <TableCell sx={{ borderBottom: "1px solid gray", fontWeight: "bold" }}>وضعیت</TableCell>
                <TableCell sx={{ borderBottom: "1px solid gray", fontWeight: "bold" }}>تاریخ</TableCell>
                <TableCell sx={{ borderBottom: "1px solid gray", fontWeight: "bold" }}>عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ textAlign: "right", direction: "rtl" }}>
                    {row.id} {row.title}
                  </TableCell>
                  <TableCell sx={{ textAlign: "right", direction: "rtl" }}>{row.position}</TableCell>
                  <TableCell sx={{ textAlign: "right", direction: "rtl" }}>{row.recordDateFa}</TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/read/${row.id}`}
                      variant="contained"
                      size="small"
                      sx={{ mr: 1 }}
                      startIcon={<MdReadMore />}
                    >
                      مشاهده
                    </Button>
                    <Button
                      component={Link}
                      to={`/update/${row.id}`}
                      variant="contained"
                      size="small"
                      sx={{ mr: 1 }}
                      startIcon={<MdEdit />}
                    >
                      ویرایش
                    </Button>
                    <Button
                      onClick={() => handleDelete(row.id)}
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<MdDelete />}
                    >
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
    </>
  );
};
