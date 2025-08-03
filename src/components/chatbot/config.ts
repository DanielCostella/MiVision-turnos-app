import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import TurnosWidget from './widgets/TurnosWidget';
import { Config } from './types';

const botName = 'MI VISIÓN Bot';

const config: Config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage('¡Hola! Soy el asistente virtual de MI VISIÓN', {}), // Agregamos el segundo argumento
    createChatBotMessage('¿En qué puedo ayudarte?', {}) // Agregamos el segundo argumento
  ],
  widgets: [
    {
      widgetName: 'turnos',
      widgetFunc: (props: any) => React.createElement(TurnosWidget, { ...props }),
      props: {},
      mapStateToProps: ['turnos']
    }
  ],
  state: {
    turnos: []
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E'
    },
    chatButton: {
      backgroundColor: '#5ccc9d'
    }
  }
};

export default config;