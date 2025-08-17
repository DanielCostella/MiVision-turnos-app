export interface Sede {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  horarios: {
    semana: string;
    sabado: string;
  };
  activa: boolean;
}

export interface CreateSedeDTO {
  nombre: string;
  direccion: string;
  telefono: string;
  horarios?: {
    semana: string;
    sabado: string;
  };
}

export interface UpdateSedeDTO extends Partial<CreateSedeDTO> {}