export interface TurnoBase {
  fecha: string;
  hora: string;
  pacienteId?: number;
  profesionalId: number;
  sedeId: number;
  estado: 'pendiente' | 'confirmado' | 'cancelado';
}

export interface Turno extends TurnoBase {
  id: number;
  createdAt: string;
  updatedAt: string;
}