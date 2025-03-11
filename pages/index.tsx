import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex gap-4">
        <Card className="flex-1 hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Sistema de Ingresos y Gastos</CardTitle>
            <CardDescription>Administra tus movimientos</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/transactions" className="text-blue-600 underline">Ver Movimientos</Link>
          </CardContent>
        </Card>

        <Card className="flex-1 hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Gestión de Usuarios</CardTitle>
            <CardDescription>Controla roles y permisos</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/users" className="text-blue-600 underline">Ver Usuarios</Link>
          </CardContent>
        </Card>

        <Card className="flex-1 hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Reportes</CardTitle>
            <CardDescription>Consulta estadísticas</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/reports" className="text-blue-600 underline">Ver Reportes</Link>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

