import { Pool } from 'mysql2/promise';
import { QueryResultTurno, QueryResultSede, Turno, Sede } from '../types/app';
import { pool } from '../config/database';

export const dbService = {
  async getTurnosHoy(): Promise<Turno[]> {
    const [rows] = await pool.query<QueryResultTurno[]>(`
      SELECT 
        t.*,
        u.nombre as nombre_paciente,
        p.nombre as nombre_profesional
      FROM turnos t
      LEFT JOIN usuarios u ON t.paciente_id = u.id
      LEFT JOIN profesionales p ON t.profesional_id = p.id
      WHERE DATE(t.fecha) = CURDATE()
    `);
    return rows;
  },

  async getSedes(): Promise<Sede[]> {
    const [rows] = await pool.query<QueryResultSede[]>(
      'SELECT * FROM sedes WHERE activa = true'
    );
    return rows;
  },

  async getProfesionalesBySede(sedeId: number) {
    const [rows] = await pool.query<QueryResultSede[]>(
      'SELECT * FROM profesionales WHERE sede_id = ? AND activo = true',
      [sedeId]
    );
    return rows;
  },

  async getHorariosDisponibles(profesionalId: number): Promise<string[]> {
    const [rows] = await pool.query<QueryResultSede[]>(
      'SELECT horarios_disponibles FROM profesionales WHERE id = ?',
      [profesionalId]
    );
    return rows[0]?.horarios_disponibles?.split(',') || [];
  }
};

export default dbService;