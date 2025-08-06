import axios from 'axios';
import { Turno } from '../models/Turno';

const API_URL = 'http://localhost:3001/api';

export const turnosService = {
  async createTurno(data: any) {
    try {
      const response = await fetch('/api/turnos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error al crear turno:', error);
      return { success: false };
    }
  },

  async getTurnosBySede(sedeId: number) {
    try {
      const response = await fetch(`/api/turnos/sede/${sedeId}`);
      return await response.json();
    } catch (error) {
      console.error('Error al obtener turnos:', error);
      return { success: false };
    }
  },

  async getTurnosByProfesional(profesionalId: number) {
    try {
      const response = await fetch(`/api/turnos/profesional/${profesionalId}`);
      return await response.json();
    } catch (error) {
      console.error('Error al obtener turnos:', error);
      return { success: false };
    }
  },

  async getHorariosDisponibles(profesionalId: number) {
    try {
      const response = await fetch(`/api/turnos/disponibilidad/${profesionalId}`);
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false };
    }
  }
};