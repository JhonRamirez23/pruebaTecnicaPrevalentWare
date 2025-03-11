import { useQuery, useMutation, gql } from '@apollo/client';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { useState } from 'react';
import EditUserForm from '../components/EditUserForm';
import Button from '@/components/Button';
import Link from 'next/link';

// Query para obtener usuarios
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      role
    }
  }
`;

// Mutación para actualizar usuario
const UPDATE_USER = gql`
  mutation UpdateUser($id: Int!, $name: String!, $role: Role!) {
    updateUser(id: $id, name: $name, role: $role) {
      id
      name
      role
    }
  }
`;

export default function UsersPage() {
  const { data, loading, error } = useQuery(GET_USERS);
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_USERS],
  });

  // Guarda el usuario seleccionado para editar
  const [selectedUser, setSelectedUser] = useState<any>(null);

  if (loading)
    return <p className='flex justify-center align-middle'>Cargando...</p>;
  if (error)
    return (
      <p className='flex justify-center align-middle'>
        Error cargando usuarios
      </p>
    );

  // Función que se llama al hacer clic en "Edit"
  const handleEdit = (user: any) => {
    setSelectedUser(user);
  };

  // Función que se llama al guardar cambios en el formulario
  const handleSave = async (formData: any) => {
    await updateUser({
      variables: {
        id: formData.id,
        name: formData.name,
        role: formData.role,
      },
    });
    setSelectedUser(null);
  };

  return (
    <ProtectedRoute requiredRole='ADMIN'>
      <Layout>
        <h2 className='text-2xl font-semibold mb-4'>Gestión de usuarios</h2>

        {/* Si no hay usuario seleccionado, muestra la tabla; de lo contrario, muestra el formulario */}
        {!selectedUser ? (
          <table className='min-w-full bg-white border'>
            <thead>
              <tr>
                <th className='py-2 border-b'>Nombre</th>
                <th className='py-2 border-b'>Correo</th>
                <th className='py-2 border-b'>Role</th>
                <th className='py-2 border-b'>Actiones</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user: any) => (
                <tr key={user.id}>
                  <td className='border px-4 py-2 text-center'>{user.name}</td>
                  <td className='border px-4 py-2 text-center'>{user.email}</td>
                  <td className='border px-4 py-2 text-center'>{user.role}</td>
                  <td className='border px-4 py-2 text-center'>
                    <button
                      onClick={() => handleEdit(user)}
                      className='px-3 py-1 bg-blue-500 text-white rounded'
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <EditUserForm
            user={selectedUser}
            onSave={handleSave}
            onCancel={() => setSelectedUser(null)}
          />
        )}
        <Button>
          <Link href='/'>Volver al inicio</Link>
        </Button>
      </Layout>
    </ProtectedRoute>
  );
}
