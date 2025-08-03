class MessageParser {
  actionProvider: any;
  state: any;

  constructor(actionProvider: any, state: any) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message: string) {
    const lowerCase = message.toLowerCase();

    if (lowerCase.includes('turno')) {
      this.actionProvider.handleTurno('');
    }

    if (lowerCase.includes('sede')) {
      // Mostrar lista de sedes
      this.actionProvider.handleSedeSelection(null);
    }
  }
}

export default MessageParser;