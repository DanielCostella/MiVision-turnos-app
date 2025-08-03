import React, { useState, useEffect } from 'react';
import { turnosService, Turno } from '../../../services/turnosService';

interface TurnosWidgetProps {
  actionProvider: {
    handleTurno: (horario: string) => void;
    handleSedeSelection: (sedeId: number) => void;
  };
  setState: any;
}

const TurnosWidget: React.FC<TurnosWidgetProps> = ({ actionProvider, setState }) => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [sedeSeleccionada, setSedeSeleccionada] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sedeSeleccionada) {
      cargarTurnosPorSede(sedeSeleccionada);
    }
  }, [sedeSeleccionada]);

  const cargarTurnosPorSede = async (sedeId: number) => {
    try {
      setLoading(true);
      const turnosData = await turnosService.getTurnosPorSede(sedeId);
      setTurnos(turnosData);
    } catch (error) {
      console.error('Error al cargar turnos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="turnos-widget">
      <h3>Turnos Disponibles:</h3>
      {loading ? (
        <p>Cargando turnos...</p>
      ) : (
        <div className="grid gap-2">
          {turnos.map((turno) => (
            <button
              key={turno.id}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => actionProvider.handleTurno(turno.hora)}
            >
              {turno.fecha} - {turno.hora}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TurnosWidget;