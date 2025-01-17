import { Link, useLocation } from 'react-router-dom';

const VerificationPage = () => {
  const location = useLocation();
  const email = location.state?.email; // Obtener el email del estado

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-green-500 mb-4">Felicitaciones!</h1>
        <p className="text-lg text-gray-700 mb-4">Ya creaste tu cuenta, solo falta verificar tu email.</p>
        <p className="text-gray-600 mb-6">
          Te hemos enviado un correo de verificación. Haz clic en el enlace del correo para completar el registro.
        </p>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            ¿No has recibido el correo? 
            <a href={`mailto:${email}`} className="text-blue-500 hover:underline">
              Reenviar correo
            </a>
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600">
            Si ya has verificado tu correo, 
            <Link to="/login" className="text-blue-500 hover:underline">inicia sesión aquí</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
