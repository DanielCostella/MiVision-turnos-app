import { RowDataPacket } from 'mysql2';

// Interfaz base para Turno
export interface TurnoBase {
  id: number; // Cambiamos de opcional a requerido
  sede_id: number;
  profesional_id: number;
  usuario_id: number;
  fecha: string;
  hora: string;
  estado: 'pendiente' | 'confirmado' | 'cancelado' | 'completado';
  motivo?: string;
  notas?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Interfaz para Turno en la base de datos
export interface Turno extends TurnoBase, RowDataPacket {
  usuario?: Usuario;
  profesional?: Profesional;
  sede?: Sede;
}

export interface Usuario extends RowDataPacket {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  dni: string;
  fecha_nacimiento: Date;
  activo: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Profesional extends RowDataPacket {
  id: number;
  nombre: string;
  apellido: string;
  especialidad_id: number;
  sede_id: number;
  email: string;
  telefono: string;
  matricula: string;
  activo: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Sede extends RowDataPacket {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  horarios: {
    semana: string;
    sabado: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}