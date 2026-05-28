import React, { useEffect, useState, useRef } from 'react';
import Papa from 'papaparse';
import { Quote } from 'lucide-react';

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vScm__hZw61CrXEInoebghnZVI6VL_0AGNBMSuDfBOHzlldlN9IdXdtPK3HrrbcIP9XgACx_9gQEzTK/pub?output=csv";

export default function TestimonialFeed() {
  const [testimonios, setTestimonios] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        try {
          const rows = results.data.filter(row => row["Marca temporal"]);
          
          let extraidos = [];
          
          rows.forEach(row => {
            const keys = Object.keys(row);
            const anecKey = keys.find(k => k.toLowerCase().includes("anécdota"));
            const barrioKey = keys.find(k => k.toLowerCase().includes("barrio"));

            if (anecKey && row[anecKey]) {
              const text = row[anecKey].trim();
              if (text.length > 25 && text.toLowerCase() !== 'no' && text.toLowerCase() !== 'ninguna') {
                extraidos.push({
                  texto: text,
                  barrio: row[barrioKey] ? row[barrioKey].trim() : "Alcalá"
                });
              }
            }
          });

          setTestimonios(extraidos.reverse());
          setLoading(false);
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      }
    });
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (testimonios.length === 0) return;

    let animationId;
    let isInteracting = false;
    let scrollPos = 0;
    
    const slider = scrollRef.current;
    if (!slider) return;

    const autoScroll = () => {
      if (!isInteracting) {
         scrollPos += 0.5; // Velocidad del scroll automático
         
         if (scrollPos >= slider.scrollWidth / 2) {
            scrollPos = 0;
         }
         slider.scrollLeft = scrollPos;
      } else {
         scrollPos = slider.scrollLeft;
      }
      animationId = requestAnimationFrame(autoScroll);
    };
    
    autoScroll();
    
    const handleInteractStart = () => isInteracting = true;
    const handleInteractEnd = () => {
      isInteracting = false;
      // Actualizar la posición para que no salte al soltar
      if (slider) scrollPos = slider.scrollLeft;
    };
    
    slider.addEventListener('touchstart', handleInteractStart, { passive: true });
    slider.addEventListener('touchend', handleInteractEnd);
    
    let wheelTimeout;
    const handleWheel = () => {
       isInteracting = true;
       clearTimeout(wheelTimeout);
       wheelTimeout = setTimeout(handleInteractEnd, 150);
    };
    slider.addEventListener('wheel', handleWheel, { passive: true });

    let isDown = false;
    let startX;
    let startScrollLeft;

    const onMouseDown = (e) => {
      isDown = true;
      isInteracting = true;
      slider.style.cursor = 'grabbing';
      startX = e.pageX - slider.offsetLeft;
      startScrollLeft = slider.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
      isInteracting = false;
      slider.style.cursor = 'grab';
    };
    const onMouseUp = () => {
      isDown = false;
      isInteracting = false;
      slider.style.cursor = 'grab';
    };
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = startScrollLeft - walk;
    };

    slider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('mouseleave', onMouseLeave);
    slider.addEventListener('mouseup', onMouseUp);
    slider.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      slider.removeEventListener('touchstart', handleInteractStart);
      slider.removeEventListener('touchend', handleInteractEnd);
      slider.removeEventListener('wheel', handleWheel);
      
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mouseleave', onMouseLeave);
      slider.removeEventListener('mouseup', onMouseUp);
      slider.removeEventListener('mousemove', onMouseMove);
    }
  }, [testimonios.length]);

  if (loading) {
    return (
      <div className="w-full py-12 flex justify-center text-[#117C4E]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#117C4E] border-t-transparent"></div>
      </div>
    );
  }

  if (testimonios.length === 0) {
    return null; 
  }

  // Duplicamos los testimonios para el loop infinito
  const CAROUSEL_ITEMS = [...testimonios, ...testimonios];

  return (
    <div className="w-full mt-24 overflow-hidden relative">
      <div className="mb-12 text-center px-4">
        <span className="inline-block px-4 py-1 bg-[#117C4E]/10 text-[#117C4E] rounded-full text-sm font-bold tracking-widest uppercase mb-4">
          Testimonios Reales
        </span>
        <h4 className="text-4xl md:text-5xl font-serif text-[#011B11] mb-6">La Voz de los Vecinos</h4>
        <p className="text-[#011B11]/70 font-light max-w-xl mx-auto">
          Desliza para leer todas las anécdotas recopiladas de forma anónima.
        </p>
      </div>

      <div className="w-full relative group">
        <div 
          ref={scrollRef}
          className="flex w-full overflow-x-auto py-12 cursor-grab"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none' 
          }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            div::-webkit-scrollbar { display: none; }
          `}} />

          {CAROUSEL_ITEMS.map((t, idx) => (
            <div key={idx} className="w-[85vw] md:w-[400px] flex-shrink-0 mx-4 bg-white p-8 rounded-3xl border border-[#117C4E]/10 shadow-sm relative overflow-hidden flex flex-col justify-between h-[350px] transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
              <Quote className="absolute -top-4 -right-4 w-24 h-24 text-[#117C4E]/5 -rotate-12" strokeWidth={1} />
              
              <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar pr-2 mb-4 pointer-events-none">
                <p className="text-[#011B11]/80 font-light italic leading-relaxed text-lg pointer-events-auto">
                  "{t.texto}"
                </p>
              </div>

              <div className="flex items-center gap-4 relative z-10 border-t border-[#117C4E]/10 pt-4 shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#117C4E] flex items-center justify-center text-[#FBF5E9] font-serif text-lg">
                  {t.barrio.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-[#011B11] font-bold text-sm tracking-wide">
                    Vecino/a Anónimo
                  </span>
                  <span className="text-[#117C4E]/80 font-light text-xs uppercase tracking-wider">
                    {t.barrio}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Indicadores de desvanecimiento lateral */}
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#FBF5E9] to-transparent pointer-events-none z-20"></div>
        <div className="absolute top-0 left-0 w-8 md:w-16 h-full bg-gradient-to-r from-[#FBF5E9] to-transparent pointer-events-none z-20"></div>
      </div>
    </div>
  );
}
