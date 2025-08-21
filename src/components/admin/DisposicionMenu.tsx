import React, { useState } from 'react';
import { api } from '../../config/api';

interface DisposicionMenuProps {
  turnoId: number;
  estadoActual: string;
  onEstadoCambiado?: (nuevoEstado: string) => void;
}

const opciones = [
  { label: 'Otorgado', value: 'OTORGADO' },
  { label: 'No vino paciente', value: 'NO_VINO' },
  { label: 'Cancelado', value: 'CANCELADO' },
];

const DisposicionMenu: React.FC<DisposicionMenuProps> = ({ turnoId, estadoActual, onEstadoCambiado }) => {
  const [abierto, setAbierto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSeleccion = async (nuevoEstado: string) => {
    setLoading(true);
    setError(null);
    try {
  await api.put(`/turnos/admin/turnos/${turnoId}`, { estado: nuevoEstado });
      if (onEstadoCambiado) onEstadoCambiado(nuevoEstado);
      setAbierto(false);
    } catch (err) {
      setError('Error al actualizar el estado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative ml-2">
      <button
        className="px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-xs"
        onClick={() => setAbierto(a => !a)}
        type="button"
        disabled={loading}
      >
        Disponer ▼
      </button>
      {abierto && (
        <div className="absolute right-0 mt-1 w-40 bg-white border rounded shadow z-10">
          {opciones.map(op => (
            <button
              key={op.value}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${op.value === estadoActual ? 'font-bold text-blue-700' : ''}`}
              disabled={loading || op.value === estadoActual}
              type="button"
              onClick={() => handleSeleccion(op.value)}
            >
              {op.label}
            </button>
          ))}
          {error && <div className="text-red-500 text-xs p-2">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default DisposicionMenu;
