import { useQuery, gql } from '@apollo/client';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      concept
      amount
      date
      user {
        name
      }
    }
  }
`;

export default function TransactionsPage() {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);
  const { data: session } = useSession();

  if (loading)
    return <p className='flex justify-center align-middle'>Cargando...</p>;
  if (error)
    return (
      <p className='flex justify-center align-middle'>
        Error al cargar movimientos
      </p>
    );

  // Ejemplo de cálculo de total
  const total = data.transactions.reduce(
    (acc: number, tx: any) => acc + tx.amount,
    0
  );

  return (
    <Layout>
      {/* Contenedor principal */}
      <div className='p-6'>
        {/* Título del sistema */}
        <h2 className='text-2xl font-bold mb-2'>
          Sistema de gestión de Ingresos y Gastos
        </h2>

        {/* Encabezado de sección */}
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-xl font-semibold'>Ingresos y egresos</h3>
          {session?.user?.role === 'ADMIN' && (
            <Link href='/transactions/new'>
              <Button>Nuevo</Button>
            </Link>
          )}
        </div>

        {/* Tabla de movimientos */}
        <table className='w-full border bg-white'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border p-2'>Concepto</th>
              <th className='border p-2'>Monto</th>
              <th className='border p-2'>Fecha</th>
              <th className='border p-2'>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {data.transactions.map((mov: any) => (
              <tr key={mov.id}>
                <td className='border p-2 text-center'>{mov.concept}</td>
                <td className='border p-2 text-center'>{mov.amount}</td>
                <td className='border p-2 text-center'>
                  {mov.date
                    ? dayjs.utc(Number(mov.date)).format('DD-MM-YYYY')
                    : 'Sin fecha'}
                </td>
                <td className='border p-2 text-center'>{mov.user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total en la parte inferior */}
        <div className='flex justify-end mt-4'>
          <span className='text-lg font-semibold'>
            Total: ${total.toFixed(2)}
          </span>
        </div>
      </div>
      <Button>
        <Link href='/'>Regresar</Link>
      </Button>
    </Layout>
  );
}
