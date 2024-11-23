import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import { DropzoneArea } from "react-mui-dropzone";
import { useForm, SubmitHandler } from "react-hook-form";
import Tabledata from "../../Services/Tableurl/Tabledata";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

type FormField = {
  title: string;
  summary: string;
  text: string;
  image: string;
  newsGroupId: number;
};

export const Createtable: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormField>();

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    const payload = {
      title: data.title,
      summary: data.summary,
      text: data.text,
      newsGroupId: 2,
      picture: "",
    };

    try {
      const response = await Tabledata.post(
        "/merchantnew/News/Insert",
        payload
      );
      console.log(response);
      navigate("/jadval");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              mb: "8px",
            }}
          >
            <Typography
              component={Link}
              to="/jadval"
              sx={{ color: "#ccc" }}
              variant="h5"
            >
              <IoCloseOutline />
            </Typography>
            <Typography variant="h6" gutterBottom>
              <MdOutlineBookmarkAdd />
              <span> افزودن مدرک تحصیلی</span>
            </Typography>
          </Box>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  {...register("title", { required: "Title is required" })}
                  error={!!errors.title}
                  helperText={errors.title ? errors.title.message : ""}
                  InputLabelProps={{ shrink: true, style: { color: "black" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": { borderColor: "lightgray" },
                    backgroundColor: "white",
                  }}
                  inputProps={{ style: { textAlign: "right" } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Text"
                  variant="outlined"
                  fullWidth
                  {...register("text", { required: "Text is required" })}
                  error={!!errors.text}
                  helperText={errors.text ? errors.text.message : ""}
                  InputLabelProps={{ shrink: true, style: { color: "black" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": { borderColor: "lightgray" },
                    backgroundColor: "white",
                  }}
                  inputProps={{ style: { textAlign: "right" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Summary"
                  variant="outlined"
                  fullWidth
                  {...register("summary", { required: "Summary is required" })}
                  error={!!errors.summary}
                  helperText={errors.summary ? errors.summary.message : ""}
                  InputLabelProps={{ shrink: true, style: { color: "black" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": { borderColor: "lightgray" },
                    backgroundColor: "white",
                  }}
                  inputProps={{ style: { textAlign: "right" } }}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  margin: "auto",
                }}
              >
                <DropzoneArea
                  acceptedFiles={["image/*"]}
                  dropzoneText="Drag and drop an image here or click"
                  onChange={(files) => {
                    if (files && files.length > 0) {
                      setValue("image", "");
                    }
                  }}
                  classes={{ root: "custom-dropzone" }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", mt: 2 }}>
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
              <StyledLink to="/jadval" sx={{ ml: "3px" }}>
                <Button variant="outlined">Back</Button>
              </StyledLink>
            </Box>
          </StyledForm>
        </Paper>
      </Container>
    </Box>
  );
};

const styles = `
.custom-dropzone {
all:none;
width:50% 

}
.custom-dropzone .MuiTypography-root {
  color: black;
}
`;

const Style = () => <style>{styles}</style>;

export default () => (
  <>
    <Style />
    <Createtable />
  </>
);
