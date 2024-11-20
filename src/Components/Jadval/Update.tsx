import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import { DropzoneArea } from 'react-mui-dropzone';
import Tabledata from '../../Services/Tableurl/Tabledata';

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

type DataType = {
  title: string;
  summary: string;
  image: string;
  text: string;
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
    text: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Tabledata.get(`/merchantnew/News/${id}`);
        setData(result.data);
        setValues(result.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('summary', values.summary);
    formData.append('text', values.text);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await Tabledata.put(`/merchantnew/News/Update/${id}`, formData);
      console.log(response);
      navigate('/jadval');
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
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
            />
            <TextField
              label="Text"
              variant="outlined"
              fullWidth
              value={values.text}
              onChange={(e) => setValues({ ...values, text: e.target.value })}
            />
            <TextField
              label="Summary"
              variant="outlined"
              fullWidth
              value={values.summary}
              onChange={(e) => setValues({ ...values, summary: e.target.value })}
            />
            <DropzoneArea
              acceptedFiles={['image/*']}
              dropzoneText="Drag and drop an image here or click"
              onChange={(files) => setImage(files[0])}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
              <StyledLink to="/jadval">
                <Button variant="outlined">Back</Button>
              </StyledLink>
            </Box>
          </StyledForm>
        </Paper>
      </Container>
    </Box>
  );
};
