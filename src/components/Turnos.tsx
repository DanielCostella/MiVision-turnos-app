import React, { useState, useEffect } from 'react';
import { sedesService } from '../services/sedesService';
import { Sede } from '../models/Sede'; // Cambiamos la importación

const Turnos: React.FC = () => {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSedes = async () => {
      try {
        const response = await sedesService.getSedes();
        if (response.success && response.data) {
          setSedes(response.data);
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar las sedes');
      } finally {
        setLoading(false);
      }
    };

    loadSedes();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sedes Disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sedes.map((sede) => (
          <div key={sede.id} className="border p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{sede.nombre}</h3>
            <p className="text-gray-600">{sede.direccion}</p>
            <p className="text-gray-600">{sede.telefono}</p>
            {sede.horarios && (
              <div className="mt-2">
                <p className="text-sm">Horarios:</p>
                <p className="text-sm">Lunes a Viernes: {sede.horarios.semana}</p>
                <p className="text-sm">Sábados: {sede.horarios.sabado}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Turnos;