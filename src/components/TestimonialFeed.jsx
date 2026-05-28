import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Quote } from 'lucide-react';

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vScm__hZw61CrXEInoebghnZVI6VL_0AGNBMSuDfBOHzlldlN9IdXdtPK3HrrbcIP9XgACx_9gQEzTK/pub?output=csv";

export default function TestimonialFeed() {
  const [testimonios, setTestimonios] = useState([]);
  const [loading, setLoading] = useState(true);

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

      <div className="w-full relative px-4 md:px-8">
        <div 
          className="grid grid-rows-1 md:grid-rows-2 grid-flow-col gap-6 overflow-x-auto pb-12 snap-x snap-mandatory custom-scrollbar"
          style={{ gridAutoColumns: "minmax(300px, 400px)" }}
        >
          {testimonios.map((t, idx) => (
            <div key={idx} className="snap-start bg-white p-8 rounded-3xl border border-[#117C4E]/10 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between h-[350px]">
              <Quote className="absolute -top-4 -right-4 w-24 h-24 text-[#117C4E]/5 -rotate-12" strokeWidth={1} />
              
              <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar pr-2 mb-4">
                <p className="text-[#011B11]/80 font-light italic leading-relaxed text-lg">
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
        
        {/* Indicadores de desvanecimiento lateral para sugerir que hay más scroll */}
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#FBF5E9] to-transparent pointer-events-none z-20"></div>
        <div className="absolute top-0 left-0 w-8 md:w-16 h-full bg-gradient-to-r from-[#FBF5E9] to-transparent pointer-events-none z-20"></div>
      </div>
    </div>
  );
}
