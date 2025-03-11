import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function RoleBasedLinks() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center space-x-4">
      <Link href="/transactions" className="text-gray-700 hover:text-blue-600">Movimientos</Link>
      {session?.user?.role === 'ADMIN' && (
        <>
          <Link href="/users" className="text-gray-700 hover:text-blue-600">Usuarios</Link>
          <Link href="/reports" className="text-gray-700 hover:text-blue-600">Reportes</Link>
        </>
      )}
    </div>
  );
}
