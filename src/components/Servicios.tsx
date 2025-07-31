import React from 'react';
import { 
  Eye, 
  Stethoscope, 
  FileSearch, 
  UserCog 
} from 'lucide-react';

interface Servicio {
  titulo: string;
  descripcion: string;
  icono: React.ReactElement;
}

const servicios: Servicio[] = [
  {
    titulo: "Consultas Oftalmológicas",
    descripcion: "Atención personalizada con profesionales especializados",
    icono: <FileSearch className="w-8 h-8 text-blue-200" strokeWidth={1.5} />
  },
  {
    titulo: "Estudios de Diagnóstico",
    descripcion: "Tecnología de última generación para resultados precisos",
    icono: <Stethoscope className="w-8 h-8 text-blue-200" strokeWidth={1.5} />
  },
  {
    titulo: "Cirugías",
    descripcion: "Procedimientos avanzados con máxima seguridad",
    icono: <Eye className="w-8 h-8 text-blue-200" strokeWidth={1.5} />
  },
  {
    titulo: "Tratamientos Personalizados",
    descripcion: "Soluciones adaptadas a tus necesidades específicas",
    icono: <UserCog className="w-8 h-8 text-blue-200" strokeWidth={1.5} />
  }
];

const Servicios: React.FC = () => {
  return (
    <section
      id="servicios"
      className="relative w-full py-20 lg:py-32"
      style={{
        backgroundImage: "url('/mivision-servicios.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-blue-900/80" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-light">
            Brindamos servicios oftalmológicos integrales con tecnología de vanguardia 
            y un equipo profesional comprometido con tu salud visual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicios.map((servicio, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 transform 
                       hover:scale-105 transition-all duration-300 hover:bg-white/20"
            >
              <div className="flex justify-center mb-4">
                {servicio.icono}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center">
                {servicio.titulo}
              </h3>
              <p className="text-white/80 text-center">
                {servicio.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Servicios;