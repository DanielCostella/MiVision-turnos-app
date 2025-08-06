export type TurnoEstado = 'pendiente' | 'confirmado' | 'cancelado' | 'completado';

export interface TurnoBase {
  usuario_id: number;
  profesional_id: number;
  sede_id: number;
  fecha: string;
  hora: string;
  motivo: string;
  notas?: string;
}

export interface Turno extends TurnoBase {
  id: number;
  estado: TurnoEstado;
  created_at: string;
  updated_at: string;
}