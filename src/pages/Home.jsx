import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronRight, Bus, Users, Clock, AlertTriangle, Route } from "lucide-react";
import { Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import LineReviewsWidget from "../components/LineReviewsWidget";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".parallax-bg", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      const revealWrappers = gsap.utils.toArray(".reveal-wrapper");
      revealWrappers.forEach((wrapper) => {
        const text = wrapper.querySelector(".reveal-text");
        gsap.fromTo(text, 
          { y: "110%", rotation: 2 },
          {
            y: "0%",
            rotation: 0,
            ease: "expo.out",
            duration: 1.8,
            scrollTrigger: {
              trigger: wrapper,
              start: "top 90%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      gsap.to(".marquee-inner", {
        xPercent: -50,
        ease: "none",
        duration: 15,
        repeat: -1,
      });

      gsap.from(".status-row", {
        opacity: 0,
        x: -20,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".status-section",
          start: "top 85%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section className="hero-section relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden dark-zone">
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#011B11]">
          <div 
            className="parallax-bg w-full h-[125%] bg-cover bg-center will-change-transform opacity-60 mix-blend-luminosity"
            style={{ backgroundImage: "url('/protesta/hero-bus.jpg')", transform: "translateZ(0)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#011B11]/40 via-[#011B11]/80 to-[#011B11]" />
        </div>
        
        <div className="relative z-10 text-center px-4 w-full max-w-7xl flex flex-col items-center mt-12">
          <div className="overflow-hidden mb-6">
            <span className="block text-[#117C4E] text-xs md:text-sm uppercase tracking-[0.4em] font-medium bg-[#FBF5E9] px-4 py-1 rounded-full shadow-sm">
              Plataforma Ciudadana
            </span>
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-serif text-[#FBF5E9] tracking-tighter leading-[0.85] w-full drop-shadow-2xl" style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            Dignidad en<br />el Transporte
          </h1>
          
          <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/actua" className="px-8 py-4 bg-[#117C4E] text-[#FBF5E9] font-medium uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-lg">
              Participa en la encuesta
              <ArrowRight size={18} />
            </Link>
            <Link to="/el-problema" className="px-8 py-4 bg-[#FBF5E9] text-[#011B11] font-medium uppercase tracking-[0.2em] rounded-full hover:bg-[#FBF5E9]/90 transition-colors flex items-center justify-center gap-3 shadow-lg">
              Ver resultados
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#FBF5E9]/70 flex flex-col items-center gap-4 z-10 opacity-70">
          <span className="text-[10px] uppercase tracking-[0.3em]">Nuestra Protesta</span>
          <div className="w-[1px] h-16 bg-[#FBF5E9]/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[#117C4E] animate-bounce-slow" />
          </div>
        </div>
      </section>

      <div className="dark-zone w-full bg-[#117C4E] text-[#FBF5E9] py-4 border-y border-[#011B11]/10 overflow-hidden flex items-center">
        <div className="marquee-inner flex whitespace-nowrap min-w-[200%]">
          <span className="text-sm md:text-lg uppercase tracking-[0.3em] font-medium px-8">TRANSPORTE DIGNO YA • NO MÁS ESPERAS • ALCALÁ SE MUEVE •</span>
          <span className="text-sm md:text-lg uppercase tracking-[0.3em] font-medium px-8">TRANSPORTE DIGNO YA • NO MÁS ESPERAS • ALCALÁ SE MUEVE •</span>
          <span className="text-sm md:text-lg uppercase tracking-[0.3em] font-medium px-8">TRANSPORTE DIGNO YA • NO MÁS ESPERAS • ALCALÁ SE MUEVE •</span>
          <span className="text-sm md:text-lg uppercase tracking-[0.3em] font-medium px-8">TRANSPORTE DIGNO YA • NO MÁS ESPERAS • ALCALÁ SE MUEVE •</span>
        </div>
      </div>

      <section className="py-32 md:py-48 px-8 md:px-24 max-w-[100rem] mx-auto bg-[#FBF5E9] text-[#011B11]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
          <div className="md:col-span-4 flex flex-col gap-8 justify-start">
            <Megaphone strokeWidth={0.5} className="w-16 h-16 text-[#117C4E]" />
            <h2 className="text-4xl md:text-6xl font-serif leading-none tracking-tighter text-[#117C4E]">
              Alcalá<br />se planta.
            </h2>
          </div>
          <div className="md:col-span-8 flex flex-col gap-12 md:gap-16 pt-4">
            <div className="reveal-wrapper overflow-hidden">
              <p className="reveal-text text-3xl md:text-5xl tracking-tighter leading-[1.2] font-serif text-[#011B11]">
                Somos un grupo de vecinos sin afiliación política, hartos del mal servicio de autobuses de Autocares Casal.
              </p>
            </div>
            <div className="reveal-wrapper overflow-hidden">
              <p className="reveal-text text-lg md:text-xl text-[#011B11]/70 font-light max-w-2xl leading-relaxed">
                Hemos canalizado el malestar de más de 200 usuarios a través de una encuesta anónima. Nuestro objetivo es presionar al Consorcio de Transportes, a la Junta de Andalucía y al Ayuntamiento para que exijan mejoras reales.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="dark-zone status-section py-20 px-8 md:px-24 w-full bg-[#011B11] text-[#FBF5E9]">
        <div className="max-w-[100rem] mx-auto flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-1/3 flex flex-col justify-center">
             <div className="reveal-wrapper overflow-hidden mb-6">
                <span className="reveal-text block text-xs uppercase tracking-[0.3em] font-medium text-[#117C4E]">
                  Testimonios Reales
                </span>
             </div>
             <div className="reveal-wrapper overflow-hidden mb-8">
                <h3 className="reveal-text text-4xl md:text-6xl tracking-tighter font-serif text-[#FBF5E9] leading-[1]">
                  La Voz<br/>de Alcalá.
                </h3>
             </div>
             <p className="text-[#FBF5E9]/60 font-light max-w-sm leading-relaxed mb-8">
               Miles de vecinos sufren a diario las deficiencias de Autocares Casal. Lee sus experiencias y únete a nuestra comunidad de Telegram para organizarnos y exigir un cambio real.
             </p>
             <div className="flex flex-col gap-5">
               <a href="#" className="w-fit text-[#117C4E] pb-1 border-b border-[#117C4E] hover:opacity-80 uppercase tracking-widest text-sm font-medium">
                 Unirse a Telegram
               </a>
               <a href="https://www.autocarescasal.com/noticias-lineas-regulares" target="_blank" rel="noopener noreferrer" className="w-fit text-[#FBF5E9]/50 pb-1 border-b border-[#FBF5E9]/30 hover:text-[#FBF5E9] hover:border-[#FBF5E9] uppercase tracking-widest text-xs transition-colors">
                 Ver incidencias oficiales (Casal)
               </a>
             </div>
          </div>
          
          <div className="w-full md:w-2/3 flex flex-col items-end">
            <LineReviewsWidget />
          </div>
        </div>
      </section>

      <section className="py-24 px-8 md:px-24 bg-[#FBF5E9] text-[#011B11]">
        <div className="max-w-[100rem] mx-auto">
          <div className="reveal-wrapper overflow-hidden mb-12">
            <h2 className="reveal-text text-4xl md:text-6xl font-serif tracking-tighter text-[#117C4E]">
              Descubre el Portal
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/el-problema" className="dark-zone group bg-[#011B11] text-[#FBF5E9] p-10 rounded-3xl flex flex-col justify-between aspect-square md:aspect-auto md:h-[400px] hover:bg-[#117C4E] transition-colors overflow-hidden relative">
              <div className="z-10">
                <span className="text-xs uppercase tracking-[0.2em] mb-4 block text-[#117C4E] group-hover:text-[#FBF5E9]/70">01 / Los Datos</span>
                <h3 className="text-4xl font-serif tracking-tighter mb-4">La Problemática</h3>
                <p className="font-light opacity-80 line-clamp-3">40 minutos de retraso, autobuses llenos que pasan de largo... Conoce los datos reales que la encuesta ha revelado.</p>
              </div>
              <div className="z-10 mt-8 flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                <span className="uppercase tracking-widest text-sm font-medium">Ver Informe</span>
                <ArrowRight size={16} />
              </div>
              <div className="absolute -bottom-10 -right-10 text-[#FBF5E9]/5 group-hover:text-[#011B11]/10 transition-colors">
                <Megaphone size={200} />
              </div>
            </Link>

            <Link to="/actua" className="dark-zone group bg-[#117C4E] text-[#FBF5E9] p-10 rounded-3xl flex flex-col justify-between aspect-square md:aspect-auto md:h-[400px] hover:bg-[#011B11] transition-colors">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] mb-4 block text-[#011B11] group-hover:text-[#117C4E]">02 / Participa</span>
                <h3 className="text-4xl font-serif tracking-tighter mb-4">Guía para Reclamar y Encuesta</h3>
                <p className="font-light opacity-80 line-clamp-3">Te explicamos paso a paso cómo poner una queja oficial en Ayuntamiento, Junta y Consorcio. Además, rellena nuestra encuesta.</p>
              </div>
              <div className="mt-8 flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                <span className="uppercase tracking-widest text-sm font-medium">Pasa a la Acción</span>
                <ArrowRight size={16} />
              </div>
            </Link>

            <div className="flex flex-col gap-6 h-[400px]">
              <Link to="/directorio" className="group flex-1 bg-[#117C4E]/10 border border-[#117C4E]/20 p-8 rounded-3xl flex flex-col justify-center hover:bg-[#117C4E]/20 transition-colors">
                <span className="text-xs uppercase tracking-[0.2em] mb-2 block text-[#117C4E]">03 / Contactos</span>
                <h3 className="text-2xl font-serif tracking-tighter text-[#011B11] flex items-center gap-2">
                  Directorio Oficial <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </h3>
              </Link>
              <Link to="/actualidad" className="group flex-1 bg-[#117C4E]/10 border border-[#117C4E]/20 p-8 rounded-3xl flex flex-col justify-center hover:bg-[#117C4E]/20 transition-colors">
                <span className="text-xs uppercase tracking-[0.2em] mb-2 block text-[#117C4E]">04 / Novedades</span>
                <h3 className="text-2xl font-serif tracking-tighter text-[#011B11] flex items-center gap-2">
                  Comunicados <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
