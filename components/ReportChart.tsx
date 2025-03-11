import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registramos los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ReportChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
}

export default function ReportChart({ data }: ReportChartProps) {
  return (
    <div
      className='bg-white p-4 rounded shadow'
      style={{ position: 'relative', height: 400 }}
    >
      <Bar
        data={data}
        redraw
        key={JSON.stringify(data.labels)}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Usuario',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Monto total',
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Movimientos por Usuario',
              font: {
                size: 16,
              },
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}
