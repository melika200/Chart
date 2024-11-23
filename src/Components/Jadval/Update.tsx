import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { DropzoneArea } from "react-mui-dropzone";
import Tabledata from "../../Services/Tableurl/Tabledata";

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

type DataType = {
  id: number;
  newsGroupId: number;
  title: string;
  summary: string;
  picture: string;
  text: string;
  isActive: boolean;
  recordDateFa: string;
  recordTime: string;
};

export const Updatetable: React.FC = () => {
  const [data, setData] = useState<DataType | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    title: "",
    summary: "",
    image: "",
    text: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Tabledata.get(`/merchantnew/News/Get/${id}`);
        setData(result.data.value);
        setValues({
          title: result.data.value.title || "",
          summary: result.data.value.summary || "",
          image: result.data.value.picture || "",
          text: result.data.value.text || "",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      id: data?.id ?? 0,
      newsGroupId: data?.newsGroupId ?? 0,
      picture: "",
      title: values.title || data?.title || "",
      summary: values.summary || data?.summary || "",
      text: values.text || data?.text || "",
      isActive: data?.isActive,
    };

    try {
      const response = await Tabledata.put(`/merchantnew/News/Update`, payload);
      console.log(response);
      navigate("/jadval");
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

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
          <Typography variant="h4" gutterBottom>
            Update User
          </Typography>
          <StyledForm onSubmit={handleUpdate}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              inputProps={{ style: { textAlign: "right" } }}
            />
            <TextField
              label="Text"
              variant="outlined"
              fullWidth
              value={values.text}
              onChange={(e) => setValues({ ...values, text: e.target.value })}
              inputProps={{ style: { textAlign: "right" } }}
            />
            <TextField
              label="Summary"
              variant="outlined"
              fullWidth
              value={values.summary}
              onChange={(e) =>
                setValues({ ...values, summary: e.target.value })
              }
              inputProps={{ style: { textAlign: "right" } }}
            />
            <DropzoneArea
              acceptedFiles={["image/*"]}
              dropzoneText="Drag and drop an image here or click"
              onChange={(files) => setImage(files[0])}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button variant="contained" color="primary" type="submit">
                اعمال تغییرات
              </Button>
              <StyledLink to="/jadval">
                <Button variant="outlined">برو به جدول</Button>
              </StyledLink>
            </Box>
          </StyledForm>
        </Paper>
      </Container>
    </Box>
  );
};
