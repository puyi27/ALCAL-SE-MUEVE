import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Quote } from 'lucide-react';

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vScm__hZw61CrXEInoebghnZVI6VL_0AGNBMSuDfBOHzlldlN9IdXdtPK3HrrbcIP9XgACx_9gQEzTK/pub?output=csv";

export default function TestimonialFeed() {
  const [testimonios, setTestimonios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

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
              // Filtrar respuestas cortas o irrelevantes ("no", "ninguna")
              if (text.length > 25 && text.toLowerCase() !== 'no' && text.toLowerCase() !== 'ninguna') {
                extraidos.push({
                  texto: text,
                  barrio: row[barrioKey] ? row[barrioKey].trim() : "Alcalá"
                });
              }
            }
          });

          // Most recent first
          setTestimonios(extraidos.reverse());
          setLoading(false);
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      }
    });
  }, []);

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

  const visibleTestimonios = testimonios.slice(0, visibleCount);

  return (
    <div className="w-full mt-24">
      <div className="mb-12 text-center">
        <span className="inline-block px-4 py-1 bg-[#117C4E]/10 text-[#117C4E] rounded-full text-sm font-bold tracking-widest uppercase mb-4">
          Testimonios Reales
        </span>
        <h4 className="text-4xl md:text-5xl font-serif text-[#011B11] mb-6">La Voz de los Vecinos</h4>
        <p className="text-[#011B11]/70 font-light max-w-xl mx-auto">
          Anécdotas reales recopiladas de forma anónima a través de nuestra encuesta. Si ves algo inapropiado, será moderado y eliminado.
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 w-full">
        {visibleTestimonios.map((t, idx) => (
          <div key={idx} className="break-inside-avoid mb-8 bg-white p-8 rounded-3xl border border-[#117C4E]/10 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between">
            <Quote className="absolute -top-4 -right-4 w-24 h-24 text-[#117C4E]/5 -rotate-12" strokeWidth={1} />
            <p className="text-[#011B11]/80 font-light italic leading-relaxed mb-8 relative z-10 text-lg">
              "{t.texto}"
            </p>
            <div className="flex items-center gap-4 relative z-10 border-t border-[#117C4E]/10 pt-6 mt-auto">
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

      {visibleCount < testimonios.length && (
        <div className="mt-12 flex justify-center">
          <button 
            onClick={() => setVisibleCount(prev => prev + 12)}
            className="px-8 py-4 border-2 border-[#117C4E] text-[#117C4E] font-medium uppercase tracking-[0.2em] rounded-full hover:bg-[#117C4E] hover:text-[#FBF5E9] transition-colors"
          >
            Cargar más testimonios
          </button>
        </div>
      )}
    </div>
  );
}
