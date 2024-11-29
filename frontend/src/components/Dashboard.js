// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  // ลงทะเบียน scale และ element ที่จำเป็น
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/sales')  // เส้นทางที่คุณได้ตั้งใน Backend
      .then((response) => {
        console.log(response.data);  // แสดงข้อมูลที่ได้รับจาก API
        setData(response.data);  // กำหนดข้อมูลใน state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const chartData = {
    labels: data.map(item => item.region),
    datasets: [{
      label: 'Sales',
      data: data.map(item => item.sales),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };

  return (
    <div>
      <h1>Sales Dashboard</h1>
      <Bar data={chartData} />
    </div>
  );
};

export default Dashboard;
