export type ChatState = 'inicial' | 'sede' | 'profesional' | 'fecha' | 'horario' | 'confirmacion' | 'finalizado';

export interface ChatSessionData {
  messages: any[];
  selectedSede: any | null;
  selectedProfesional: any | null;
  selectedFecha: string | null;
  selectedHorario?: string;
  profesionales: any[];
  currentStep: ChatState; // Nota: esto NO puede ser undefined
}

export interface ChatResponse {
  response: string;
  nextStep?: ChatState; // Puede ser undefined
  data?: Partial<ChatSessionData>; // Puede ser undefined
  widget?: any;
}

export interface ChatMessage {
  id: string;
  text: string;          // Cambiamos message por text
  isBot: boolean;        // Cambiamos type por isBot
  timestamp: number;     // Agregamos timestamp
  widget?: string;
  payload?: any;
}