import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock3, Bus, MapPin, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ElProblema() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray(".counter-value");
      counters.forEach((counter) => {
        const targetValue = parseInt(counter.getAttribute("data-target"));
        gsap.to(counter, {
          innerHTML: targetValue,
          duration: 2.5,
          ease: "power3.out",
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
          }
        });
      });

      const reveals = gsap.utils.toArray(".reveal-text");
      reveals.forEach((text) => {
        gsap.fromTo(text, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-8 md:px-24 max-w-[100rem] mx-auto">
      {/* NARRATIVE SECTION */}
      <section className="mb-32">
        <h1 className="text-6xl md:text-8xl font-serif tracking-tighter mb-12 text-[#117C4E] reveal-text">
          La Problemática
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif mb-8 text-[#FBF5E9] leading-tight reveal-text">
              El autobús que no pasa, que llega tarde, que va lleno...
            </h2>
            <p className="text-lg text-[#FBF5E9]/70 leading-relaxed font-light mb-6 reveal-text">
              Llevamos años soportando un servicio que no está a la altura de una ciudad de 75.000 habitantes.
            </p>
          </div>
          <div className="flex flex-col gap-6 text-[#FBF5E9]/80 font-light reveal-text">
            <div className="border-l border-[#117C4E] pl-6 py-2">
              <strong className="block text-[#FBF5E9] mb-1">Retrasos crónicos</strong>
              <p>Esperas de hasta 40 minutos sin ninguna explicación oficial en las paradas.</p>
            </div>
            <div className="border-l border-[#117C4E] pl-6 py-2">
              <strong className="block text-[#FBF5E9] mb-1">Hacinamiento</strong>
              <p>Autobuses que pasan de largo por ir completamente llenos, dejando a vecinos tirados.</p>
            </div>
            <div className="border-l border-[#117C4E] pl-6 py-2">
              <strong className="block text-[#FBF5E9] mb-1">Aislamiento nocturno</strong>
              <p>El último urbano sale sobre las 21:00. Si trabajas o estudias de noche, no puedes volver.</p>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS SECTION */}
      <section className="mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Respuestas Ciudadanas", value: "200", prefix: "+", icon: <Users size={32} /> },
            { label: "Minutos de retraso medio", value: "40", suffix: "m", icon: <Clock3 size={32} /> },
            { label: "Buses al día (M-123)", value: "4", icon: <Bus size={32} /> },
            { label: "Frecuencia Urbana (Línea D)", value: "60", suffix: "m", icon: <MapPin size={32} /> },
          ].map((metric, idx) => (
            <div key={idx} className="bg-[#117C4E]/10 border border-[#117C4E]/30 p-8 rounded-2xl flex flex-col justify-between reveal-text">
              <div className="text-[#117C4E] mb-8">{metric.icon}</div>
              <div>
                <div className="text-5xl font-serif text-[#FBF5E9] mb-2 flex items-end">
                  {metric.prefix && <span className="text-3xl mr-1">{metric.prefix}</span>}
                  <span className="counter-value" data-target={metric.value}>0</span>
                  {metric.suffix && <span className="text-3xl ml-1">{metric.suffix}</span>}
                </div>
                <span className="text-sm uppercase tracking-[0.1em] text-[#FBF5E9]/60">{metric.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EMBEDDED RESULTS */}
      <section className="reveal-text">
        <h3 className="text-3xl md:text-5xl font-serif tracking-tighter mb-8 text-[#117C4E]">
          Resultados en Vivo
        </h3>
        <p className="text-[#FBF5E9]/70 mb-12 max-w-2xl">
          Estos gráficos se actualizan automáticamente cada vez que alguien responde la encuesta. Son datos reales aportados por los usuarios en el día a día.
        </p>
        <div className="w-full h-[600px] bg-[#117C4E]/5 border border-[#117C4E]/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
          {/* TODO: SUSTITUIR EL SRC POR EL ENLACE REAL DE RESULTADOS PÚBLICOS DE GOOGLE FORMS */}
          <iframe 
            src="about:blank" 
            title="Resultados Encuesta"
            className="w-full h-full opacity-50"
            frameBorder="0"
          ></iframe>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="bg-[#011B11] text-[#117C4E] px-6 py-3 rounded-full border border-[#117C4E] font-medium tracking-widest uppercase text-sm">
              [TODO: Insertar Iframe de Resultados]
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
