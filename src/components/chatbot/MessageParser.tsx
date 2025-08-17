import React from 'react';

interface MessageParserProps {
  actionProvider: {
    handleSedeSelect: () => void;
    handleProfesionalSelect: (profesional: any) => void;
    handleHelp: () => void;
    handleDefault: () => void;
  };
  state: any;
}

class MessageParser {
  actionProvider: MessageParserProps['actionProvider'];
  state: any;

  constructor(actionProvider: MessageParserProps['actionProvider'], state: any) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message: string) {
    const lowerCase = message.toLowerCase();

    if (lowerCase.includes('turno') || 
        lowerCase.includes('reservar') || 
        lowerCase.includes('agendar')) {
      this.actionProvider.handleSedeSelect(); // Usamos el nombre correcto
    } else if (lowerCase.includes('ayuda') || lowerCase.includes('help')) {
      this.actionProvider.handleHelp();
    } else {
      this.actionProvider.handleDefault();
    }
  }
}

export default MessageParser;