import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center space-x-2">
        <span>Bienvenido, {session.user?.name}</span>
        <button 
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => signOut()}
        >
          Cerrar sesión
        </button>
      </div>
    );
  }
  
  return (
    <button 
      className="px-4 py-2 bg-green-500 text-white rounded"
      onClick={() => signIn("auth0")}
    >
      Iniciar sesión
    </button>
  );
}
