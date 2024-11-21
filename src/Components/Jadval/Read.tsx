import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from '@mui/material';
import Tabledata from '../../Services/Tableurl/Tabledata';

interface DataType {
  id: string;
  title: string;
  summary: string;
  picture: string;
  text: string;
}

export const ReadTable: React.FC = () => {
  const [data, setData] = useState<DataType | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Tabledata.get(`/merchantnew/News/${id}`);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Detail of User
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Title:</strong> {data.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Summary:</strong> {data.summary}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Picture:</strong> {data.picture}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Text:</strong> {data.text}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button
              component={RouterLink}
              to={`/update/${id}`}
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <Button
              component={RouterLink}
              to="/jadval"
              variant="outlined"
            >
              Back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};