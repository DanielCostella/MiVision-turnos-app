import React, { useState, useEffect } from 'react';
import { MessageSquare, Loader2 } from 'lucide-react';
import { sedesService } from '../services/sedesService';
import type { Sede } from '../models/Sede';

const Turnos: React.FC = () => {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSedes = async () => {
      try {
        const result = await sedesService.getSedes();
        if (result.success) {
          setSedes(result.data);
        } else {
          setError('Error al cargar las sedes');
        }
      } catch (error) {
        setError('Error de conexión');
      } finally {
        setLoading(false);
      }
    };

    loadSedes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-8">{error}</div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Reservá tu turno</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sedes.map((sede) => (
            <div key={sede.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">{sede.nombre}</h3>
              <p className="text-gray-600 mb-2">{sede.direccion}</p>
              <p className="text-gray-600 mb-4">{sede.telefono}</p>
              <button
                onClick={() => {
                  const mensaje = `Hola! Me gustaría solicitar un turno para la sede ${sede.nombre}`;
                  window.open(`https://wa.me/2615134452?text=${encodeURIComponent(mensaje)}`, '_blank');
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MessageSquare className="inline-block w-5 h-5 mr-2" />
                Solicitar Turno
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Turnos;