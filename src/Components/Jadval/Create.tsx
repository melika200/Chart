import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

export const Createtable: React.FC = () => {
  const [values, setValues] = useState({
    title: "",
    summary: "",
    image: "",
    text: ""
  });
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('summary', values.summary);
    formData.append('text', values.text);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await Tabledata.post('/merchantnew/News/Insert', formData);
      console.log(response);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

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
            Add a User
          </Typography>
          <StyledForm onSubmit={handleSubmit}>
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
                Submit
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
