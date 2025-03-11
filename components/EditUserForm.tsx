import { useState } from 'react';
import Button from '@/components/Button';

interface EditUserFormProps {
  user: any;
  onSave: (formData: { id: number; name: string; role: 'ADMIN' | 'USER' }) => void;
  onCancel: () => void;
}

export default function EditUserForm({ user, onSave, onCancel }: EditUserFormProps) {
  const [name, setName] = useState(user.name || '');
  const [role, setRole] = useState<'ADMIN' | 'USER'>(user.role || 'USER');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: user.id, name, role });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md">
      <div className="mb-4">
        <label className="block font-medium mb-1">Nombre</label>
        <input 
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-1">Rol</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as 'ADMIN' | 'USER')}
          className="border p-2 w-full"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>
      <div className="flex justify-center gap-2">
        <Button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Guardar
        </Button>
        <Button type="button" onClick={onCancel} className="bg-gray-400 px-4 py-2 rounded">
          Cancelar
        </Button>
      </div>
    </form>
  );
}
