import React, { useEffect, useState, useRef } from 'react';
import Papa from 'papaparse';
import { MessageSquareQuote, Star } from 'lucide-react';

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vScm__hZw61CrXEInoebghnZVI6VL_0AGNBMSuDfBOHzlldlN9IdXdtPK3HrrbcIP9XgACx_9gQEzTK/pub?output=csv";

export default function LineReviewsWidget() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        try {
          const rows = results.data.filter(row => row["Marca temporal"]);
          const realReviews = [];

          // Extraer todas las reseñas reales
          rows.forEach(row => {
            const keys = Object.keys(row);
            const anecKey = keys.find(k => k.toLowerCase().includes("anécdota"));
            const barrioKey = keys.find(k => k.toLowerCase().includes("barrio"));
            
            if (anecKey && row[anecKey] && row[anecKey].length > 15) {
              const text = row[anecKey].trim();
              const barrio = row[barrioKey] ? row[barrioKey].trim() : "Alcalá";
              
              // Evitar respuestas basura
              if (text.toLowerCase() !== 'no' && text.toLowerCase() !== 'ninguna') {
                realReviews.push({ text, barrio });
              }
            }
          });

          // Mezclar el array para que siempre salgan distintas al cargar
          const shuffled = realReviews.sort(() => 0.5 - Math.random());
          // Coger unas 10 para el carrusel
          setReviews(shuffled.slice(0, 10));
          setLoading(false);
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      }
    });
  }, []);

  if (loading || reviews.length === 0) {
    return (
      <div className="w-full flex flex-col gap-6 relative z-10 mt-12 md:mt-0 opacity-50">
        <div className="bg-[#011B11]/80 backdrop-blur-md rounded-3xl p-8 border border-[#117C4E]/30 w-full shadow-2xl h-[400px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#117C4E] border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 relative z-10 mt-12 md:mt-0">
      <div className="bg-[#011B11]/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-[#117C4E]/30 w-full shadow-2xl overflow-hidden flex flex-col h-[400px]">
        
        {/* Cabecera del Widget */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#FBF5E9]/10 shrink-0">
          <h3 className="text-xl font-bold text-[#FBF5E9] flex items-center gap-3">
            <MessageSquareQuote className="w-6 h-6 text-[#117C4E]" />
            Testimonios Reales
          </h3>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-[#117C4E] fill-[#117C4E]" />)}
          </div>
        </div>

        {/* Contenedor del Carrusel Vertical (Marquee) */}
        <div className="relative flex-1 overflow-hidden">
          {/* Sombras superior e inferior para efecto de desvanecimiento */}
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#011B11] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#011B11] to-transparent z-10 pointer-events-none" />
          
          {/* Track animado. Usamos CSS en linea para una animación infinita simple */}
          <div className="flex flex-col gap-4 animate-marquee-vertical">
            {/* Duplicamos la lista para crear el efecto infinito sin cortes */}
            {[...reviews, ...reviews].map((review, idx) => (
              <div key={idx} className="bg-[#FBF5E9]/5 p-4 rounded-2xl border border-[#117C4E]/20 hover:bg-[#FBF5E9]/10 transition-colors">
                <p className="text-[#FBF5E9]/90 font-light italic text-sm leading-relaxed mb-3 line-clamp-3">
                  "{review.text}"
                </p>
                <div className="flex justify-end items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#117C4E] animate-pulse"></div>
                  <span className="text-[#FBF5E9]/50 text-xs font-medium uppercase tracking-wider">
                    {review.barrio}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
