import React, { useEffect, useState } from "react";
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
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";
import { MdReadMore, MdEdit, MdDelete } from "react-icons/md";
import Tabledata from "../../Services/Tableurl/Tabledata";
import NavbarItem from "../Navbar/Navbar";

interface RowData {
  id: string;
  title: string;
  recordDateFa: string;
  position: string;
}

export const Jadval: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = async (currentPage: number, pageSize: number) => {
    try {
      const response = await Tabledata.get(
        `/merchantnew/News/Search?_page=${
          currentPage + 1
        }&_limit=${pageSize}&IsActive=true`
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
      setTotalRows(response.data.value.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("حذف شود؟");
    if (confirm) {
      try {
        await Tabledata.put(`/merchantnew/News/ChangeStatus`, {
          id,
          isActive: false,
        });
        fetchData(page, rowsPerPage);
      } catch (err) {
        console.error("Error deleting data:", err);
      }
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 2));
    setPage(0);
  };

  return (
    <>
      <NavbarItem />
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: "background.paper",
            height: "100vh",
            py: 8,
            direction: "rtl",
          }}
        >
          <TableContainer
            component={Paper}
            elevation={3}
            sx={{ bgcolor: "#fff" }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FaBookOpen style={{ paddingLeft: "5px", fontSize: "19px" }} />
                <Typography variant="h6">لیست مدارک تحصیلی</Typography>
              </Box>
              <Button
                component={Link}
                to="/create"
                variant="contained"
                sx={{ direction: "ltr", backgroundColor: "#d35400" }}
              >
                <span style={{ alignItems: "center" }}>
                  افزودن مدرک تحصیلی
                  <span style={{ fontSize: "15px" }}>
                    <CgFileDocument />
                  </span>
                </span>
              </Button>
            </Box>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f561" }}>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid gray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    مقطع تحصیلی
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid gray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    وضعیت
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid gray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    تاریخ
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: "1px solid gray",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    عملیات
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ textAlign: "center", direction: "rtl" }}
                    >
                       {row.title}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", direction: "rtl" }}>
                      {row.position}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", direction: "rtl" }}>
                      {row.recordDateFa}
                    </TableCell>
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
                        sx={{ mx: 1 }}
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalRows}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
      </Container>
    </>
  );
};
