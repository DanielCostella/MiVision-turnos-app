export type TurnoEstado = 'pendiente' | 'confirmado' | 'cancelado' | 'completado';

export interface TurnoBase {
  fecha: string;
  hora: string;
  sede_id: number;
  profesional_id: number;
  usuario_id: number;
  estado: TurnoEstado;
  motivo?: string;
}

export interface Turno extends TurnoBase {
  id: number;
  createdAt: string;
  updatedAt: string;
}