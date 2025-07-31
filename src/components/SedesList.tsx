
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Sede {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email?: string;
  horarios: string;
}

const SedesList: React.FC = () => {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/api/sedes')
      .then(res => {
        setSedes(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando sedes...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {sedes.map(sede => (
        <div key={sede.id} className="bg-blue-50 rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">{sede.nombre}</h3>
          <p className="text-gray-600">{sede.direccion}</p>
          <p className="text-gray-500">{sede.telefono}</p>
          <p className="text-gray-500">{sede.email}</p>
          <p className="text-gray-400">{sede.horarios}</p>
        </div>
      ))}
    </div>
  );
};

export default SedesList;
