import React, { useState } from 'react';

const ResendVerificationPage = () => {
  const [email, setEmail] = useState('');

  const handleResend = () => {
    // Lógica para reenviar el correo de verificación
    alert(`Se ha reenviado el correo de verificación a: ${email}`);
  };

  return (
    <div className="verification-container">
      <div className="verification-message">
        <h1>Reenviar correo de verificación</h1>
        <input 
          type="email" 
          placeholder="Ingresa tu email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleResend}>Reenviar correo</button>
      </div>
    </div>
  );
};

export default ResendVerificationPage;
