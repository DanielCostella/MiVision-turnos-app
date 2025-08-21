import React, { useState } from 'react';
import { api } from '../../config/api';

const HistorialTurnos: React.FC = () => {
  const [apellido, setApellido] = useState('');
  const [fecha, setFecha] = useState('');
  const [resultados, setResultados] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResultados([]);
    try {
      // Construir query params
      const params: any = {};
      if (apellido) params.apellido = apellido;
      if (fecha) params.fecha = fecha;
      const { data } = await api.get('/turnos/admin/turnos/filtrados', { params });
      // Mapear resultados para la tabla (ahora usando data.data)
      setResultados((data.data || []).map((t: any) => ({
        fecha: t.fecha,
        hora: t.hora,
        paciente: t.paciente || t.paciente_nombre || t.nombre_paciente || '',
        profesional: t.profesional || t.profesional_nombre || t.nombre_profesional || '',
        estado: t.estado
      })));
    } catch (err: any) {
      setError('Error al buscar turnos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">Historial de Turnos</h2>
      <form className="flex flex-wrap gap-4 mb-4" onSubmit={handleBuscar}>
        <input
          type="text"
          placeholder="Buscar por apellido"
          value={apellido}
          onChange={e => setApellido(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="date"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          Buscar
        </button>
      </form>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div>
        {/* Resultados */}
        {resultados.length > 0 ? (
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Fecha</th>
                <th className="p-2 border">Hora</th>
                <th className="p-2 border">Paciente</th>
                <th className="p-2 border">Profesional</th>
                <th className="p-2 border">Estado</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((turno, idx) => (
                <tr key={idx}>
                  <td className="p-2 border">{turno.fecha}</td>
                  <td className="p-2 border">{turno.hora}</td>
                  <td className="p-2 border">{turno.paciente}</td>
                  <td className="p-2 border">{turno.profesional}</td>
                  <td className="p-2 border">{turno.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-gray-500">No hay resultados para mostrar.</div>
        )}
      </div>
    </div>
  );
};

export default HistorialTurnos;
