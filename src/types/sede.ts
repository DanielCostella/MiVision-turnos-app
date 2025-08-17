export interface Sede {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  horarios: {
    semana: string;
    sabado: string;
  };
  activo?: boolean;
}