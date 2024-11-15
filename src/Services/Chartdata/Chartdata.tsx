import React, { useEffect, useState } from "react";
import Chart from '../../Components/Chart/Chart';

const Chartdata: React.FC = () => {
    const [chart, setChart] = useState<{ name: string; priceUsd: number }[]>([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch("https://api.coincap.io/v2/assets/?limit=10");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setChart(data.data.map((item: any) => ({
                    name: item.name,
                    priceUsd: parseFloat(item.priceUsd) 
                })));
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchdata();
    }, []);

    return (
        <>
            {chart.length > 0 ? <Chart chart={chart} /> : <p>Loading...</p>}
        </>
    );
};

export default Chartdata;