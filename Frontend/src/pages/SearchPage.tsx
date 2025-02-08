import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useUserData } from '../hooks/usersHook';

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const { data: userData, isLoading, isError, error } = useUserData();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Buscando: ${query}`);
  };

  console.log("Datos del usuario1:", userData);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      {/* {isLoading && <p>Cargando usuario...</p>}
      {isError && <p>Error: {error?.message}</p>}
      {userData ? (
        <h2 className="text-2xl font-semibold">Bienvenido, {userData.username}!</h2>
      ) : (
        <p>No se pudo obtener el usuario</p>
      )} */}


      <div className="text-center p-8 rounded-lg w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-6">LinkShare</h1>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="w-full p-4 text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu búsqueda..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchPage;
