import React from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
} from "@mui/material";
import { Grid } from "@mui/material";
import { FaTrashAlt, FaRegEdit, FaBookOpen } from "react-icons/fa";
import TableModal from "./Tablemodal";
import useTableStyles from "./Tablestyle";
import useCustomizedTable from "../../Hooks/Usetable";
import { Controller, useForm } from "react-hook-form";
import useDeletetable from "../../Hooks/Deletetable";

interface Row {
  id: string;
  title: string;
  recordDateFa: string;
  position: string;
}
interface FormValues {
  title: string;
  position: string;
  recordDateFa: string;
}

const CustomizedTables: React.FC = () => {
  const classes = useTableStyles();
  const { control, handleSubmit, reset, setValue } = useForm<FormValues>({
    defaultValues: { title: "", position: "", recordDateFa: "" },
  });
  const { mutate } = useDeletetable();
  const handleDelete = (id: string) => {
    mutate(id);
  };
  const {
    rows,
    editRow,
    open,
    addRow,
    handleEditOpen,
    handleEditClose,
    handleSaveEdit,
    setEditRow,
  } = useCustomizedTable();

  const onSubmit = (data: FormValues) => {
    setEditRow((prev) => (prev ? { ...prev, ...data } : null));
    handleSaveEdit();
    reset();
  };

  React.useEffect(() => {
    if (editRow) {
      setValue("title", editRow.title);
      setValue("position", editRow.position);
      setValue("recordDateFa", editRow.recordDateFa);
    }
  }, [editRow, setValue]);

  return (
    <>
      <Box className={classes.container}>
        <Box sx={{ backgroundColor: "#b6631a", borderRadius: "6px" }}>
          <TableModal addRow={addRow} />
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography variant="h6" sx={{ marginRight: "5px" }}>
            لیست مدارک تحصیلی
          </Typography>
          <FaBookOpen style={{ color: "#fff", fontSize: "20px" }} />
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ direction: "rtl" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader} align="right">
                مقطع تحصیلی
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                وضعیت
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                تاریخ
              </TableCell>
              <TableCell className={classes.tableHeader} align="right">
                عملیات
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: Row) => (
              <TableRow key={row.id}>
                <TableCell align="right" component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.position}</TableCell>
                <TableCell align="right">{row.recordDateFa}</TableCell>
                <TableCell align="right">
                  <Box>
                    <Grid item xs={8}>
                      <FaRegEdit
                        className={classes.edit}
                        onClick={() => handleEditOpen(row)}
                      />
                      <FaTrashAlt
                        className={classes.delete}
                        onClick={() => handleDelete(row.id)}
                      />
                    </Grid>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleEditClose}>
        <Box className={classes.modaledit}>
          {editRow && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
            >
              <Controller
                name="title"
                control={control}
                rules={{ required: "مقطع تحصیلی is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="مقطع تحصیلی"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : null
                    }
                    fullWidth
                    margin="normal"
                    InputProps={{
                      style: { textAlign: "right" },
                      inputProps: { style: { textAlign: "right" } },
                    }}
                  />
                )}
              />
              <Controller
                name="position"
                control={control}
                rules={{ required: "وضعیت is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="وضعیت"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : null
                    }
                    fullWidth
                    margin="normal"
                    InputProps={{
                      style: { textAlign: "right" },
                      inputProps: { style: { textAlign: "right" } },
                    }}
                  />
                )}
              />
              <Controller
                name="recordDateFa"
                control={control}
                rules={{
                  required: "تاریخ is required",
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}$/,
                    message: "تاریخ must be in the format YYYY-MM-DD",
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="تاریخ"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : null
                    }
                    fullWidth
                    margin="normal"
                    InputProps={{
                      style: { textAlign: "right" },
                      inputProps: { style: { textAlign: "right" } },
                    }}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                className={classes.saveButton}
              >
                Save
              </Button>
            </form>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default CustomizedTables;
