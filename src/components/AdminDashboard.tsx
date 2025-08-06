import React, { useEffect, useState } from 'react';
import { Turno } from '../types/app';
import { dbService } from '../services/dbService';

const AdminDashboard: React.FC = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);

  useEffect(() => {
    const cargarTurnos = async () => {
      try {
        const turnosHoy = await dbService.getTurnosHoy();
        setTurnos(turnosHoy);
      } catch (error) {
        console.error('Error al cargar turnos:', error);
      }
    };

    cargarTurnos();
    const interval = setInterval(cargarTurnos, 60000); // Actualizar cada minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>
      <div className="turnos-container">
        {turnos.map(turno => (
          <div key={turno.id} className="turno-card">
            <h3>Turno #{turno.id}</h3>
            <p>Paciente: {turno.nombre_paciente}</p>
            <p>Profesional: {turno.nombre_profesional}</p>
            <p>Hora: {turno.hora}</p>
            <p>Estado: {turno.estado}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;