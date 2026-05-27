import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend 
} from 'recharts';

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vScm__hZw61CrXEInoebghnZVI6VL_0AGNBMSuDfBOHzlldlN9IdXdtPK3HrrbcIP9XgACx_9gQEzTK/pub?output=csv";

// Theme Colors
const COLORS = ['#117C4E', '#1B4D3E', '#2E8B57', '#3CB371', '#8FBC8F', '#20B2AA'];

export default function LiveCharts() {
  const [data, setData] = useState({
    freq: [],
    motivo: [],
    problemas: [],
    totalRespuestas: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        try {
          const rows = results.data.filter(row => row["Marca temporal"]); // Filter out empty rows
          
          // 1. Frecuencia
          const freqMap = {};
          // 2. Motivos
          const motivoMap = {};
          // 3. Problemas
          const problemasMap = {};

          rows.forEach(row => {
            // Find keys that match our questions (doing it this way avoids exact string matching issues with weird spaces)
            const keys = Object.keys(row);
            const freqKey = keys.find(k => k.toLowerCase().includes("frecuencia utilizas"));
            const motivoKey = keys.find(k => k.toLowerCase().includes("motivo de tu viaje"));
            const probKey = keys.find(k => k.toLowerCase().includes("problema más grave"));

            if (freqKey && row[freqKey]) {
              freqMap[row[freqKey]] = (freqMap[row[freqKey]] || 0) + 1;
            }
            if (motivoKey && row[motivoKey]) {
              motivoMap[row[motivoKey]] = (motivoMap[row[motivoKey]] || 0) + 1;
            }
            if (probKey && row[probKey]) {
              const probs = row[probKey].split(',').map(p => p.trim()).filter(Boolean);
              probs.forEach(p => {
                problemasMap[p] = (problemasMap[p] || 0) + 1;
              });
            }
          });

          // Format for Recharts
          const formatData = (map) => Object.entries(map)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value); // Sort descending

          setData({
            freq: formatData(freqMap),
            motivo: formatData(motivoMap),
            problemas: formatData(problemasMap).slice(0, 6), // Top 6 problems
            totalRespuestas: rows.length
          });
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      },
      error: (err) => {
        setError(err.message);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-24 flex flex-col items-center justify-center text-[#117C4E]">
        <div className="w-12 h-12 border-4 border-[#117C4E]/20 border-t-[#117C4E] rounded-full animate-spin mb-4"></div>
        <p className="font-medium tracking-widest uppercase text-sm">Cargando datos en tiempo real...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-24 text-center text-red-600">
        <p>Error cargando los datos: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-12 text-center">
        <span className="inline-block px-4 py-1 bg-[#117C4E]/10 text-[#117C4E] rounded-full text-sm font-bold tracking-widest uppercase mb-4">
          Datos en Directo
        </span>
        <h4 className="text-3xl font-serif text-[#011B11]">
          Basado en {data.totalRespuestas} respuestas de vecinos
        </h4>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* GRÁFICO 1: FRECUENCIA */}
        <div className="bg-white rounded-2xl p-8 border border-[#117C4E]/10 shadow-sm flex flex-col items-center">
          <h5 className="text-xl font-bold text-[#011B11] mb-6">Frecuencia de Uso</h5>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.freq}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {data.freq.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#011B11', fontWeight: 'bold' }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICO 2: MOTIVOS */}
        <div className="bg-white rounded-2xl p-8 border border-[#117C4E]/10 shadow-sm flex flex-col items-center">
          <h5 className="text-xl font-bold text-[#011B11] mb-6">Motivo Principal del Viaje</h5>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.motivo}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {data.motivo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GRÁFICO 3: PROBLEMAS MÁS GRAVES */}
        <div className="bg-white rounded-2xl p-8 border border-[#117C4E]/10 shadow-sm flex flex-col col-span-1 lg:col-span-2">
          <h5 className="text-xl font-bold text-[#011B11] mb-6 text-center">Top 6: Problemas Más Graves</h5>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.problemas}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
              >
                <XAxis type="number" hide />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={250} 
                  tick={{ fontSize: 12, fill: '#011B11' }}
                  axisLine={false}
                  tickLine={false}
                />
                <RechartsTooltip 
                  cursor={{fill: 'rgba(17, 124, 78, 0.05)'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#117C4E" 
                  radius={[0, 8, 8, 0]} 
                  animationDuration={1500}
                  barSize={30}
                >
                  {data.problemas.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
