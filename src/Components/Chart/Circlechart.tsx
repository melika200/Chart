import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const CircleChart: React.FC = () => {
    const [chartData, setChartData] = useState<{ name: string; priceUsd: number }[]>([]);
    const [options, setOptions] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.coincap.io/v2/assets/?limit=3");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const formattedData = data.data.map((item: any) => ({
                    name: item.name,
                    priceUsd: parseFloat(item.priceUsd)
                }));
                setChartData(formattedData);
                setOptions({
                    chart: {
                        type: 'pie',
                    },
                    labels: formattedData.map((item : any)=>(item.name)),
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                });
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {chartData.length > 0 ? (
                <Chart
                    options={options}
                    series={chartData.map(item => item.priceUsd)}
                    type="pie"
                    height={350}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CircleChart;