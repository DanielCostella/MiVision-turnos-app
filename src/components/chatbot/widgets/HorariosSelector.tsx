import React, { useEffect, useState } from 'react';
import { turnosService } from '../../../services/turnosService';

interface Props {
  actionProvider: any;
  state: any;
  setState: (state: any) => void;
}

const HorariosSelector: React.FC<Props> = (props) => {
  const { actionProvider, state } = props;
  const [horarios, setHorarios] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHorarios = async () => {
      const result = await turnosService.getHorariosDisponibles(state.selectedProfesional);
      if (result.success && result.data) {
        setHorarios(result.data);
      }
      setLoading(false);
    };

    loadHorarios();
  }, [state.selectedProfesional]);

  if (loading) return <div>Cargando horarios disponibles...</div>;

  return (
    <div className="grid gap-2">
      {horarios.map((horario) => (
        <button
          key={horario}
          onClick={() => actionProvider.handleHorarioSelected(horario)}
          className="p-3 text-left bg-white hover:bg-gray-50 rounded-lg border"
        >
          {horario}
        </button>
      ))}
    </div>
  );
};

export default HorariosSelector;