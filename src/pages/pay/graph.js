import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables, TimeScale, LinearScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import styles from "@/styles/admin/communityAdminVersion.module.css";
import Header from '../common/Header';
import AdminSidebar from "@/components/admin/AdminSidebar"

Chart.register(...registerables);
Chart.register(TimeScale, LinearScale);

const GraphComponent = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 +1

  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString()); // 문자열로 변환
  const [aggregatedData, setAggregatedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pay/graph');
        console.log('API 응답 데이터:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching graph data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const aggregateData = () => {
      if (selectedMonth === '전체보기') {
        // 년도의 월별 데이터 그룹화
        return data.reduce((acc, curr) => {
          const date = new Date(curr.payDate);
          if (date.getFullYear() === parseInt(selectedYear, 10)) {
            const month = date.getMonth() + 1;
            const monthKey = `${selectedYear}-${month.toString().padStart(2, '0')}`;
            const existing = acc.find(item => item.date === monthKey);
            if (existing) {
              existing.amount += curr.payAmount;
            } else {
              acc.push({ date: monthKey, amount: curr.payAmount });
            }
          }
          return acc;
        }, []);
      } else {
        // 년도와 월의 일별 데이터 그룹화
        return data.reduce((acc, curr) => {
          const date = new Date(curr.payDate);
          if (date.getFullYear() === parseInt(selectedYear, 10) && (date.getMonth() + 1) === parseInt(selectedMonth, 10)) {
            const day = date.getDate();
            const dayKey = `${selectedYear}-${selectedMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            const existing = acc.find(item => item.date === dayKey);
            if (existing) {
              existing.amount += curr.payAmount;
            } else {
              acc.push({ date: dayKey, amount: curr.payAmount });
            }
          }
          return acc;
        }, []);
      }
    };

    setAggregatedData(aggregateData());
  }, [data, selectedYear, selectedMonth]);

  const chartData = {
    labels: aggregatedData.map(item => item.date),
    datasets: [
      {
        label: 'Pay Amount Over Time',
        data: aggregatedData.map(item => item.amount),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const renderYearOptions = () => {
    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
    return years.map(year => <option key={year} value={year}>{year}</option>);
  };

  const renderMonthOptions = () => {
    const months = ['전체보기', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    return months.map(month => <option key={month} value={month}>{month}</option>);
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <Header />
      <div style={{ display: 'flex', minHeight: '1000px' }}>
        <AdminSidebar />
        <div className={styles.content}>
          <div className={styles.container}>
            <h2 className={styles.centeredText}>그래프</h2>
            <div>
              <label htmlFor="year">년도: </label>
              <select id="year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                {renderYearOptions()}
              </select>
              <label htmlFor="month">월: </label>
              <select id="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                {renderMonthOptions()}
              </select>
            </div>
            <div>
              <Line data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphComponent;
