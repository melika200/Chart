import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Chart from '../../Components/Chart/Chart';

const fetchChartData = async () => {
  const response = await axios.get("https://api.coincap.io/v2/assets/?limit=10");
  return response.data.data.map((item: any) => ({
    name: item.name,
    priceUsd: parseFloat(item.priceUsd),
  }));
};

const Chartdata: React.FC = () => {
  const { data: chart, error, isLoading } = useQuery("chartData", fetchChartData);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to fetch data</p>;

  return (
    <>
      {chart && chart.length > 0 ? <Chart chart={chart} /> : <p>No data available</p>}
    </>
  );
};

export default Chartdata;
