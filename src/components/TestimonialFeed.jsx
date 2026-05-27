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
          
          const extraidos = [];
          
          rows.forEach(row => {
            const keys = Object.keys(row);
            // Search for the open text anecdote column
            const anecKey = keys.find(k => k.toLowerCase().includes("anécdota"));
            // Find neighborhood
            const barrioKey = keys.find(k => k.toLowerCase().includes("barrio"));

            if (anecKey && row[anecKey] && row[anecKey].trim().length > 10) {
              extraidos.push({
                texto: row[anecKey],
                barrio: row[barrioKey] || "Alcalá"
              });
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonios.map((t, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl border border-[#117C4E]/10 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
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
    </div>
  );
}
