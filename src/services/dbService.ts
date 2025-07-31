import { pool } from '../config/database';
import { RowDataPacket } from 'mysql2';

interface QueryResult extends RowDataPacket {}

export const dbService = {
  async getTurnosHoy() {
    const [rows] = await pool.query<QueryResult[]>(`
      SELECT 
        t.*,
        u.nombre as nombre_paciente,
        u.apellido as apellido_paciente,
        p.nombre as nombre_profesional,
        p.apellido as apellido_profesional,
        s.nombre as nombre_sede
      FROM turnos t
      JOIN usuarios u ON t.usuario_id = u.id
      JOIN profesionales p ON t.profesional_id = p.id
      JOIN sedes s ON t.sede_id = s.id
      WHERE DATE(t.fecha) = CURDATE()
      ORDER BY t.hora ASC
    `);
    return rows;
  },

  async getSedes() {
    const [rows] = await pool.query<QueryResult[]>('SELECT * FROM sedes WHERE activa = true');
    return rows;
  },

  async getProfesionalesBySede(sedeId: number) {
    const [rows] = await pool.query<QueryResult[]>(
      'SELECT * FROM profesionales WHERE sede_id = ? AND activo = true',
      [sedeId]
    );
    return rows;
  },

  async getHorariosDisponibles(profesionalId: number, fecha: string) {
    const [rows] = await pool.query(
      'SELECT horarios_disponibles FROM profesionales WHERE id = ?',
      [profesionalId]
    );
    return rows[0]?.horarios_disponibles.split(',') || [];
  },

  async guardarTurno(turnoData: {
    usuario_id: number,
    profesional_id: number,
    sede_id: number,
    fecha: string,
    hora: string,
    motivo: string
  }) {
    const [result] = await pool.query(
      'INSERT INTO turnos (usuario_id, profesional_id, sede_id, fecha, hora, motivo) VALUES (?, ?, ?, ?, ?, ?)',
      [turnoData.usuario_id, turnoData.profesional_id, turnoData.sede_id, turnoData.fecha, turnoData.hora, turnoData.motivo]
    );
    return result;
  }
};