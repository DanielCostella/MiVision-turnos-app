import React, { useState } from 'react';

interface EmailInputProps {
  actionProvider: {
    handleEmailSubmitted: (email: string) => void;
  };
  setState: (state: any) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ actionProvider, setState }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica del email
    if (!email || !email.includes('@')) {
      setError('Por favor, ingresa un email válido');
      return;
    }

    // Actualizar el estado con el email
    setState((prevState: any) => ({
      ...prevState,
      userEmail: email
    }));

    // Continuar con la confirmación del turno
    actionProvider.handleEmailSubmitted(email);
  };

  return (
    <div className="email-input-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Para confirmar el turno, necesitamos tu email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            className="email-input"
            placeholder="ejemplo@email.com"
            required
          />
          {error && <div className="error-message">{error}</div>}
        </div>
        <button type="submit" className="submit-button">
          Continuar
        </button>
      </form>
    </div>
  );
};

export default EmailInput;
