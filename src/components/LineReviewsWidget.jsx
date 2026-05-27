import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { MessageSquareQuote, Bus } from 'lucide-react';

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vScm__hZw61CrXEInoebghnZVI6VL_0AGNBMSuDfBOHzlldlN9IdXdtPK3HrrbcIP9XgACx_9gQEzTK/pub?output=csv";

export default function LineReviewsWidget() {
  const [reviewsByLine, setReviewsByLine] = useState({
    '121': [],
    '122': [],
    '123': []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        try {
          const rows = results.data.filter(row => row["Marca temporal"]);
          
          let specific121 = [];
          let specific122 = [];
          let specific123 = [];
          let general = [];

          rows.forEach(row => {
            const keys = Object.keys(row);
            const anecKey = keys.find(k => k.toLowerCase().includes("anécdota"));
            const barrioKey = keys.find(k => k.toLowerCase().includes("barrio"));
            
            if (anecKey && row[anecKey] && row[anecKey].length > 15) {
              const text = row[anecKey].trim();
              const barrio = row[barrioKey] ? row[barrioKey].trim() : "Alcalá";
              
              if (text.toLowerCase() !== 'no' && text.toLowerCase() !== 'ninguna') {
                const item = { text, barrio };
                if (text.includes("121")) specific121.push(item);
                else if (text.includes("122")) specific122.push(item);
                else if (text.includes("123")) specific123.push(item);
                else general.push(item);
              }
            }
          });

          // Mezclar arrays
          const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());
          specific121 = shuffle(specific121);
          specific122 = shuffle(specific122);
          specific123 = shuffle(specific123);
          general = shuffle(general);

          // Rellenar hasta tener 3 por línea, cogiendo de los generales si faltan
          const fillTo3 = (specific) => {
            const result = [...specific];
            while (result.length < 3 && general.length > 0) {
              result.push(general.pop());
            }
            return result.slice(0, 3);
          };

          setReviewsByLine({
            '121': fillTo3(specific121),
            '122': fillTo3(specific122),
            '123': fillTo3(specific123)
          });
          
          setLoading(false);
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      }
    });
  }, []);

  const lines = [
    { id: '121', name: "M-121", route: "Alcalá - Sevilla (Centro)", color: "bg-red-500", text: "text-red-400" },
    { id: '122', name: "M-122", route: "Alcalá - Sevilla (Directo)", color: "bg-orange-500", text: "text-orange-400" },
    { id: '123', name: "M-123", route: "Alcalá - UPO", color: "bg-red-600", text: "text-red-500" },
  ];

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-6 relative z-10 mt-12 md:mt-0 opacity-50">
        <div className="bg-[#011B11]/80 backdrop-blur-md rounded-3xl p-8 border border-[#117C4E]/30 w-full shadow-2xl h-[500px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#117C4E] border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 relative z-10 mt-12 md:mt-0">
      <div className="bg-[#011B11]/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-[#117C4E]/30 w-full shadow-2xl overflow-hidden flex flex-col h-[600px]">
        
        {/* Cabecera */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#FBF5E9]/10 shrink-0">
          <h3 className="text-xl font-bold text-[#FBF5E9] flex items-center gap-3">
            <MessageSquareQuote className="w-6 h-6 text-[#117C4E]" />
            Testimonios por Línea
          </h3>
        </div>

        {/* Contenedor en 3 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1 overflow-y-auto custom-scrollbar pr-2 pb-4">
          {lines.map((line) => (
            <div key={line.id} className="flex flex-col gap-4">
              {/* Etiqueta de la línea */}
              <div className="flex items-center gap-3 mb-2 sticky top-0 bg-[#011B11]/90 backdrop-blur-sm py-2 z-10 border-b border-[#FBF5E9]/10">
                <span className={`w-3 h-3 rounded-full ${line.color} shadow-[0_0_8px_rgba(0,0,0,0.5)]`} />
                <div className="flex flex-col">
                  <span className={`font-bold leading-none ${line.text}`}>{line.name}</span>
                  <span className="text-[#FBF5E9]/50 text-xs mt-1">{line.route}</span>
                </div>
              </div>

              {/* Las 3 reseñas */}
              <div className="flex flex-col gap-4">
                {reviewsByLine[line.id].map((review, idx) => (
                  <div key={idx} className="bg-[#FBF5E9]/5 p-5 rounded-2xl hover:bg-[#FBF5E9]/10 transition-colors border border-[#FBF5E9]/5 flex flex-col h-full">
                    <p className="text-[#FBF5E9]/90 font-light italic text-sm leading-relaxed mb-4 flex-1">
                      "{review.text.length > 150 ? review.text.substring(0, 150) + "..." : review.text}"
                    </p>
                    <div className="flex justify-end items-center gap-2 mt-auto">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#117C4E]"></div>
                      <span className="text-[#FBF5E9]/40 text-[10px] font-medium uppercase tracking-wider">
                        {review.barrio}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
