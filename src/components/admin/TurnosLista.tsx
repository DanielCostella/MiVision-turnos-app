import React from 'react';

interface Turno {
  id: number;
  fecha: string;
  hora: string;
}

interface TurnosListaProps {
  turnos: Turno[];
  onConfirmar: (turnoId: number) => void;
  onCancelar: (turnoId: number) => void;
  onReprogramar: (turnoId: number) => void;
}

export const TurnosLista: React.FC<TurnosListaProps> = ({
  turnos,
  onConfirmar,
  onCancelar,
  onReprogramar
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">Fecha</th>
            <th className="px-6 py-3 text-left">Hora</th>
            <th className="px-6 py-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {turnos.map(turno => (
            <tr key={turno.id}>
              <td className="px-6 py-4">{turno.fecha}</td>
              <td className="px-6 py-4">{turno.hora}</td>
              <td className="px-6 py-4 space-x-2">
                <button
                  onClick={() => onConfirmar(turno.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Confirmar
                </button>
                <button
                  onClick={() => onCancelar(turno.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => onReprogramar(turno.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Reprogramar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};