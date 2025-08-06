import React, { useState, useEffect } from 'react';
import { turnosService } from '../../../services/turnosService';

interface TurnosWidgetProps {
  actionProvider: {
    // Define aquí los métodos necesarios del actionProvider
  };
  sedeId: number;
}

const TurnosWidget: React.FC<TurnosWidgetProps> = ({ actionProvider, sedeId }) => {
  const [turnos, setTurnos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTurnos = async () => {
      try {
        setLoading(true);
        const turnosData = await turnosService.getTurnosBySede(sedeId);
        setTurnos(turnosData);
      } catch (error) {
        console.error('Error al cargar turnos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTurnos();
  }, [sedeId]);

  if (loading) return <div>Cargando turnos...</div>;

  return (
    <div>
      {/* Renderizar la lista de turnos */}
    </div>
  );
};

export default TurnosWidget;