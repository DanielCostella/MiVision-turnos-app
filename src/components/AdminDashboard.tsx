import React, { useEffect, useState } from 'react';
import { dbService } from '../services/dbService';

export const AdminDashboard = () => {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const cargarTurnos = async () => {
      const turnosHoy = await dbService.getTurnosHoy();
      setTurnos(turnosHoy);
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