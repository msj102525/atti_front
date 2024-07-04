import React, { useEffect, useState } from 'react';
import axios from "@/api/axiosApi";
import { Line } from 'react-chartjs-2';
import { Chart, registerables, TimeScale, LinearScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
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
        const response = await axios.get('/pay/graph');
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
      let result;
      if (selectedMonth === '전체보기') {
        // 년도의 월별 데이터 그룹화
        result = data.reduce((acc, curr) => {
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

        // 전체 월 목록 생성
        const allMonths = Array.from({ length: 12 }, (_, i) => {
          const month = (i + 1).toString().padStart(2, '0');
          return `${selectedYear}-${month}`;
        });

        // 누락된 월에 대해 0으로 채움
        result = allMonths.map(month => {
          const existing = result.find(item => item.date === month);
          return existing ? existing : { date: month, amount: 0 };
        });

      } else {
        // 년도와 월의 일별 데이터 그룹화
        result = data.reduce((acc, curr) => {
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
        // 전체 일자 목록 생성
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        const allDays = Array.from({ length: daysInMonth }, (_, i) => {
          const day = (i + 1).toString().padStart(2, '0');
          return `${selectedYear}-${selectedMonth.padStart(2, '0')}-${day}`;
        });
        // 누락된 일자에 대해 0으로 채움
        result = allDays.map(day => {
          const existing = result.find(item => item.date === day);
          return existing ? existing : { date: day, amount: 0 };
        });
      }
      // 날짜 기준으로 정렬
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
      return result;
    };

    setAggregatedData(aggregateData());
  }, [data, selectedYear, selectedMonth]);

  const chartData = {
    labels: aggregatedData.map(item => item.date),
    datasets: [
      {
        label: '결제 금액',
        data: aggregatedData.map(item => item.amount),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'black',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return '₩' + value.toLocaleString();  // 숫자를 원화 형식으로 포맷팅
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.raw.toLocaleString();
            return label + '원';
          }
        }
      }
    }
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
      <div className="flex justify-between min-h-[1000px]">
        <AdminSidebar />
        <div className="p-5 w-[calc(100%-220px)]">
          <div className="mt-8 border p-4 rounded-lg min-h-[calc(100%-60px)] ">
            <h2 className="text-xl mb-12 text-center bg-green-300">매출</h2>
            <div >
            <select 
                id="year" 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)}
                className="h-10 border-2 border-black mr-2 p-2 rounded-md"
              >
                {renderYearOptions()}
              </select>
              <label htmlFor="year">년 </label>
              
              <select 
                id="month" 
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="h-10 border-2 border-black mr-2 p-2 rounded-md"
              >
                {renderMonthOptions()}
              </select>
              <label htmlFor="month">월</label>
              
            </div>
            <div style={{ width: '100%', height: '100%' }} className="flex mt-12 justify-center items-center ">
              <Line data={chartData} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphComponent;
