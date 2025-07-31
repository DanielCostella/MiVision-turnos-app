import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Loader2 } from 'lucide-react';

interface SedeInfo {
  direccion: string;
  telefono: string;
  email: string;
  horarios: {
    semana: string;
    sabado: string;
  };
  coordenadas: {
    lat: number;
    lng: number;
  };
}

const sedeInfo: SedeInfo = {
  direccion: "Capetillo 540, Maipú, Mendoza",
  telefono: "+54 261-XXX-XXXX",
  email: "contacto@mivision.com",
  horarios: {
    semana: "Lunes a Viernes: 9:00 - 18:00",
    sabado: "Sábados: 9:00 - 13:00"
  },
  coordenadas: {
    lat: -32.9777,
    lng: -68.7807
  }
};

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  mensaje?: string;
}

const Ubicacion: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Limpiar error cuando el usuario comienza a escribir
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setSubmitStatus('idle');

    try {
      // Aquí irá la llamada al backend
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulación
      setSubmitStatus('success');
      setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Codificar la dirección para la URL
  const encodedAddress = encodeURIComponent(sedeInfo.direccion);

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          ¿Dónde encontrarnos?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          {/* Información de contacto */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Información de contacto
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-700">Dirección</h4>
                  <p className="text-gray-600">{sedeInfo.direccion}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-700">Teléfono</h4>
                  <p className="text-gray-600">{sedeInfo.telefono}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-700">Email</h4>
                  <p className="text-gray-600">{sedeInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-700">Horarios de atención</h4>
                  <p className="text-gray-600">{sedeInfo.horarios.semana}</p>
                  <p className="text-gray-600">{sedeInfo.horarios.sabado}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="bg-white p-4 rounded-lg shadow-md h-[400px]">
            <iframe
              title="Ubicación Mi Visión"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAMFNNCqhjIcw2YK08XENLCif4yuPOvfKI&q=${encodedAddress}`}
              className="w-full h-full rounded-lg"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        
        {/* Formulario de Contacto */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Envíanos un mensaje
          </h3>
          
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                id="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="telefono" className="block text-gray-700 font-medium mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.telefono && (
                <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-2">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                rows={4}
                value={formData.mensaje}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  ${errors.mensaje ? 'border-red-500' : 'border-gray-300'}`}
                required
              ></textarea>
              {errors.mensaje && (
                <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>
              )}
            </div>
            
            <div className="relative">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg
                         hover:bg-blue-700 duration-300
                         disabled:bg-blue-400 disabled:cursor-not-allowed
                         transform active:scale-95 transition-transform`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  'Enviar mensaje'
                )}
              </button>
            </div>

            {/* Mensajes de estado */}
            {submitStatus === 'success' && (
              <div className="text-green-500 text-center font-medium animate-fade-in">
                ¡Mensaje enviado con éxito!
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="text-red-500 text-center font-medium animate-fade-in">
                Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Ubicacion;