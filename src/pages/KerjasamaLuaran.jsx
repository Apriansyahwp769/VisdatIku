import { useState } from "react";
import { 
  Building2, Landmark, Rocket, FileBarChart, 
  Lightbulb, Download, ChevronDown, Globe 
} from "lucide-react";

// Data dummy: [tahun][fakultas]
const dummyData = {
  2024: {
    fasilkom: {
      outputRatio: 2.4, outputRatioTarget: 3.0,
      effectiveness: "Industry collaborations remain the most effective...",
      chartData: { collab: 65, output: 85 },
      partners: { industry: 45, gov: 30, ngo: 25, totalAgreements: 142 },
      insights: { region: "Tech Hubs (SG/JKT)", focus: "AI Research" }
    },
    fkip: {
      outputRatio: 1.8, outputRatioTarget: 2.5,
      effectiveness: "School partnerships drive community impact...",
      chartData: { collab: 80, output: 60 },
      partners: { industry: 20, gov: 60, ngo: 20, totalAgreements: 195 },
      insights: { region: "Sumatra Schools", focus: "Teacher Training" }
    },
    teknik: {
      outputRatio: 2.8, outputRatioTarget: 3.2,
      effectiveness: "Heavy industry links boost patent filings...",
      chartData: { collab: 55, output: 90 },
      partners: { industry: 70, gov: 20, ngo: 10, totalAgreements: 110 },
      insights: { region: "Manufacturing Belt", focus: "Green Energy" }
    },
    ekonomi: {
      outputRatio: 2.1, outputRatioTarget: 2.8,
      effectiveness: "Banking sector collaborations yield high placement...",
      chartData: { collab: 60, output: 70 },
      partners: { industry: 50, gov: 35, ngo: 15, totalAgreements: 125 },
      insights: { region: "Financial Districts", focus: "Fintech" }
    },
    kedokteran: {
      outputRatio: 3.1, outputRatioTarget: 3.5,
      effectiveness: "Hospital networks ensure clinical trial success...",
      chartData: { collab: 40, output: 95 },
      partners: { industry: 30, gov: 50, ngo: 20, totalAgreements: 85 },
      insights: { region: "Teaching Hospitals", focus: "Public Health" }
    }
  },
  2025: {
    fasilkom: {
      outputRatio: 2.7, outputRatioTarget: 3.0,
      effectiveness: "Startup incubators increase student ventures...",
      chartData: { collab: 70, output: 88 },
      partners: { industry: 55, gov: 25, ngo: 20, totalAgreements: 160 },
      insights: { region: "Global Tech", focus: "Cybersecurity" }
    },
    fkip: {
      outputRatio: 2.1, outputRatioTarget: 2.5,
      effectiveness: "Digital learning platforms expand reach...",
      chartData: { collab: 85, output: 65 },
      partners: { industry: 30, gov: 55, ngo: 15, totalAgreements: 210 },
      insights: { region: "ASEAN Education", focus: "EdTech" }
    },
    teknik: {
      outputRatio: 3.1, outputRatioTarget: 3.2,
      effectiveness: "Smart city projects gain traction...",
      chartData: { collab: 60, output: 92 },
      partners: { industry: 75, gov: 15, ngo: 10, totalAgreements: 125 },
      insights: { region: "Infrastructure", focus: "Smart Grid" }
    },
    ekonomi: {
      outputRatio: 2.4, outputRatioTarget: 2.8,
      effectiveness: "Sustainable finance partnerships grow...",
      chartData: { collab: 65, output: 75 },
      partners: { industry: 55, gov: 30, ngo: 15, totalAgreements: 140 },
      insights: { region: "Emerging Markets", focus: "ESG" }
    },
    kedokteran: {
      outputRatio: 3.4, outputRatioTarget: 3.5,
      effectiveness: "Telemedicine pilots show promise...",
      chartData: { collab: 45, output: 96 },
      partners: { industry: 35, gov: 45, ngo: 20, totalAgreements: 95 },
      insights: { region: "Rural Health", focus: "Telehealth" }
    }
  },
  2026: {
    fasilkom: {
      outputRatio: 3.0, outputRatioTarget: 3.0,
      effectiveness: "AI governance frameworks adopted by partners...",
      chartData: { collab: 75, output: 90 },
      partners: { industry: 60, gov: 20, ngo: 20, totalAgreements: 180 },
      insights: { region: "Global AI", focus: "Ethics" }
    },
    fkip: {
      outputRatio: 2.4, outputRatioTarget: 2.5,
      effectiveness: "Micro-credential sharing networks active...",
      chartData: { collab: 88, output: 68 },
      partners: { industry: 35, gov: 50, ngo: 15, totalAgreements: 225 },
      insights: { region: "Digital Learning", focus: "Hybrid" }
    },
    teknik: {
      outputRatio: 3.4, outputRatioTarget: 3.2,
      effectiveness: "Circular economy patents filed...",
      chartData: { collab: 65, output: 95 },
      partners: { industry: 80, gov: 10, ngo: 10, totalAgreements: 140 },
      insights: { region: "Sustainability", focus: "Green Tech" }
    },
    ekonomi: {
      outputRatio: 2.7, outputRatioTarget: 2.8,
      effectiveness: "Crypto-asset research collaborations peak...",
      chartData: { collab: 70, output: 78 },
      partners: { industry: 60, gov: 25, ngo: 15, totalAgreements: 155 },
      insights: { region: "Digital Economy", focus: "Blockchain" }
    },
    kedokteran: {
      outputRatio: 3.6, outputRatioTarget: 3.5,
      effectiveness: "Genomic data sharing agreements signed...",
      chartData: { collab: 48, output: 98 },
      partners: { industry: 40, gov: 40, ngo: 20, totalAgreements: 105 },
      insights: { region: "Precision Med", focus: "Genomics" }
    }
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

  let totalRatio = 0, totalAgreements = 0;
  let totalChartCollab = 0, totalChartOutput = 0;
  let totalPartners = { industry: 0, gov: 0, ngo: 0 };

  keys.forEach(k => {
    const d = yearData[k];
    totalRatio += d.outputRatio;
    totalAgreements += d.partners.totalAgreements;
    totalChartCollab += d.chartData.collab;
    totalChartOutput += d.chartData.output;
    totalPartners.industry += d.partners.industry;
    totalPartners.gov += d.partners.gov;
    totalPartners.ngo += d.partners.ngo;
  });

  // Determine dominant partner type
  const pTypes = { Industry: totalPartners.industry, Government: totalPartners.gov, NGO: totalPartners.ngo };
  const topPartner = Object.keys(pTypes).reduce((a, b) => pTypes[a] > pTypes[b] ? a : b);

  return {
    outputRatio: Math.round((totalRatio / count) * 10) / 10,
    outputRatioTarget: 3.0, // Fixed institutional target
    effectiveness: "Kerjasama lintas fakultas menunjukkan sinergi kuat. Rata-rata rasio luaran mencapai target institusional dengan dominasi kemitraan sektor " + topPartner + ".",
    chartData: {
      collab: Math.round(totalChartCollab / count),
      output: Math.round(totalChartOutput / count)
    },
    partners: {
      industry: Math.round(totalPartners.industry / count),
      gov: Math.round(totalPartners.gov / count),
      ngo: Math.round(totalPartners.ngo / count),
      totalAgreements: totalAgreements // Sum for total agreements
    },
    insights: {
      region: "National & Global",
      focus: "Multi-Disciplinary"
    }
  };
}

export default function KerjasamaLuaran() {
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [selectedYear, setSelectedYear] = useState(2024);

  const yearData = dummyData[selectedYear];
  const currentData = selectedFaculty === "all" 
    ? getAggregatedData(dummyData, selectedYear)
    : yearData[selectedFaculty];

  const partnerData = [
    { label: "Industry", percent: currentData.partners.industry, count: selectedFaculty === "all" ? Math.round(currentData.partners.totalAgreements * (currentData.partners.industry/100)) : currentData.partners.totalAgreements, icon: Building2, color: "bg-blue-900" },
    { label: "Government", percent: currentData.partners.gov, count: selectedFaculty === "all" ? Math.round(currentData.partners.totalAgreements * (currentData.partners.gov/100)) : Math.round(currentData.partners.totalAgreements * 0.3), icon: Landmark, color: "bg-teal-700" },
    { label: "Startup & NGO", percent: currentData.partners.ngo, count: selectedFaculty === "all" ? Math.round(currentData.partners.totalAgreements * (currentData.partners.ngo/100)) : Math.round(currentData.partners.totalAgreements * 0.25), icon: Rocket, color: "bg-gray-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="mt-5">
          <h1 className="text-2xl font-bold text-gray-900">Kerjasama & Luaran</h1>
          <p className="text-gray-600 mt-1">Monitoring metrics for partnerships and their resulting academic outputs.</p>
        </div>
        <div className="flex flex-wrap gap-3 mt-5 md:mt-0">
          <div className="relative mt-7">
            <select value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)} className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
              {faculties.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative mt-7">
            <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-500">Menampilkan data untuk:</span>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">{faculties.find(f => f.id === selectedFaculty)?.name}</span>
        <span className="text-gray-400">•</span>
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full font-medium">Tahun {selectedYear}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Output Ratio */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center"><FileBarChart className="w-4 h-4 text-teal-700" /></div>
            <h3 className="font-semibold text-gray-900">Output Ratio</h3>
          </div>
          <p className="text-sm text-gray-500 mb-3">Average outputs per active collaboration.</p>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-4xl font-bold text-gray-900">{currentData.outputRatio}</span>
            <span className="flex items-center gap-1 bg-teal-50 text-teal-700 px-2 py-1 rounded text-sm font-medium mb-1">↗ +0.3 from Y-1</span>
          </div>
          <div className="relative pt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-blue-900 h-2.5 rounded-full transition-all duration-500" style={{ width: `${(currentData.outputRatio / currentData.outputRatioTarget) * 100}%` }}></div></div>
            <span className="absolute right-0 -top-6 text-xs text-gray-500">Target: {currentData.outputRatioTarget}</span>
          </div>
        </div>

        {/* Card 2: Effectiveness */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><Lightbulb className="w-4 h-4 text-blue-700" /></div>
            <h3 className="font-semibold text-gray-900">Partnership Effectiveness Insights</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">{currentData.effectiveness}</p>
          <div className="space-y-3">
            {[{ label: "High-Impact Journals", val: "+12%", bg: "bg-blue-100", text: "text-blue-800" }, { label: "Joint Patents Filed", val: "+5%", bg: "bg-teal-100", text: "text-teal-800" }, { label: "Student Placements", val: "Stable", bg: "bg-gray-100", text: "text-gray-700" }].map((item) => (
              <div key={item.label} className="flex justify-between items-center"><span className="text-sm text-gray-700">{item.label}</span><span className={`px-2 py-1 rounded text-xs font-bold ${item.bg} ${item.text}`}>{item.val}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart: Volume vs Outputs */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Volume vs Outputs by Faculty</h3>
            <div className="flex gap-4 text-xs"><span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-blue-200"></span>Active Collaborations</span><span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-blue-900"></span>Generated Outputs</span></div>
          </div>
          <div className="h-64 flex items-end justify-between gap-6 px-4 pb-6 border-b border-gray-100">
            {/* Single bar group for current view */}
            <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end w-full">
              <div className="w-1/3 flex gap-2 items-end h-full justify-center">
                <div className="w-full bg-blue-200 rounded-t-md transition-all duration-500" style={{ height: `${currentData.chartData.collab}%` }}></div>
                <div className="w-full bg-blue-900 rounded-t-md transition-all duration-500" style={{ height: `${currentData.chartData.output}%` }}></div>
              </div>
              <span className="text-xs text-gray-600 font-medium mt-2">{selectedFaculty === 'all' ? 'Average' : faculties.find(f=>f.id===selectedFaculty)?.name.split(' ').pop()}</span>
            </div>
          </div>
        </div>

        {/* Partner Ecosystem */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-6"><div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><Globe className="w-4 h-4 text-blue-700" /></div><h3 className="font-semibold text-gray-900">Partner Ecosystem</h3></div>
          <div className="space-y-6">
            {partnerData.map((p) => (
              <div key={p.label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2"><p.icon className="w-4 h-4 text-gray-500" /><span className="font-semibold text-gray-800">{p.label}</span></div>
                  <span className="text-xl font-bold text-blue-900">{p.percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1"><div className={`${p.color} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${p.percent}%` }}></div></div>
                <p className="text-xs text-gray-500 text-right">{p.count} Active Agreements</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}