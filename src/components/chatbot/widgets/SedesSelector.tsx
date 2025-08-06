import React, { useEffect, useState } from 'react';
import { Sede } from '../../../models/Sede';
import { sedesService } from '../../../services/sedesService';

interface SedesSelectorProps {
  setState: (state: any) => void;
  actionProvider: any;
  state: any;
}

const SedesSelector: React.FC<SedesSelectorProps> = (props) => {
  const { actionProvider } = props;
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
    <div className="grid gap-2">
      {sedes.map((sede) => (
        <button
          key={sede.id}
          onClick={() => actionProvider.handleSedeSelected(sede.id)}
          className="p-3 text-left bg-white hover:bg-gray-50 rounded-lg border"
        >
          <p className="font-medium">{sede.nombre}</p>
          <p className="text-sm text-gray-500">{sede.direccion}</p>
        </button>
      ))}
    </div>
  );
};

export default SedesSelector;