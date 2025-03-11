import Link from 'next/link';
import AuthButton from './AuthButton';
import RoleBasedLinks from './RoleBasedLinks';

export default function Navbar() {
  return (
    <nav className='bg-slate-600 shadow'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex justify-between items-center'>
        <Link href='/' className='text-xl font-bold'>
          Sistema de Gestión financiera
        </Link>
        <div className='flex items-center space-x-4'>
          <RoleBasedLinks />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
