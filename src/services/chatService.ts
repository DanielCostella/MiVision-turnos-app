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
      const response = await axios.post(`${API_URL}/chat`, {
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