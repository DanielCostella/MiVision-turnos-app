import React, { useEffect, useState } from 'react';
import { sedesService } from '../../../services/sedesService';
import { Sede } from '../../../models/Sede';

// Definimos la interfaz para las props
interface Props {
  actionProvider: {
    handleSedeSelected: (sede: Sede) => void;
  };
  state: {
    selectedSede?: Sede | null;
  };
}

const SedesSelector: React.FC<Props> = ({ actionProvider }) => {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarSedes = async () => {
      try {
        console.log('Cargando sedes...'); // Debug
        const response = await sedesService.getSedes();
        console.log('Respuesta:', response); // Debug

        if (response.success && Array.isArray(response.data)) {
          setSedes(response.data);
        } else {
          setError('No se pudieron cargar las sedes');
        }
      } catch (err) {
        console.error('Error al cargar sedes:', err);
        setError('Error al cargar las sedes');
      } finally {
        setLoading(false);
      }
    };

    cargarSedes();
  }, []);

  if (loading) {
    console.log('Estado: Cargando'); // Debug
    return <div className="text-center p-4">Cargando sedes...</div>;
  }

  if (error) {
    console.log('Estado: Error -', error); // Debug
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  console.log('Sedes cargadas:', sedes); // Debug

  return (
    <div className="grid gap-3">
      {sedes.map((sede) => (
        <button
          key={sede.id}
          onClick={() => actionProvider.handleSedeSelected(sede)}
          className="p-4 text-left bg-white hover:bg-gray-50 rounded-lg border"
        >
          <div className="font-medium">{sede.nombre}</div>
          <div className="text-sm text-gray-600">{sede.direccion}</div>
          {sede.horarios && (
            <div className="text-xs text-gray-500">
              L-V: {sede.horarios.semana}, S: {sede.horarios.sabado}
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default SedesSelector;