import Link from 'next/link';
import { Home, User, BarChart4 } from 'lucide-react';
import AuthButton from './AuthButton';

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-200 text-slate-900 h-screen p-4 flex flex-col">
      <div className="mb-8 text-2xl font-bold">LOGO</div>
      <nav className="space-y-2">
        <Link href='/transactions' className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 hover:text-white">
          <Home size={18} />Ingresos y egresos
        </Link>
        <Link href='/users' className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 hover:text-white">
          <User size={18} />Usuarios
        </Link>
        <Link href='/reports' className="flex items-center gap-2 p-2 rounded hover:bg-gray-800 hover:text-white">
          <BarChart4 size={18} />Reportes
        </Link>
      </nav>
      <AuthButton />
    </div>
  )
}