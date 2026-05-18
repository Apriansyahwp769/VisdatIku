import { useState } from "react";
import { Flag, FileText, Quote, TrendingUp, Download, Lightbulb, ChevronDown } from "lucide-react";

// Data dummy: [tahun][fakultas]
const dummyData = {
  2024: {
    fasilkom: { target: 68.4, totalVol: 145, citation: 8.4, quartiles: { Q1: 35, Q2: 30, Q3: 20, Q4: 15 }, trend: [120, 125, 130, 135, 145] },
    fkip: { target: 55.2, totalVol: 85, citation: 5.2, quartiles: { Q1: 20, Q2: 25, Q3: 30, Q4: 25 }, trend: [70, 75, 78, 82, 85] },
    teknik: { target: 72.1, totalVol: 160, citation: 7.8, quartiles: { Q1: 40, Q2: 25, Q3: 20, Q4: 15 }, trend: [140, 145, 150, 155, 160] },
    ekonomi: { target: 60.5, totalVol: 95, citation: 6.5, quartiles: { Q1: 25, Q2: 30, Q3: 25, Q4: 20 }, trend: [80, 85, 88, 92, 95] },
    kedokteran: { target: 78.9, totalVol: 110, citation: 12.5, quartiles: { Q1: 55, Q2: 20, Q3: 15, Q4: 10 }, trend: [90, 95, 100, 105, 110] }
  },
  2025: {
    fasilkom: { target: 72.1, totalVol: 165, citation: 9.1, quartiles: { Q1: 40, Q2: 30, Q3: 18, Q4: 12 }, trend: [125, 130, 135, 150, 165] },
    fkip: { target: 60.8, totalVol: 98, citation: 5.8, quartiles: { Q1: 25, Q2: 30, Q3: 25, Q4: 20 }, trend: [75, 80, 85, 90, 98] },
    teknik: { target: 75.5, totalVol: 180, citation: 8.2, quartiles: { Q1: 45, Q2: 25, Q3: 18, Q4: 12 }, trend: [145, 150, 160, 170, 180] },
    ekonomi: { target: 65.2, totalVol: 108, citation: 7.1, quartiles: { Q1: 30, Q2: 35, Q3: 20, Q4: 15 }, trend: [85, 90, 95, 100, 108] },
    kedokteran: { target: 82.4, totalVol: 125, citation: 13.2, quartiles: { Q1: 60, Q2: 20, Q3: 12, Q4: 8 }, trend: [95, 100, 110, 118, 125] }
  },
  2026: {
    fasilkom: { target: 76.8, totalVol: 190, citation: 9.8, quartiles: { Q1: 45, Q2: 35, Q3: 12, Q4: 8 }, trend: [130, 140, 150, 170, 190] },
    fkip: { target: 66.5, totalVol: 115, citation: 6.5, quartiles: { Q1: 30, Q2: 35, Q3: 20, Q4: 15 }, trend: [80, 88, 95, 105, 115] },
    teknik: { target: 79.2, totalVol: 205, citation: 8.9, quartiles: { Q1: 50, Q2: 25, Q3: 15, Q4: 10 }, trend: [150, 160, 175, 190, 205] },
    ekonomi: { target: 70.1, totalVol: 125, citation: 7.8, quartiles: { Q1: 35, Q2: 35, Q3: 18, Q4: 12 }, trend: [90, 98, 108, 115, 125] },
    kedokteran: { target: 86.1, totalVol: 142, citation: 14.5, quartiles: { Q1: 65, Q2: 20, Q3: 10, Q4: 5 }, trend: [100, 110, 120, 132, 142] }
  }
};

const faculties = [
  { id: "all", name: "Semua Fakultas" },
  { id: "fasilkom", name: "Fakultas Ilmu Komputer" },
  { id: "fkip", name: "Fakultas Keguruan & Ilmu Pendidikan" },
  { id: "teknik", name: "Fakultas Teknik" },
  { id: "ekonomi", name: "Fakultas Ekonomi & Bisnis" },
  { id: "kedokteran", name: "Fakultas Kedokteran" },
];

