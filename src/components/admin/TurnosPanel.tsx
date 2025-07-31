import React, { useState, useEffect } from 'react';
import { Turno } from '../../types';

export const TurnosPanel: React.FC = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);

  const handleConfirmarTurno = async (turnoId: number) => {
    try {
      await fetch(`/api/turnos/${turnoId}/confirmar`, {
        method: 'PUT'
      });
      // Recargar turnos
      loadTurnos();
    } catch (error) {
      console.error('Error al confirmar turno:', error);
    }
  };

  const handleCancelarTurno = async (turnoId: number) => {
    try {
      await fetch(`/api/turnos/${turnoId}/cancelar`, {
        method: 'PUT'
      });
      loadTurnos();
    } catch (error) {
      console.error('Error al cancelar turno:', error);
    }
  };

  const handleReprogramarTurno = async (turnoId: number, nuevaFecha: string) => {
    try {
      await fetch(`/api/turnos/${turnoId}/reprogramar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fecha: nuevaFecha })
      });
      loadTurnos();
    } catch (error) {
      console.error('Error al reprogramar turno:', error);
    }
  };

  const loadTurnos = async () => {
    try {
      const response = await fetch('/api/turnos');
      const data = await response.json();
      setTurnos(data);
    } catch (error) {
      console.error('Error al cargar turnos:', error);
    }
  };

  useEffect(() => {
    loadTurnos();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Gestión de Turnos</h2>
      <div className="grid gap-4">
        {turnos.map(turno => (
          <div key={turno.id} className="bg-white p-4 rounded-lg shadow">
            <p>Fecha: {turno.fecha}</p>
            <p>Hora: {turno.hora}</p>
            <p>Estado: {turno.estado}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleConfirmarTurno(turno.id)}>Confirmar</button>
              <button onClick={() => handleCancelarTurno(turno.id)}>Cancelar</button>
              <button onClick={() => handleReprogramarTurno(turno.id, '')}>Reprogramar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TurnosPanel;