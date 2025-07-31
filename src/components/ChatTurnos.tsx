import React, { useState, useEffect, useRef } from 'react';
import { chatService } from '../services/chatService';
import type { ChatState, ChatMessage, ChatSessionData } from '../types/chat';
import { v4 as uuidv4 } from 'uuid';

const ChatTurnos: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<ChatState>('inicial');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionData, setSessionData] = useState<ChatSessionData>({});
  const [input, setInput] = useState(''); // Agregamos estado para el input
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mensaje inicial del bot
    const initialMessage: ChatMessage = {
      id: uuidv4(),
      text: '¡Hola! Bienvenido al sistema de turnos de MI VISIÓN.',
      isBot: true,
      timestamp: Date.now()
    };

    setMessages([initialMessage]);
    handleInitialStep();
  }, []);

  const handleSend = () => { // Agregamos función handleSend
    if (input.trim()) {
      handleUserMessage(input.trim());
      setInput('');
    }
  };

  const handleUserMessage = async (message: string) => {
    // Mensaje del usuario
    const userMessage: ChatMessage = {
      id: uuidv4(),
      text: message,
      isBot: false,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const { response, nextStep, data } = await chatService.handleChat(
        message,
        currentStep,
        sessionData
      );

      // Respuesta del bot
      const botResponse: ChatMessage = {
        id: uuidv4(),
        text: response,
        isBot: true,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botResponse]);
      setCurrentStep(nextStep as ChatState);
      setSessionData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInitialStep = async () => {
    const response = await chatService.handleChat('', 'inicial', {});
    setMessages(prev => [...prev, {
      id: uuidv4(),
      text: response.response,
      isBot: true,
      timestamp: Date.now() // Cambiamos Date a number
    }]);

    setCurrentStep(response.nextStep);
    setSessionData(response.data);
  };

  // Función para formatear el timestamp
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.sort((a, b) => a.timestamp - b.timestamp).map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.isBot ? 'text-left' : 'text-right'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-[80%] ${
                !message.isBot
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              {message.text}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {formatTimestamp(message.timestamp)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={getPlaceholderForStep(currentStep)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-700"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

const getPlaceholderForStep = (step: ChatState): string => {
  switch (step) {
    case 'inicial':
      return 'Escribe tu mensaje';
    case 'sede':
      return 'Escribe tu sede';
    case 'profesional':
      return 'Escribe el profesional';
    case 'fecha':
      return 'Escribe tu fecha preferida';
    case 'horario':
      return 'Elige un horario';
    case 'confirmacion':
      return 'Confirma tu turno (Si/No)';
    default:
      return 'Escribe tu mensaje';
  }
};

export default ChatTurnos;

/* Pruebas a realizar:

1. **Prueba inicial**:
   - Clic en "Solicitar Turno"
   - Verificar que aparece mensaje de bienvenida
   - Esperar respuesta "¿En qué sede te gustaría atenderte?"

2. **Prueba de sede**:
   - Escribir "Centro"
   - Verificar que pide profesional

3. **Prueba de profesional**:
   - Escribir "Dr. García"
   - Verificar que pide fecha

4. **Prueba de fecha**:
   - Escribir fecha
   - Verificar horarios disponibles

5. **Prueba de confirmación**:
   - Confirmar turno
   - Verificar mensaje final
*/