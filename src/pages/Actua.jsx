import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Actua() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray(".reveal-item");
      reveals.forEach((item) => {
        gsap.fromTo(item, 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const toggleAccordion = (e) => {
    const content = e.currentTarget.nextElementSibling;
    const icon = e.currentTarget.querySelector(".icon-chevron");
    
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      icon.style.transform = "rotate(0deg)";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      icon.style.transform = "rotate(180deg)";
    }
  };

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-8 md:px-24 max-w-[100rem] mx-auto text-[#011B11]">
      
      {/* ENCUESTA SECTION */}
      <section className="mb-32">
        <h1 className="text-6xl md:text-8xl font-serif tracking-tighter mb-8 text-[#117C4E] reveal-item">
          Pasa a la Acción
        </h1>
        <p className="text-xl text-[#011B11]/80 font-light max-w-3xl mb-12 reveal-item">
          La encuesta es anónima. Tardas unos 3 minutos. Cuantas más respuestas, más presión podremos ejercer. Comparte este enlace con otros vecinos.
        </p>
        
        <div className="w-full h-[700px] bg-white rounded-2xl flex items-center justify-center relative overflow-hidden reveal-item shadow-sm border border-[#117C4E]/20">
          <iframe 
            src="about:blank" 
            className="w-full h-full opacity-10"
            frameBorder="0"
            title="Formulario Alcalá se Mueve"
          ></iframe>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
            <span className="bg-[#117C4E] text-[#FBF5E9] px-6 py-3 rounded-full font-medium tracking-widest uppercase text-sm shadow-lg mb-4">
              [Falta Enlace de Incrustar (Embed)]
            </span>
          </div>
        </div>
      </section>

      {/* GUIA PARA RECLAMAR */}
      <section>
        <div className="reveal-item mb-12">
          <h2 className="text-4xl md:text-6xl font-serif tracking-tighter mb-6 text-[#117C4E]">
            Guía para Reclamar
          </h2>
          <p className="text-[#011B11]/70 text-lg font-light max-w-2xl">
            Presentar una queja oficial es un derecho. Aquí te explicamos cómo hacerlo ante cada administración. No necesitas ser abogado, solo seguir estos pasos.
          </p>
        </div>

        <div className="flex flex-col gap-4 reveal-item">
          {/* ACORDEON 1 */}
          <div className="bg-[#117C4E]/10 border border-[#117C4E]/30 rounded-xl overflow-hidden">
            <button onClick={toggleAccordion} className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-[#117C4E]/20 transition-colors">
              <span className="text-xl font-serif text-[#011B11]">1. Ayuntamiento de Alcalá de Guadaíra</span>
              <ChevronDown className="icon-chevron text-[#117C4E] transition-transform duration-300" />
            </button>
            <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
              <div className="p-8 pt-0 text-[#011B11]/80 font-light border-t border-[#117C4E]/20 mt-2">
                <p className="mb-4"><strong className="text-[#117C4E]">Vía presencial (recomendada):</strong> Acude al Registro General en Calle Rafael Santos, 6. Lleva tu escrito con tus datos, la incidencia clara, y pide que te sellen una copia.</p>
                <p><strong className="text-[#117C4E]">Vía telemática:</strong> A través de la Sede Electrónica buscando "Instancia General".</p>
              </div>
            </div>
          </div>

          {/* ACORDEON 2 */}
          <div className="bg-[#117C4E]/10 border border-[#117C4E]/30 rounded-xl overflow-hidden">
            <button onClick={toggleAccordion} className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-[#117C4E]/20 transition-colors">
              <span className="text-xl font-serif text-[#011B11]">2. Consorcio de Transporte Metropolitano</span>
              <ChevronDown className="icon-chevron text-[#117C4E] transition-transform duration-300" />
            </button>
            <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
              <div className="p-8 pt-0 text-[#011B11]/80 font-light border-t border-[#117C4E]/20 mt-2">
                <p className="mb-4">Avda. Cristo de la Expiración, 2 – 41002 Sevilla.</p>
                <p className="text-red-600 font-medium">Atención: El sistema telemático suele fallar ("no hay trámites disponibles"). Recomendamos hacerlo presencial o por correo certificado.</p>
              </div>
            </div>
          </div>

          {/* ACORDEON 3 */}
          <div className="bg-[#117C4E]/10 border border-[#117C4E]/30 rounded-xl overflow-hidden">
            <button onClick={toggleAccordion} className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-[#117C4E]/20 transition-colors">
              <span className="text-xl font-serif text-[#011B11]">3. Junta de Andalucía</span>
              <ChevronDown className="icon-chevron text-[#117C4E] transition-transform duration-300" />
            </button>
            <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
              <div className="p-8 pt-0 text-[#011B11]/80 font-light border-t border-[#117C4E]/20 mt-2">
                <p className="mb-4">Es la vía más formal a través del Libro de Sugerencias y Reclamaciones.</p>
                <a href="#" className="inline-flex items-center gap-2 text-[#117C4E] hover:underline font-medium">
                  Ventanilla Electrónica <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
