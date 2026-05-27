import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquareWarning } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Actualidad() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".timeline-item", 
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".timeline",
            start: "top 85%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const news = [
    {
      date: "23 de mayo de 2026",
      source: "Autocares Casal (app)",
      content: "Horario especial de Feria con servicios nocturnos los días 21 y 24 de abril, pero sin refuerzos diurnos.",
      comment: "Los refuerzos son solo para la madrugada, el resto del día el horario es el mismo que un día laborable normal. No se ha aumentado la frecuencia en horas punta."
    },
    {
      date: "20 de enero de 2026",
      source: "FACUA Sevilla",
      content: "Queja formal ante el Consorcio por el deficiente servicio de las líneas M-121 y M-122, con esperas de hasta 40 minutos y autobuses que pasan llenos.",
      comment: "A día de hoy no ha habido respuesta del Consorcio. Nuestra encuesta demuestra que el problema persiste."
    }
  ];

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-8 md:px-24 max-w-[100rem] mx-auto text-[#011B11]">
      
      <section className="dark-zone mb-32 bg-[#117C4E] text-[#FBF5E9] p-12 md:p-16 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-12 shadow-lg">
        <div className="flex flex-col gap-6 w-full md:w-2/3">
          <MessageSquareWarning size={48} strokeWidth={1} />
          <h2 className="text-4xl md:text-6xl font-serif tracking-tighter">Únete a nuestra Comunidad</h2>
          <p className="text-lg font-light">
            Es la forma más rápida y sencilla de enterarte de incidencias en tiempo real. Los propios usuarios avisan cuando el bus va lleno o lleva retraso.
          </p>
        </div>
        <a href="#" className="w-full md:w-auto px-10 py-5 bg-[#011B11] text-[#FBF5E9] text-center font-medium uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform whitespace-nowrap shadow-md">
          Entrar al Telegram
        </a>
      </section>

      <section>
        <h2 className="text-4xl md:text-6xl font-serif tracking-tighter mb-6 text-[#117C4E]">
          Comunicados Oficiales
        </h2>
        <p className="text-xl text-[#011B11]/80 font-light max-w-3xl mb-16">
          Recopilamos aquí los anuncios oficiales de las entidades responsables, para que puedas contrastarlos con lo que ocurre en la calle.
        </p>

        <div className="timeline border-l-2 border-[#117C4E]/30 pl-8 ml-4 flex flex-col gap-16">
          {news.map((item, idx) => (
            <div key={idx} className="timeline-item relative">
              <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#117C4E] border-4 border-[#FBF5E9]"></span>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold tracking-widest uppercase text-[#117C4E]">{item.date}</span>
                  <span className="text-xs px-2 py-1 bg-[#117C4E]/10 text-[#117C4E] rounded-md font-medium">{item.source}</span>
                </div>
                <p className="text-xl text-[#011B11] font-medium leading-relaxed">
                  {item.content}
                </p>
                <div className="mt-4 p-6 bg-white border-l-4 border-[#117C4E] text-[#011B11]/70 italic font-light shadow-sm rounded-r-xl">
                  <strong className="block text-[#117C4E] not-italic mb-2 text-sm uppercase tracking-wider font-bold">Comentario de la plataforma</strong>
                  {item.comment}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
