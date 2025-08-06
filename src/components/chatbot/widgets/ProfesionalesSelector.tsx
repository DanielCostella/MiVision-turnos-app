import React, { useEffect, useState } from 'react';
import { Profesional } from '../../../models/Profesional';
import { profesionalesService } from '../../../services/profesionalesService';

interface Props {
  actionProvider: any;
  state: any;
  setState: (state: any) => void;
}

const ProfesionalesSelector: React.FC<Props> = (props) => {
  const { actionProvider, state } = props;
  const [profesionales, setProfesionales] = useState<Profesional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfesionales = async () => {
      const result = await profesionalesService.getProfesionalesBySede(state.selectedSede);
      if (result.success && result.data) {
        setProfesionales(result.data);
      }
      setLoading(false);
    };

    loadProfesionales();
  }, [state.selectedSede]);

  if (loading) return <div>Cargando profesionales...</div>;

  return (
    <div className="grid gap-2">
      {profesionales.map((profesional) => (
        <button
          key={profesional.id}
          onClick={() => actionProvider.handleProfesionalSelected(profesional.id)}
          className="p-3 text-left bg-white hover:bg-gray-50 rounded-lg border"
        >
          <p className="font-medium">{profesional.nombre}</p>
          <p className="text-sm text-gray-500">{profesional.especialidad}</p>
        </button>
      ))}
    </div>
  );
};

export default ProfesionalesSelector;