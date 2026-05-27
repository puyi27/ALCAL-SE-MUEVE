import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { MessageSquareQuote } from 'lucide-react';

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vScm__hZw61CrXEInoebghnZVI6VL_0AGNBMSuDfBOHzlldlN9IdXdtPK3HrrbcIP9XgACx_9gQEzTK/pub?output=csv";

export default function LineReviewsWidget() {
  const [reviews, setReviews] = useState({
    'M-121': 'Buscando opiniones recientes...',
    'M-122': 'Buscando opiniones recientes...',
    'M-123': 'Buscando opiniones recientes...'
  });

  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        try {
          const rows = results.data.filter(row => row["Marca temporal"]);
          
          let r121 = null;
          let r122 = null;
          let r123 = null;

          // Buscar de las más recientes hacia atrás
          for (let i = rows.length - 1; i >= 0; i--) {
            const row = rows[i];
            const keys = Object.keys(row);
            const anecKey = keys.find(k => k.toLowerCase().includes("anécdota"));
            
            if (anecKey && row[anecKey] && row[anecKey].length > 15) {
              const text = row[anecKey];
              // Cortar el texto si es muy largo para que quepa bien en el widget
              const truncate = (str) => str.length > 75 ? str.substring(0, 75) + "..." : str;

              if (text.includes("121") && !r121) r121 = `"${truncate(text)}"`;
              if (text.includes("122") && !r122) r122 = `"${truncate(text)}"`;
              if (text.includes("123") && !r123) r123 = `"${truncate(text)}"`;
            }
          }

          setReviews({
            'M-121': r121 || '"Siempre va colapsada en horas punta..."',
            'M-122': r122 || '"No se cumplen los horarios establecidos..."',
            'M-123': r123 || '"Faltan muchísimos autobuses para la UPO..."'
          });
        } catch (err) {
          console.error(err);
        }
      }
    });
  }, []);

  const lines = [
    { name: "M-121", route: "Alcalá - Sevilla (Centro)", color: "bg-red-500" },
    { name: "M-122", route: "Alcalá - Sevilla (Directo)", color: "bg-orange-500" },
    { name: "M-123", route: "Alcalá - UPO", color: "bg-red-600" },
  ];

  return (
    <div className="w-full flex flex-col gap-6 relative z-10 mt-12 md:mt-0">
      <div className="bg-[#011B11]/80 backdrop-blur-md rounded-3xl p-8 border border-[#117C4E]/30 w-full shadow-2xl">
        <h3 className="text-xl font-bold text-[#FBF5E9] mb-6 flex items-center gap-3">
          <MessageSquareQuote className="w-6 h-6 text-[#117C4E]" />
          Últimas Reseñas
        </h3>
        <div className="flex flex-col gap-5">
          {lines.map((line, idx) => (
            <div key={idx} className="flex flex-col border-b border-[#FBF5E9]/10 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center gap-3 mb-2">
                <span className={`w-3 h-3 rounded-full ${line.color} animate-pulse shadow-[0_0_8px_rgba(0,0,0,0.5)]`} />
                <div className="flex flex-col">
                  <span className="text-[#FBF5E9] font-medium leading-none">{line.name}</span>
                  <span className="text-[#FBF5E9]/50 text-xs mt-1">{line.route}</span>
                </div>
              </div>
              <p className="text-[#FBF5E9]/80 font-light italic text-sm pl-6 border-l-2 border-[#117C4E]/50 ml-1">
                {reviews[line.name]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
