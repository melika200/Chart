import React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LuBookmarkPlus } from "react-icons/lu";
import { IoSaveOutline } from "react-icons/io5";
import { TbCreditCardPay } from "react-icons/tb";
import { useForm, Controller } from "react-hook-form";
import useTableModal from "../../Hooks/Usetablemodal";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: "24px",
  p: "16px",
};

interface TableModalProps {
  addRow: (row: any) => void;
}

interface FormValues {
  issuer: string;
  degree: string;
  description: string;
  date: string;
  image: File | null;
}

const TableModal: React.FC<TableModalProps> = ({ addRow }) => {
  const { open, handleOpen, handleClose } = useTableModal(addRow);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      issuer: "",
      degree: "",
      description: "",
      date: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    addRow(data);
    reset();
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <Box sx={{ display: "flex", alignItems: "center", px: "15px" }}>
          <Typography sx={{ color: "#fff" }} className="adddoc">
            افزودن مدرک تحصیلی
          </Typography>
          <LuBookmarkPlus
            style={{ color: "#fff", fontSize: "20px" }}
            className="doc"
          />
        </Box>
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ color: "#000" }}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" sx={{ textAlign: "right", flexGrow: 1 }}>
              افزودن مدرک تحصیلی
            </Typography>
            <LuBookmarkPlus
              className="modalicon"
              style={{ marginLeft: "8px" }}
            />
          </Box>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <Controller
                name="issuer"
                control={control}
                rules={{ required: "ارگان صادر کننده is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="ارگان صادر کننده"
                    error={!!errors.issuer}
                    helperText={errors.issuer ? errors.issuer.message : null}
                    fullWidth
                    margin="normal"
                    sx={{ marginRight: "8px" }}
                    InputProps={{
                      sx: { textAlign: "right" },
                      inputProps: { sx: { textAlign: "right" } },
                    }}
                  />
                )}
              />
              <Controller
                name="degree"
                control={control}
                rules={{ required: "مدرک تحصیلی is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="مدرک تحصیلی"
                    error={!!errors.degree}
                    helperText={errors.degree ? errors.degree.message : null}
                    fullWidth
                    margin="normal"
                    sx={{ marginLeft: "8px" }}
                    InputProps={{
                      sx: { textAlign: "right" },
                      inputProps: { sx: { textAlign: "right" } },
                    }}
                  >
                    {[
                      "دیپلم",
                      "کاردانی",
                      "کارشناسی",
                      "کارشناسی ارشد",
                      "دکتری",
                    ].map((degree) => (
                      <MenuItem key={degree} value={degree}>
                        {degree}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <Controller
                name="description"
                control={control}
                rules={{ required: "توضیحات is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="توضیحات"
                    multiline
                    rows={1}
                    error={!!errors.description}
                    helperText={
                      errors.description ? errors.description.message : null
                    }
                    fullWidth
                    margin="normal"
                    sx={{ marginRight: "8px" }}
                    InputProps={{
                      sx: { textAlign: "right" },
                      inputProps: { sx: { textAlign: "right" } },
                    }}
                  />
                )}
              />
              <Controller
                name="date"
                control={control}
                rules={{
                  required: "تاریخ is required",
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}$/,
                    message: "تاریخ must be in the format YYYY-MM-DD",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="تاریخ"
                    type="text"
                    error={!!errors.date}
                    helperText={errors.date ? errors.date.message : null}
                    fullWidth
                    margin="normal"
                    sx={{ marginLeft: "8px" }}
                    InputProps={{
                      sx: { textAlign: "right" },
                      inputProps: { sx: { textAlign: "right" } },
                    }}
                  />
                )}
              />
              <Controller
                name="image"
                control={control}
                rules={{ required: "تصویر is required" }}
                render={({ field }) => (
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      bgcolor: "transparent",
                      color: "black",
                      borderRadius: "4px",
                      py: "8px",
                      px: "16px",
                      display: "block",
                    }}
                  >
                    انتخاب تصویر
                    <
                      type="file"
                      hidden
                      accept="image/*"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0] ?? null)
                      }
                    />
                  </Button>
                )}
              />
              {errors.image && (
                <Typography color="error" sx={{ marginTop: "8px" }}>
                  
                  {errors.image.message}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                marginTop: "16px",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => reset()}
                sx={{
                  backgroundColor: "#b2bec3",
                  color: "white",
                  borderRadius: "9px",
                  px: "15px",
                  py: "2px",
                  border: "none",
                }}
              >
                بازنشانی
                <TbCreditCardPay className="save" />
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#197e3e",
                  color: "white",
                  borderRadius: "9px",
                  px: "20px",
                  py: "2px",
                  marginLeft: "5px",
                }}
              >
                ثبت
                <IoSaveOutline className="save" />
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default TableModal;
