import { RowDataPacket } from 'mysql2';

export interface Sede extends RowDataPacket {
  id: number;
  nombre: string;
  direccion: string;
  telefono?: string;
  activa: boolean;
}

export interface Turno extends RowDataPacket {
  id: number;
  fecha: Date;
  hora: string;
  nombre_paciente: string;
  nombre_profesional: string;
  estado: string;
  sede_id: number;
  profesional_id: number;
}

export interface QueryResultTurno extends RowDataPacket, Turno {}
export interface QueryResultSede extends RowDataPacket, Sede {}