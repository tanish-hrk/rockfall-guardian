import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

interface RiskChartProps {
  data: any[];
  type: 'line' | 'bar';
  title: string;
  className?: string;
}

const RiskChart: React.FC<RiskChartProps> = ({ data, type, title, className = '' }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'hsl(var(--muted-foreground))',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: title,
        color: 'hsl(var(--foreground))',
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
      tooltip: {
        backgroundColor: 'hsl(var(--card))',
        titleColor: 'hsl(var(--card-foreground))',
        bodyColor: 'hsl(var(--card-foreground))',
        borderColor: 'hsl(var(--border))',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: 'hsl(var(--border))',
          drawBorder: false
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))'
        }
      },
      y: {
        grid: {
          color: 'hsl(var(--border))',
          drawBorder: false
        },
        ticks: {
          color: 'hsl(var(--muted-foreground))'
        }
      }
    }
  };

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: type === 'bar' ? 'Production Volume (MT)' : 'Risk Events',
        data: data.map(item => item.value),
        borderColor: data.map(item => item.color || 'hsl(var(--primary))'),
        backgroundColor: type === 'bar' 
          ? data.map(item => item.color ? `${item.color}80` : 'hsl(var(--primary) / 0.8)')
          : data.map(item => item.color ? `${item.color}20` : 'hsl(var(--primary) / 0.1)'),
        borderWidth: 2,
        fill: type === 'line',
        tension: 0.4
      }
    ]
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 shadow-mining ${className}`}>
      <div className="h-64">
        {type === 'line' ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
};

export default RiskChart;