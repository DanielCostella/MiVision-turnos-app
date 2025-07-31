import React from 'react';

export const Home: React.FC = () => {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="/mivision-portada2.jpg"
          alt="Mi Visión Centro Oftalmológico"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </div>
      {/* Cambiamos pt-64 por pt-96 para bajar más el texto */}
      <div className="relative z-10 flex flex-col items-center h-full text-white px-4 pt-96">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 text-center 
                      bg-clip-text text-transparent bg-gradient-to-r 
                      from-blue-400 via-blue-300 to-cyan-300 
                      drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]
                      tracking-wide leading-tight">
          Tu Centro Oftalmológico <br/> de Confianza
        </h2>
        <p className="text-sm md:text-base text-center max-w-2xl mb-8 
                     text-blue-200 font-medium tracking-wide
                     drop-shadow-[0_2px_1px_rgba(0,0,0,0.8)]">
          Especialistas en el cuidado integral de tu visión <br/>
          con tecnología de última generación
        </p>
        
      </div>
    </section>
  );
};