const years = [2024, 2025, 2026];

function getAggregatedData(dataByYear, year) {
  const yearData = dataByYear[year];
  const keys = Object.keys(yearData);
  const count = keys.length;

  let totalTarget = 0, totalVol = 0, totalCitation = 0;
  let totalQuartiles = { Q1: 0, Q2: 0, Q3: 0, Q4: 0 };
  let totalTrend = [0, 0, 0, 0, 0];

  keys.forEach(k => {
    const d = yearData[k];
    totalTarget += d.target;
    totalVol += d.totalVol;
    totalCitation += d.citation;
    totalQuartiles.Q1 += d.quartiles.Q1;
    totalQuartiles.Q2 += d.quartiles.Q2;
    totalQuartiles.Q3 += d.quartiles.Q3;
    totalQuartiles.Q4 += d.quartiles.Q4;
    d.trend.forEach((val, i) => totalTrend[i] += val);
  });

  return {
    target: Math.round((totalTarget / count) * 10) / 10,
    totalVol: totalVol, // Sum for total university output
    citation: Math.round((totalCitation / count) * 10) / 10,
    quartiles: {
      Q1: Math.round(totalQuartiles.Q1 / count),
      Q2: Math.round(totalQuartiles.Q2 / count),
      Q3: Math.round(totalQuartiles.Q3 / count),
      Q4: Math.round(totalQuartiles.Q4 / count)
    },
    trend: totalTrend.map(v => Math.round(v / count))
  };
}

