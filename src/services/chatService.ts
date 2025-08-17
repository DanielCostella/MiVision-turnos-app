import { ChatState, ChatSessionData, ChatResponse } from '../types/chat';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const chatService = {
  handleChat: async (
    message: string,
    currentStep: ChatState,
    sessionData: ChatSessionData
  ): Promise<ChatResponse> => {
    try {
      switch (currentStep) {
        case 'profesional':
          if (message) {
            return {
              response: 'Por favor, selecciona una fecha para tu turno:',
              nextStep: 'fecha',
              data: {
                selectedProfesional: { id: parseInt(message) },
                currentStep: 'fecha'
              },
              widget: 'fecha-selector'
            };
          }
          break;

        case 'fecha':
          if (sessionData.selectedFecha) {
            return {
              response: 'Ahora selecciona un horario disponible:',
              nextStep: 'horario',
              data: {
                currentStep: 'horario'
              },
              widget: 'horarios-selector'
            };
          }
          break;

        // ... resto de los casos ...
      }

      const response = await axios.post<ChatResponse>(`${API_URL}/chat`, {
        message,
        currentStep,
        sessionData
      });
      return response.data;
    } catch (error) {
      console.error('Error en chatService:', error);
      throw error;
    }
  }
};