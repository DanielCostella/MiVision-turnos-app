import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import { Usuario } from '../../types';

export const UsuariosPanel: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await apiService.getUsuarios();
        if (response.success) {
          setUsuarios(response.data);
        }
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
      <div className="bg-white shadow rounded-lg p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DNI
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {usuario.nombre} {usuario.apellido}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.dni}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};