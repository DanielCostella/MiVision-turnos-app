export interface Profesional {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  matricula: string;
  sedeId: number;
  email?: string;
  telefono?: string;
  activo?: boolean;
  horarios?: string;
}