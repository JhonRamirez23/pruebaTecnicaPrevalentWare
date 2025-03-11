import React, { useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import ReportChart from '../components/ReportChart';
import CsvDownloadButton from '../components/CsvDownloadButton';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      amount
      date
      user {
        name
      }
    }
  }
`;

export default function ReportsPage() {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);
  const transactions = useMemo(() => data?.transactions ?? [], [data]);

  // Se agrupa por nombre de usuario
  const chartData = useMemo(() => {
    const userSums: { [userName: string]: number } = {};
    transactions.forEach((tx: any) => {
      if (tx.user && tx.user.name) {
        userSums[tx.user.name] = (userSums[tx.user.name] || 0) + tx.amount;
      }
    });
    const labels = Object.keys(userSums);
    const amounts = labels.map((label) => userSums[label]);
    return {
      labels,
      datasets: [
        {
          label: 'Transactions by User',
          data: amounts,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
      ],
    };
  }, [transactions]);

  // Datos para el CSV
  const csvData = useMemo(() => {
    const headers = [
      { label: 'ID', key: 'id' },
      { label: 'Amount', key: 'amount' },
      { label: 'Date', key: 'date' },
      { label: 'User', key: 'user' },
    ];
    const rows = transactions.map((tx: any) => ({
      id: tx.id,
      amount: tx.amount,
      date: dayjs.utc(Number(tx.date)).format('DD-MM-YYYY'),
      user: tx.user?.name || '',
    }));
    return {
      headers,
      data: rows,
      filename: 'report.csv',
    };
  }, [transactions]);

  if (loading)
    return (
      <p className='flex justify-center align-middle'>Cargando reportes...</p>
    );
  if (error)
    return (
      <p className='flex justify-center align-middle'>
        Error al cargar reportes
      </p>
    );

  return (
    <ProtectedRoute requiredRole='ADMIN'>
      <Layout>
        <h2 className='text-2xl font-semibold mb-4'>Reportes</h2>
        <div className='flex gap-8'>
          {/* Sección Gráfico */}
          <div className='flex-1'>
            <h3 className='text-lg font-medium mb-2'>
              Movimientos por Usuario
            </h3>
            <ReportChart data={chartData} />
          </div>
          {/* Sección Saldo Actual */}
          <div className='w-64'>
            <h3 className='text-lg font-medium mb-2'>Saldo Actual</h3>
            <div className='bg-white p-4 rounded shadow mb-4'>
              <p className='text-2xl font-bold'>
                $
                {transactions
                  .reduce((acc: number, tx: any) => acc + tx.amount, 0)
                  .toFixed(2)}
              </p>
            </div>
            <CsvDownloadButton csvData={csvData} />
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
