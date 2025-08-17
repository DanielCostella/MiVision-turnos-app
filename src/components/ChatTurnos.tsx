import React, { useState, useEffect, useRef } from 'react';
import { chatService } from '../services/chatService';
import type { ChatState, ChatMessage, ChatSessionData } from '../types/chat';
import { v4 as uuidv4 } from 'uuid';

const ChatTurnos: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatState>('inicial');
  const [sessionData, setSessionData] = useState<ChatSessionData>({
    messages: [],
    selectedSede: null,
    selectedProfesional: null,
    selectedFecha: null,
    selectedHorario: undefined,
    profesionales: [],
    currentStep: 'inicial'
  });
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialMessage: ChatMessage = {
      id: uuidv4(),
      text: '¡Hola! Bienvenido al sistema de turnos de MI VISIÓN.',
      isBot: true,
      timestamp: Date.now()
    };

    setMessages([initialMessage]);
    handleInitialStep();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      text: inputMessage,
      isBot: false,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    handleMessage(inputMessage);
  };

  const handleMessage = async (message: string) => {
    try {
      const response = await chatService.handleChat(message, currentStep, sessionData);
      const botResponse: ChatMessage = {
        id: uuidv4(),
        text: response.response,
        isBot: true,
        timestamp: Date.now(),
        widget: response.widget
      };

      setMessages(prev => [...prev, botResponse]);
      
      // Corregimos el primer error - setCurrentStep
      if (response.nextStep) {
        setCurrentStep(response.nextStep); // Ahora solo se ejecuta si nextStep existe
      }

      // Corregimos el segundo error - setSessionData
      if (response.data) {
        setSessionData(prev => ({
          ...prev,
          ...response.data
        }));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const handleFechaSelect = async (fecha: string) => {
    const botResponse: ChatMessage = {
      id: uuidv4(),
      text: `Has seleccionado la fecha: ${fecha}. Ahora, elige un horario disponible:`,
      isBot: true,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, botResponse]);
    setSessionData(prev => ({
      ...prev,
      selectedFecha: fecha,
      currentStep: 'horario'
    }));
    setCurrentStep('horario');
  };

  const handleInitialStep = async () => {
    const initialSessionData: ChatSessionData = {
      messages: [],
      selectedSede: null,
      selectedProfesional: null,
      selectedFecha: null,
      selectedHorario: undefined,
      profesionales: [],
      currentStep: 'inicial'
    };

    try {
      const response = await chatService.handleChat('', 'inicial', initialSessionData);
      
      setMessages(prev => [...prev, {
        id: uuidv4(),
        text: response.response,
        isBot: true,
        timestamp: Date.now(),
        widget: response.widget
      }]);

      // Corregimos el tercer error - manejo de currentStep en setSessionData
      if (response.nextStep) {
        setCurrentStep(response.nextStep);
        
        if (response.data) {
          // Aseguramos que currentStep nunca sea undefined
          setSessionData(prev => ({
            ...prev,
            ...response.data,
            currentStep: response.nextStep || prev.currentStep // Usamos el valor actual si nextStep es undefined
          }));
        }
      }
    } catch (error) {
      console.error('Error en handleInitialStep:', error);
    }
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
            handleSendMessage(e);
          }}
          className="flex space-x-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={getPlaceholderForStep(currentStep)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
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