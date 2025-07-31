export type ChatState = 'inicial' | 'sede' | 'profesional' | 'fecha' | 'horario' | 'confirmacion' | 'finalizado';

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: number;
}

export interface ChatSessionData {
  sede?: string;
  profesional?: string;
  fecha?: string;
  horario?: string;
  usuario?: {
    nombre?: string;
    email?: string;
    telefono?: string;
  };
}

export interface ChatResponse {
  response: string;
  nextStep: ChatState;
  data: ChatSessionData;
}