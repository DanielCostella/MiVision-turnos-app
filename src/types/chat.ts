export type ChatState = 'inicial' | 'sede' | 'profesional' | 'fecha' | 'horario' | 'confirmacion' | 'finalizado';

export interface ChatSessionData {
  selectedSede?: number;
  selectedProfesional?: number;
  selectedHorario?: string;
  [key: string]: any;
}

export interface ChatResponse {
  response: string;
  nextStep: ChatState;
  data: ChatSessionData;
}

export interface ChatMessage {
  id: string;
  text: string;          // Cambiamos message por text
  isBot: boolean;        // Cambiamos type por isBot
  timestamp: number;     // Agregamos timestamp
  widget?: string;
  payload?: any;
}