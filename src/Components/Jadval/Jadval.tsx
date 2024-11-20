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
  Link as MUILink,
} from "@mui/material";
import Tabledata from "../../Services/Tableurl/Tabledata";
import { selectIsAuthenticated, checkAuth } from "../../Auth/Authslice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
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
        setRows(rows.filter(row => row.id !== id));
        navigate('/jadval');
      } catch (err) {
        console.error("Error deleting data:", err);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: "background.paper", height: "100vh", py: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          List of Users
        </Typography>
        <TableContainer component={Paper} elevation={3}>
          <Box sx={{ display: "flex", justifyContent: "end", p: 2 }}>
            <Button
              component={Link}
              to="/create"
              variant="contained"
              color="primary"
            >
              Add +
            </Button>
          </Box>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>مقطع تحصیلی</TableCell>
                <TableCell>وضعیت</TableCell>
                <TableCell>تاریخ</TableCell>
                <TableCell>عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                    {row.title}
                  </TableCell>
                  <TableCell>{row.position}</TableCell>
                  <TableCell>{row.recordDateFa}</TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/read/${row.id}`}
                      variant="contained"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Read
                    </Button>
                    <Button
                      component={Link}
                      to={`/update/${row.id}`}
                      variant="contained"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(row.id)}
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};
