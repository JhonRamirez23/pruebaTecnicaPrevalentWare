import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui/Card';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className='flex gap-4'>
        <Card className='flex-1 hover:shadow-md transition' title='Sistema de Ingresos y Gastos'>
          <CardHeader title='Sistema de Ingresos y Gastos'>
            <CardTitle title='Sistema de Ingresos y Gastos'>Sistema de Ingresos y Gastos</CardTitle>
            <CardDescription title='Sistema de Ingresos y Gastos' content='Administra tus movimientos'>Administra tus movimientos</CardDescription>
          </CardHeader>
          <CardContent content='Ver Movimientos'>
            <Link href='/transactions' className='text-slate-900'>
              Ver Movimientos
            </Link>
          </CardContent>
        </Card>

        <Card className='flex-1 hover:shadow-md transition' title='Gestión de Usuarios'>
          <CardHeader title='Gestión de Usuarios'>
            <CardTitle title='Gestión de Usuarios'>Gestión de Usuarios</CardTitle>
            <CardDescription title='Gestión de Usuarios' content='Controla roles y permisos'>Controla roles y permisos</CardDescription>
          </CardHeader>
          <CardContent content='Ver Usuarios'>
            <Link href='/users' className='text-slate-900'>
              Ver Usuarios
            </Link>
          </CardContent>
        </Card>

        <Card className='flex-1 hover:shadow-md transition' title='Reportes'>
          <CardHeader title='Reportes'>
            <CardTitle title='Reportes'>Reportes</CardTitle>
            <CardDescription title='Reportes' content='Consulta estadísticas'>Consulta estadísticas</CardDescription>
          </CardHeader>
          <CardContent content='Ver Reportes'>
            <Link href='/reports' className='text-slate-900'>
              Ver Reportes
            </Link>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
