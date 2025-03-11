import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, gql } from '@apollo/client';
import Layout from '../../components/Layout';
import ProtectedRoute from '../../components/ProtectedRoute';
import Button from '@/components/Button';
import Link from 'next/link';

const ADD_TRANSACTION = gql`
  mutation AddTransaction($concept: String!, $amount: Float!, $date: String!) {
    addTransaction(concept: $concept, amount: $amount, date: $date) {
      id
      concept
      amount
      date
    }
  }
`;

export default function NewTransactionPage() {
  const router = useRouter();
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [addTransaction] = useMutation(ADD_TRANSACTION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      alert('Invalid amount');
      return;
    }

    try {
      await addTransaction({
        variables: {
          concept,
          amount: parsedAmount,
          date,
        },
      });
      // Redirige a la página de movimientos
      router.push('/transactions');
    } catch (error) {
      return alert('Error creando el movimiento: ' + error);
    }
  };

  return (
    <ProtectedRoute requiredRole='ADMIN'>
      <Layout>
        <h2 className='text-2xl font-semibold mb-4'>
          Nuevo Movimiento de Dinero
        </h2>
        <form
          onSubmit={handleSubmit}
          className='max-w-md bg-white p-4 rounded shadow'
        >
          <div className='mb-4'>
            <label className='block font-medium mb-1'>Monto</label>
            <input
              type='number'
              step='0.01'
              className='border p-2 w-full'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='block font-medium mb-1'>Concepto</label>
            <input
              type='text'
              className='border p-2 w-full'
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='block font-medium mb-1'>Fecha</label>
            <input
              type='date'
              className='border p-2 w-full'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className='flex justify-center gap-2'>
            <Button
              type='submit'
              className='bg-green-500 text-white px-4 py-2 rounded'
            >
              Ingresar
            </Button>
            <Button>
              <Link href='/transactions'>Regresar</Link>
            </Button>
          </div>
        </form>
      </Layout>
    </ProtectedRoute>
  );
}
