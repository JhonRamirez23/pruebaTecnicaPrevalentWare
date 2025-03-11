import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || (requiredRole && session.user.role !== requiredRole)) {
      router.push('/'); // Redirige a la página de inicio
    }
  }, [session, status, requiredRole, router]);

  if (status === 'loading' || !session) {
    return <div>Cargando...</div>;
  }

  return <>{children}</>;
}
