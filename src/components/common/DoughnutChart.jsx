import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function DoughnutChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartData = {
      labels: ['부정적인 감정', '자연스러운 감정', '긍정적인 감정'],
      datasets: [{
        label: 'Sentiment Analysis',
        data: data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 205, 86)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 4
      }]
    };

    const config = {
      type: 'doughnut',
      data: chartData,
    };

    const myChart = new Chart(chartRef.current, config);

    return () => {
      myChart.destroy();
    };
  }, [data]);

  return (
    <div className="doughnut-chart">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