export default function PublikasiInternasional() {
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [selectedYear, setSelectedYear] = useState(2024);

  const yearData = dummyData[selectedYear];
  const currentData = selectedFaculty === "all" 
    ? getAggregatedData(dummyData, selectedYear)
    : yearData[selectedFaculty];

  // Normalize trend for SVG chart (max value ~200)
  const maxTrend = Math.max(...currentData.trend);
  const points = currentData.trend.map((val, i) => {
    const x = (i / 4) * 300;
    const y = 100 - ((val / (maxTrend * 1.2)) * 100); // 1.2 buffer
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="space-y-6">
      <div className="mt-5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Publikasi Internasional Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitoring Key Performance Indicator 6: Scopus and Web of Science Indexed Publications</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)} className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                {faculties.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-500">Menampilkan data untuk:</span>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">{faculties.find(f => f.id === selectedFaculty)?.name}</span>
        <span className="text-gray-400">•</span>
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full font-medium">Tahun {selectedYear}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3"><div><h3 className="font-semibold text-gray-900">Target Achievement</h3><p className="text-sm text-gray-500">Percentage of Total Publications</p></div><div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><Flag className="w-5 h-5 text-blue-700" /></div></div>
          <div className="flex items-end gap-3 mb-3"><span className="text-3xl font-bold text-gray-900">{currentData.target}%</span><span className="flex items-center gap-1 bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full text-xs font-bold mb-1"><TrendingUp className="w-3 h-3" /> 4.2%</span></div>
          <div className="relative pt-2"><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-900 h-2 rounded-full transition-all duration-500" style={{ width: `${currentData.target}%` }}></div></div><span className="absolute right-0 -top-5 text-xs text-gray-500">Target: 75%</span></div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3"><div><h3 className="font-semibold text-gray-900">Total Indexed Volume</h3><p className="text-sm text-gray-500">Scopus & WoS Combined</p></div><div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><FileText className="w-5 h-5 text-blue-700" /></div></div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{currentData.totalVol.toLocaleString()}</div>
          <p className="text-sm text-gray-500">Articles published in current academic year.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3"><div><h3 className="font-semibold text-gray-900">Citation Impact</h3><p className="text-sm text-gray-500">Average Citations per Paper</p></div><div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center"><Quote className="w-5 h-5 text-teal-700" /></div></div>
          <div className="flex items-end gap-3 mb-1"><span className="text-3xl font-bold text-gray-900">{currentData.citation}</span><span className="bg-teal-400 text-white px-2 py-0.5 rounded-full text-xs font-bold mb-1">99</span></div>
          <p className="text-sm text-gray-500">Above global average for similar institutions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-1">Distribution by Quartile</h3>
          <p className="text-sm text-gray-500 mb-6">Scopus SJR Journal Rankings</p>
          <div className="flex gap-1 h-4 rounded-full overflow-hidden bg-gray-100 mb-6">
            <div className="bg-blue-900 h-full" style={{ width: `${currentData.quartiles.Q1}%` }}></div>
            <div className="bg-blue-600 h-full" style={{ width: `${currentData.quartiles.Q2}%` }}></div>
            <div className="bg-teal-500 h-full" style={{ width: `${currentData.quartiles.Q3}%` }}></div>
            <div className="bg-gray-400 h-full" style={{ width: `${currentData.quartiles.Q4}%` }}></div>
          </div>
          <div className="space-y-3">
            {[{ q: "Q1", val: currentData.quartiles.Q1, color: "bg-blue-900" }, { q: "Q2", val: currentData.quartiles.Q2, color: "bg-blue-600" }, { q: "Q3", val: currentData.quartiles.Q3, color: "bg-teal-500" }, { q: "Q4", val: currentData.quartiles.Q4, color: "bg-gray-400" }].map(item => (
              <div key={item.q} className="flex items-center justify-between text-sm"><span className="font-medium text-gray-700">{item.q}</span><div className="flex items-center gap-3 w-2/3"><div className="flex-1 bg-gray-100 rounded-full h-2"><div className={`${item.color} h-2 rounded-full transition-all duration-500`} style={{ width: `${item.val}%` }}></div></div><span className="w-8 text-right text-gray-900 font-bold">{item.val}%</span></div></div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6"><div><h3 className="font-semibold text-gray-900">Publication Growth</h3><p className="text-sm text-gray-500">5-Year Historical Trend</p></div><div className="flex items-center gap-2 text-xs"><span className="w-3 h-3 rounded-full bg-blue-900"></span> Total Pubs</div></div>
          <div className="relative h-40 bg-gray-50 rounded-lg overflow-hidden flex items-end px-4 pb-4">
            <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 300 100" preserveAspectRatio="none">
              <polyline points={points} fill="none" stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <polygon points={`0,100 ${points} 300,100`} fill="#1e3a8a" opacity="0.1" />
            </svg>
            <div className="flex justify-between w-full text-xs text-gray-500 relative z-10"><span>2022</span><span>2023</span><span>2024</span><span>2025</span><span>2026</span></div>
          </div>
        </div>
      </div>

      <div className="bg-blue-900 rounded-xl p-8 text-white shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-blue-800 flex items-center justify-center flex-shrink-0"><Lightbulb className="w-8 h-8 text-blue-200" /></div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">Research Quality & Impact Insight</h3>
          <p className="text-blue-100 text-sm leading-relaxed">
            {selectedFaculty === 'all' 
              ? `Secara keseluruhan universitas, tren publikasi Q1 meningkat signifikan. Rata-rata sitasi mencapai ${currentData.citation}, didorong oleh kolaborasi internasional di bidang ${currentData.quartiles.Q1 > 40 ? 'Teknologi & Kesehatan' : 'Pendidikan & Sosial'}.` 
              : `Fakultas ini menunjukkan dominasi di kuartil Q1 (${currentData.quartiles.Q1}%). Pertumbuhan konsisten terlihat dalam 5 tahun terakhir, mencerminkan kualitas riset yang semakin matang.`}
          </p>
        </div>
        <button className="bg-white text-blue-900 px-6 py-3 rounded-lg text-sm font-bold hover:bg-blue-50 transition flex-shrink-0">Download Full Report</button>
      </div>
    </div>
  );
}