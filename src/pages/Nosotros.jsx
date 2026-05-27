import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Instagram } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Nosotros() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".reveal-nosotros", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-8 md:px-24 max-w-[100rem] mx-auto min-h-[70vh] flex flex-col justify-center">
      <h1 className="text-6xl md:text-8xl font-serif tracking-tighter mb-12 text-[#117C4E] reveal-nosotros">
        Quiénes somos<br/>y por qué lo hacemos.
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="flex flex-col gap-8 text-xl text-[#FBF5E9]/80 font-light leading-relaxed">
          <p className="reveal-nosotros">
            "Alcalá se Mueve" nace en abril de 2026 por un vecino de Alcalá de Guadaíra, que como muchos otros estaba harto de ver cómo el servicio de autobuses de Casal empeora sin que nadie haga nada. Lo que empezó como una queja personal se convirtió en una encuesta anónima, y esa encuesta ha reunido ya a más de 200 vecinos.
          </p>
          <p className="reveal-nosotros">
            No tenemos financiación, no dependemos de ningún partido político ni sindicato. La web la gestiona un amigo de forma altruista, y el tiempo que dedicamos es voluntario.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <p className="text-3xl font-serif text-[#FBF5E9] leading-tight reveal-nosotros">
            Creemos que el transporte público es un derecho, no un favor. Y que solo organizándonos podemos forzar cambios.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 mt-8 reveal-nosotros">
            <a href="#" className="flex items-center justify-center gap-3 px-8 py-4 bg-[#117C4E]/10 border border-[#117C4E] text-[#117C4E] rounded-full hover:bg-[#117C4E]/20 transition-colors">
              <Instagram size={20} />
              <span>@alcalasemueve</span>
            </a>
            <a href="mailto:contacto@alcalasemueve.com" className="flex items-center justify-center gap-3 px-8 py-4 bg-[#117C4E]/10 border border-[#117C4E] text-[#117C4E] rounded-full hover:bg-[#117C4E]/20 transition-colors">
              Escríbenos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
