export interface Usuario {
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