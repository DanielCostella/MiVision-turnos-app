import { Sede } from '../../models/Sede';
import { sedesService } from '../../services/sedesService';
import { chatService } from '../../services/chatService';
import { ChatState, ChatSessionData } from '../../types/chat';

class ActionProvider {
  createChatBotMessage: any;
  setState: any;
  createClientMessage: any;
  private state: ChatSessionData;

  constructor(createChatBotMessage: any, setStateFunc: any, createClientMessage: any) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = (state: any) => {
      this.state = state;
      setStateFunc(state);
    };
    this.createClientMessage = createClientMessage;
    this.state = {};
  }

  handleIniciarTurno = async () => {
    const message = this.createChatBotMessage(
      "¡Hola! Para ayudarte a reservar un turno, necesito algunos datos. ¿En qué sede te gustaría atenderte?",
      {
        widget: "sedesSelector",
      }
    );

    this.setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  handleSedeSelected = async (sedeId: number) => {
    const message = this.createChatBotMessage(
      "Excelente. Ahora, ¿con qué profesional te gustaría atenderte?",
      {
        widget: "profesionalesSelector",
        payload: { sedeId }
      }
    );

    this.setState((prev: any) => ({
      ...prev,
      selectedSede: sedeId,
      messages: [...prev.messages, message],
    }));
  };

  handleProfesionalSelected = async (profesionalId: number) => {
    const message = this.createChatBotMessage(
      "Perfecto. ¿En qué horario te gustaría tu turno?",
      {
        widget: "horariosSelector",
        payload: { profesionalId }
      }
    );

    this.setState((prev: any) => ({
      ...prev,
      selectedProfesional: profesionalId,
      messages: [...prev.messages, message],
    }));
  };

  handleHorarioSelected = async (horario: string) => {
    const message = this.createChatBotMessage(
      `¿Confirmas el turno para ${horario}?`,
      {
        widget: "confirmacionTurno",
        payload: { horario }
      }
    );

    this.setState((prev: any) => ({
      ...prev,
      selectedHorario: horario,
      messages: [...prev.messages, message],
    }));
  };

  async handleMessage(message: string, currentStep: ChatState = 'inicial') {
    try {
      const response = await chatService.handleChat(
        message, 
        currentStep, 
        this.state
      );

      const botMessage = this.createChatBotMessage(response.response); // Cambiado de message a response
      this.updateChatbotState(botMessage);
      
      if (response.nextStep) {
        this.setState((prev: ChatSessionData) => ({
          ...prev,
          currentStep: response.nextStep,
          ...response.data
        }));
      }
    } catch (error) {
      console.error('Error en el chatbot:', error);
      const errorMessage = this.createChatBotMessage(
        'Lo siento, ha ocurrido un error. Por favor, intenta nuevamente.'
      );
      this.updateChatbotState(errorMessage);
    }
  }

  private updateChatbotState(message: any) {
    this.setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
}

export default ActionProvider;