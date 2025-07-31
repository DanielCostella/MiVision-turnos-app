export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface TurnoFilters {
  fecha_desde?: Date;
  fecha_hasta?: Date;
  sede_id?: number;
  profesional_id?: number;
  estado?: string;
  usuario_id?: number;
}