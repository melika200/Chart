import React, { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import Tabledata from "../../Services/Tableurl/Tabledata";

interface DataType {
  id: number;
  newsGroupId: number;
  title: string;
  summary: string;
  picture: string;
  text: string;
  isActive: boolean;
  recordDateFa: string;
  recordTime: string;
}

export const ReadTable: React.FC = () => {
  const [data, setData] = useState<DataType | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Tabledata.get(`/merchantnew/News/Get/${id}`);
        setData(result.data.value);
        console.log(result.data.value);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3, margin: "3rem auto", textAlign: "center", width: "45%" }}>
      <Card>
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              marginBottom: "10px",
              borderBottom: "1px solid gray",
              pb: "3px",
            }}
            gutterBottom
          >
            جزئیات کاربر
          </Typography>
          <Grid container spacing={2} sx={{ textAlign: "right", mt: "5px" }}>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>عنوان:</strong> {data.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>خلاصه:</strong> {data.summary}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>:عکس </strong>
                <br /> {data.picture}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>:اطلاعات</strong>
                <br /> {data.text}
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
              ویرایش
            </Button>
            <Button component={RouterLink} to="/jadval" variant="outlined">
              دیدن جدول
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
