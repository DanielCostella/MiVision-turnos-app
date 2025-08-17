import { ChatState, ChatSessionData } from '../../types/chat';
import { Sede, Profesional } from '../../types/index';

interface ActionProviderState extends ChatSessionData {
  messages: any[];
  selectedSede: Sede | null;
  selectedProfesional: Profesional | null;
  selectedFecha: string | null;
  selectedHorario?: string;
  profesionales: Profesional[];
  currentStep: ChatState;
  userEmail?: string;
}

class ActionProvider {
  private state: ActionProviderState;

  constructor(
    private createChatBotMessage: any,
    private setState: any,
    private createClientMessage: any
  ) {
    this.state = {
      messages: [],
      selectedSede: null,
      selectedProfesional: null,
      selectedFecha: null,
      selectedHorario: undefined,
      userEmail: undefined,
      profesionales: [],
      currentStep: 'inicial'
    };
  }

  // Método para iniciar el flujo de turnos
  handleSedeSelect = () => {
    const message = this.createChatBotMessage(
      "¡Claro! Te ayudo a reservar un turno. Por favor, selecciona una sede:",
      {
        widget: "sedesSelector",
      }
    );

    this.setState((prev: ActionProviderState) => ({
      ...prev,
      messages: [...prev.messages, message],
      currentStep: 'sede'
    }));
  };

  // Método cuando se selecciona una sede
  handleSedeSelected = async (sede: Sede) => {
    try {
      const message = this.createChatBotMessage(
        `Has seleccionado ${sede.nombre}. Por favor, elige un profesional:`,
        {
          widget: "profesionalesSelector",
        }
      );

      this.setState((prev: ActionProviderState) => ({
        ...prev,
        selectedSede: sede,
        messages: [...prev.messages, message],
        currentStep: 'profesional'
      }));
    } catch (error) {
      console.error('Error:', error);
      this.updateChatbotState(
        this.createChatBotMessage('Lo siento, hubo un error. Por favor, intenta nuevamente.')
      );
    }
  };

  // Método cuando se selecciona un profesional
  handleProfesionalSelected = async (profesional: Profesional) => {
    const message = this.createChatBotMessage(
      `Has seleccionado al ${profesional.nombre} ${profesional.apellido}. Por favor, selecciona una fecha para tu turno:`,
      {
        widget: "fechaSelector",
      }
    );

    this.setState((prev: ActionProviderState) => ({
      ...prev,
      selectedProfesional: profesional,
      messages: [...prev.messages, message],
      currentStep: 'fecha'
    }));
  };

  // Método cuando se selecciona una fecha
  handleFechaSelect = (fecha: string) => {
    const message = this.createChatBotMessage(
      `Has seleccionado la fecha ${fecha}. Por favor, elige un horario disponible:`,
      {
        widget: "horariosSelector",
      }
    );

    this.setState((prev: ActionProviderState) => ({
      ...prev,
      selectedFecha: fecha,
      messages: [...prev.messages, message],
      currentStep: 'horario'
    }));
  };

  // Método cuando se selecciona un horario
  handleHorarioSelect = (horario: string) => {
    const message = this.createChatBotMessage(
      `Has seleccionado el horario ${horario}. Por favor, ingresa tu email para enviarte la confirmación:`,
      {
        widget: "emailInput",
      }
    );

    this.setState((prev: ActionProviderState) => ({
      ...prev,
      selectedHorario: horario,
      messages: [...prev.messages, message],
      currentStep: 'email'
    }));
  };

  // Método para confirmar el turno
  handleEmailInput = () => {
    const message = this.createChatBotMessage(
      "Para confirmar tu turno, necesitamos tu email:",
      {
        widget: "emailInput",
      }
    );

    this.setState((prev: ActionProviderState) => ({
      ...prev,
      messages: [...prev.messages, message],
      currentStep: 'email'
    }));
  };

  handleEmailSubmitted = (email: string) => {
    this.setState((prev: ActionProviderState) => {
      // Primero guardamos los datos actualizados
      const updatedState = {
        ...prev,
        userEmail: email,
        currentStep: 'confirmacion'
      };

      // Creamos el mensaje usando los datos del estado actualizado
      const message = this.createChatBotMessage(
        `Por favor, confirma los siguientes datos:\n\n` +
        `📍 Sede: ${updatedState.selectedSede?.nombre}\n` +
        `👨‍⚕️ Profesional: ${updatedState.selectedProfesional?.nombre} ${updatedState.selectedProfesional?.apellido}\n` +
        `📅 Fecha: ${updatedState.selectedFecha}\n` +
        `🕒 Horario: ${updatedState.selectedHorario}\n` +
        `📧 Email: ${email}\n`,
        {
          widget: "confirmacionTurno",
        }
      );

      // Retornamos el estado actualizado con el nuevo mensaje
      return {
        ...updatedState,
        messages: [...updatedState.messages, message]
      };
    });
  };

  handleTurnoConfirmado = () => {
    const message = this.createChatBotMessage(
      `¡Tu turno ha sido confirmado!\n\n` +
      `📍 Sede: ${this.state.selectedSede?.nombre}\n` +
      `👨‍⚕️ Profesional: ${this.state.selectedProfesional?.nombre} ${this.state.selectedProfesional?.apellido}\n` +
      `� Fecha: ${this.state.selectedFecha}\n` +
      `🕒 Horario: ${this.state.selectedHorario}\n` +
      `📧 Te enviaremos la confirmación a: ${this.state.userEmail}\n\n` +
      `Por favor, revisa tu email para más detalles.`
    );

    this.setState((prev: ActionProviderState) => ({
      ...prev,
      messages: [...prev.messages, message],
      currentStep: 'finalizado'
    }));
  };

  // Método para manejar errores
  handleError = (errorMessage: string) => {
    const message = this.createChatBotMessage(errorMessage);
    this.updateChatbotState(message);
  };

  // Método para cancelar el turno
  handleCancelarTurno = () => {
    const message = this.createChatBotMessage(
      "Has cancelado la reserva del turno. ¿Deseas intentar nuevamente?"
    );

    this.setState((prev: ActionProviderState) => ({
      ...prev,
      messages: [...prev.messages, message],
      selectedSede: null,
      selectedProfesional: null,
      selectedHorario: undefined,
      currentStep: 'inicial'
    }));
  };

  handleHelp = () => {
    const message = this.createChatBotMessage(
      "Puedo ayudarte con:\n- Reservar un turno\n- Consultar tus turnos\n- Información sobre nuestros servicios"
    );
    this.updateChatbotState(message);
  };

  handleDefault = () => {
    const message = this.createChatBotMessage(
      "No entiendo tu consulta. ¿Quieres reservar un turno o necesitas ayuda?"
    );
    this.updateChatbotState(message);
  };

  private updateChatbotState = (message: any) => {
    this.setState((prev: ActionProviderState) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
}

export default ActionProvider;

