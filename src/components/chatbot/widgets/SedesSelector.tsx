import React, { useEffect, useState } from 'react';
import { Sede } from '../../../models/Sede';
import { sedesService } from '../../../services/sedesService';

interface SedesSelectorProps {
  actionProvider: any;
  setState: any;
}

const SedesSelector: React.FC<SedesSelectorProps> = ({ actionProvider }) => {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSedes = async () => {
      const result = await sedesService.getSedes();
      if (result.success && result.data) {
        setSedes(result.data);
      }
      setLoading(false);
    };

    loadSedes();
  }, []);

  if (loading) return <div>Cargando sedes...</div>;

  return (
    <div className="sedes-selector">
      {sedes.map((sede) => (
        <button
          key={sede.id}
          className="w-full p-2 mb-2 text-left hover:bg-gray-100 rounded"
          onClick={() => actionProvider.handleSedeSelected(sede.id)}
        >
          {sede.nombre} - {sede.direccion}
        </button>
      ))}
    </div>
  );
};

export default SedesSelector;