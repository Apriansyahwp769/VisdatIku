import { useState } from "react";
import { TrendingUp, DollarSign, PieChart, ChevronDown, Building2, FlaskConical, Handshake } from "lucide-react";

// Data dummy lengkap: [tahun][fakultas]
const dummyData = {
  2019: {
    fasilkom: {
      nonTuitionRatio: 28.5,
      yoyGrowth: "+1.8%",
      target: 30.0,
      totalRevenue: 45000000000,
      bySource: { businessUnits: 55, appliedResearch: 28, partnerships: 17 },
      yearlyData: [
        { year: 2019, amount: 45000000000 },
        { year: 2020, amount: 52000000000 },
        { year: 2021, amount: 48000000000 },
        { year: 2022, amount: 68000000000 },
        { year: 2023, amount: 85000000000 }
      ],
      insights: {
        topPerformer: "Business Units",
        areaForFocus: "Technology Transfer",
        description: "Revenue from software development services and IT consulting shows strong growth. Professional certification programs contribute significantly."
      }
    },
    fkip: {
      nonTuitionRatio: 22.3,
      yoyGrowth: "+1.2%",
      target: 28.0,
      totalRevenue: 32000000000,
      bySource: { businessUnits: 45, appliedResearch: 35, partnerships: 20 },
      yearlyData: [
        { year: 2019, amount: 32000000000 },
        { year: 2020, amount: 35000000000 },
        { year: 2021, amount: 33000000000 },
        { year: 2022, amount: 42000000000 },
        { year: 2023, amount: 51000000000 }
      ],
      insights: {
        topPerformer: "Applied Research",
        areaForFocus: "Educational Consulting",
        description: "Training and certification programs for teachers generate steady revenue. Educational material development shows potential."
      }
    },
    teknik: {
      nonTuitionRatio: 31.2,
      yoyGrowth: "+2.5%",
      target: 32.0,
      totalRevenue: 58000000000,
      bySource: { businessUnits: 60, appliedResearch: 25, partnerships: 15 },
      yearlyData: [
        { year: 2019, amount: 58000000000 },
        { year: 2020, amount: 62000000000 },
        { year: 2021, amount: 59000000000 },
        { year: 2022, amount: 78000000000 },
        { year: 2023, amount: 95000000000 }
      ],
      insights: {
        topPerformer: "Business Units",
        areaForFocus: "Renewable Energy Projects",
        description: "Engineering consulting and testing services drive revenue. Industry partnerships in infrastructure projects expanding."
      }
    },
    ekonomi: {
      nonTuitionRatio: 26.8,
      yoyGrowth: "+1.5%",
      target: 30.0,
      totalRevenue: 38000000000,
      bySource: { businessUnits: 48, appliedResearch: 32, partnerships: 20 },
      yearlyData: [
        { year: 2019, amount: 38000000000 },
        { year: 2020, amount: 41000000000 },
        { year: 2021, amount: 39000000000 },
        { year: 2022, amount: 52000000000 },
        { year: 2023, amount: 62000000000 }
      ],
      insights: {
        topPerformer: "Business Units",
        areaForFocus: "Financial Consulting",
        description: "Business incubator and MSME consulting services growing. Executive education programs show strong demand."
      }
    },
    kedokteran: {
      nonTuitionRatio: 35.6,
      yoyGrowth: "+3.2%",
      target: 35.0,
      totalRevenue: 72000000000,
      bySource: { businessUnits: 52, appliedResearch: 30, partnerships: 18 },
      yearlyData: [
        { year: 2019, amount: 72000000000 },
        { year: 2020, amount: 78000000000 },
        { year: 2021, amount: 75000000000 },
        { year: 2022, amount: 98000000000 },
        { year: 2023, amount: 118000000000 }
      ],
      insights: {
        topPerformer: "Business Units",
        areaForFocus: "Clinical Services",
        description: "Hospital services and specialized medical testing lead revenue. Health research partnerships with pharma increasing."
      }
    }
  },
  2023: {
    fasilkom: {
      nonTuitionRatio: 32.4,
      yoyGrowth: "+2.1%",
      target: 35.0,
      totalRevenue: 124000000000,
      bySource: { businessUnits: 50, appliedResearch: 30, partnerships: 20 },
      yearlyData: [
        { year: 2019, amount: 45000000000 },
        { year: 2020, amount: 58000000000 },
        { year: 2021, amount: 62000000000 },
        { year: 2022, amount: 95000000000 },
        { year: 2023, amount: 124000000000 }
      ],
      insights: {
        topPerformer: "Business Units",
        areaForFocus: "Alumni Endowments",
        description: "The institution is demonstrating strong progress towards financial independence. Revenue from commercial business units has seen a 15% increase this quarter, largely driven by the new technology transfer office and specialized professional certification programs."
      }
    },
    fkip: {
      nonTuitionRatio: 28.5,
      yoyGrowth: "+1.8%",
      target: 32.0,
      totalRevenue: 68000000000,
      bySource: { businessUnits: 45, appliedResearch: 35, partnerships: 20 },
      yearlyData: [
        { year: 2019, amount: 32000000000 },
        { year: 2020, amount: 42000000000 },
        { year: 2021, amount: 48000000000 },
        { year: 2022, amount: 58000000000 },
        { year: 2023, amount: 68000000000 }
      ],
      insights: {
        topPerformer: "Applied Research",
        areaForFocus: "Digital Learning Products",
        description: "Educational content development and teacher training programs show consistent growth. Partnership with edtech companies expanding revenue streams."
      }
    },
    teknik: {
      nonTuitionRatio: 35.8,
      yoyGrowth: "+2.8%",
      target: 36.0,
      totalRevenue: 142000000000,
      bySource: { businessUnits: 58, appliedResearch: 27, partnerships: 15 },
      yearlyData: [
        { year: 2019, amount: 58000000000 },
        { year: 2020, amount: 72000000000 },
        { year: 2021, amount: 85000000000 },
        { year: 2022, amount: 115000000000 },
        { year: 2023, amount: 142000000000 }
      ],
      insights: {
        topPerformer: "Business Units",
        areaForFocus: "Green Technology",
        description: "Engineering consulting for renewable energy projects drives growth. Testing laboratory services and certification programs expanding rapidly."
      }
    },
    ekonomi: {
      nonTuitionRatio: 30.2,
      yoyGrowth: "+2.2%",
      target: 33.0,
      totalRevenue: 85000000000,
      bySource: { businessUnits: 50, appliedResearch: 30, partnerships: 20 },
      yearlyData: [
        { year: 2019, amount: 38000000000 },
        { year: 2020, amount: 48000000000 },
        { year: 2021, amount: 55000000000 },
        { year: 2022, amount: 72000000000 },
        { year: 2023, amount: 85000000000 }
      ],
      insights: {
        topPerformer: "Business Units",
        areaForFocus: "Executive Education",
        description: "Business incubator success stories attract more startups. Financial consulting and economic policy research generate steady income."
      }
    },
    kedokteran: {
      nonTuitionRatio: 38.5,
      yoyGrowth: "+2.5%",
      target: 38.0,
      totalRevenue: 165000000000,
      bySource: { businessUnits: 52, appliedResearch: 30, partnerships: 18 },
      yearlyData: [
        { year: 2019, amount: 72000000000 },
        { year: 2020, amount: 92000000000 },
        { year: 2021, amount: 108000000000 },
        { year: 2022, amount: 138000000000 },
        { year: 2023, amount: 165000000000 }
      ],
      insights: {
        topPerformer: "Business Units",
        areaForFocus: "Research Commercialization",
        description: "Hospital services and specialized clinics exceed targets. Pharmaceutical research partnerships and clinical trials contribute significantly."
      }
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

const years = [2019, 2023];

// Format rupiah
const formatRupiah = (amount) => {
  if (amount >= 1000000000000) return `${(amount / 1000000000000).toFixed(1)}T`;
  if (amount >= 1000000000) return `${(amount / 1000000000).toFixed(0)}B`;
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(0)}M`;
  return amount.toString();
};

// Fungsi agregasi untuk "Semua Fakultas"
function getAggregatedData(dataByYear, year) {
  const yearData = dataByYear[year];
  const facultyKeys = Object.keys(yearData);
  
  let totalRatio = 0, totalRevenue = 0, validFaculties = 0;
  const sourceTotals = { businessUnits: 0, appliedResearch: 0, partnerships: 0 };
  const allYearlyData = {};
  
  facultyKeys.forEach(facultyKey => {
    const faculty = yearData[facultyKey];
    totalRatio += faculty.nonTuitionRatio;
    totalRevenue += faculty.totalRevenue;
    validFaculties++;
    
    Object.keys(sourceTotals).forEach(source => {
      sourceTotals[source] += faculty.bySource[source];
    });
    
    faculty.yearlyData.forEach(data => {
      if (!allYearlyData[data.year]) allYearlyData[data.year] = 0;
      allYearlyData[data.year] += data.amount;
    });
  });
  
  const avgRatio = totalRatio / validFaculties;
  const avgSources = {
    businessUnits: Math.round(sourceTotals.businessUnits / validFaculties),
    appliedResearch: Math.round(sourceTotals.appliedResearch / validFaculties),
    partnerships: Math.round(sourceTotals.partnerships / validFaculties)
  };
  
  const aggregatedYearlyData = Object.entries(allYearlyData)
    .map(([year, amount]) => ({ year: parseInt(year), amount }))
    .sort((a, b) => a.year - b.year);
  
  // Find top performer across faculties
  const performerCounts = {};
  facultyKeys.forEach(key => {
    const p = yearData[key].insights.topPerformer;
    performerCounts[p] = (performerCounts[p] || 0) + 1;
  });
  const topPerformer = Object.entries(performerCounts).sort((a,b) => b[1]-a[1])[0][0];
  
  return {
    nonTuitionRatio: Math.round(avgRatio * 10) / 10,
    yoyGrowth: "+2.1%",
    target: 35.0,
    totalRevenue: totalRevenue,
    bySource: avgSources,
    yearlyData: aggregatedYearlyData,
    insights: {
      topPerformer,
      areaForFocus: "Strategic Diversification",
      description: `Rata-rata dari ${validFaculties} fakultas menunjukkan tren positif. ${yearData.kedokteran.nonTuitionRatio >= yearData.teknik.nonTuitionRatio ? 'Fakultas Kedokteran' : 'Fakultas Teknik'} memimpin dengan rasio ${Math.max(...facultyKeys.map(k=>yearData[k].nonTuitionRatio))}%, didorong oleh ${topPerformer.toLowerCase()}.`
    }
  };
}

export default function PendapatanNonUkt() {
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [selectedYear, setSelectedYear] = useState(2023);

  const yearData = dummyData[selectedYear];
  const currentData = selectedFaculty === "all" 
    ? getAggregatedData(dummyData, selectedYear)
    : yearData[selectedFaculty];

  const revenueSources = [
    { key: "businessUnits", label: "Business Units", icon: Building2, percentage: currentData.bySource.businessUnits, color: "bg-blue-900" },
    { key: "appliedResearch", label: "Applied Research", icon: FlaskConical, percentage: currentData.bySource.appliedResearch, color: "bg-teal-700" },
    { key: "partnerships", label: "Partnerships", icon: Handshake, percentage: currentData.bySource.partnerships, color: "bg-slate-600" }
  ];

  const maxYearlyValue = Math.max(...currentData.yearlyData.map(d => d.amount));

  return (
    <div className="space-y-6">
      {/* Header + Filters */}
      <div className="mt-5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Non-Tuition Revenue (IKU 9)</h1>
            <p className="text-gray-600 mt-2 max-w-3xl">
              Tracking financial independence through diverse revenue streams outside standard student tuition.
            </p>
          </div>
          
          {/* Filters - Export Report dihilangkan */}
          <div className="flex flex-wrap gap-3">
            {/* Faculty Filter */}
            <div className="relative">
              <select
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer hover:border-gray-400 transition"
              >
                {faculties.map((f) => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Year Filter */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer hover:border-gray-400 transition"
              >
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Badge */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-500">Menampilkan data untuk:</span>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
          {faculties.find(f => f.id === selectedFaculty)?.name}
        </span>
        <span className="text-gray-400">•</span>
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full font-medium">
          Tahun {selectedYear}
        </span>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Non-Tuition Ratio Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-gray-700 font-semibold text-lg flex items-center gap-2">
                Non-Tuition Ratio
                <div className="p-1.5 bg-blue-100 rounded-md">
                  <PieChart className="w-4 h-4 text-blue-600" />
                </div>
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Percentage of total operational budget generated from non-UKT sources.
              </p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">{currentData.nonTuitionRatio}%</span>
                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-teal-100 text-teal-800">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {currentData.yoyGrowth} YOY
                </span>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-900 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(currentData.nonTuitionRatio / currentData.target) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  <span>Current</span>
                  <span>Target: {currentData.target}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Sustainability Insight */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-6 text-white">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-blue-700 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-blue-100">Financial Sustainability Insight</h3>
            </div>
          </div>
          <p className="text-blue-100 text-sm leading-relaxed mb-6">
            {currentData.insights.description}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-950 bg-opacity-50 rounded-lg p-4">
              <p className="text-xs text-blue-300 uppercase tracking-wide mb-1">Top Performer</p>
              <p className="font-semibold text-white">{currentData.insights.topPerformer}</p>
            </div>
            <div className="bg-blue-950 bg-opacity-50 rounded-lg p-4">
              <p className="text-xs text-blue-300 uppercase tracking-wide mb-1">Area for Focus</p>
              <p className="font-semibold text-white">{currentData.insights.areaForFocus}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Growth Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900 font-semibold text-lg">Financial Growth Trend</h3>
            <div className="px-3 py-1 bg-gray-200 rounded-md text-sm font-medium text-gray-700">
              Last 5 Years
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {currentData.yearlyData.map((data, index) => {
              const height = (data.amount / maxYearlyValue) * 100;
              const isLast = index === currentData.yearlyData.length - 1;
              return (
                <div key={data.year} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative">
                    <div 
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isLast ? 'bg-blue-900' : 'bg-blue-300'
                      }`}
                      style={{ height: `${height}%`, minHeight: '20px' }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{data.year}</span>
                </div>
              );
            })}
          </div>
          
          {/* Y-axis labels */}
          <div className="mt-2 flex justify-between text-xs text-gray-500 px-4">
            <span>0</span>
            <span>{formatRupiah(maxYearlyValue * 0.25)}</span>
            <span>{formatRupiah(maxYearlyValue * 0.5)}</span>
            <span>{formatRupiah(maxYearlyValue * 0.75)}</span>
            <span>{formatRupiah(maxYearlyValue)}</span>
          </div>
        </div>

        {/* Revenue Sources */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 font-semibold text-lg mb-6">Revenue Sources</h3>
          
          {/* Donut Chart Simulation */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#1e3a8a" strokeWidth="12"
                strokeDasharray={`${currentData.bySource.businessUnits * 2.51} 251`}
                className="transition-all duration-500" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#0f766e" strokeWidth="12"
                strokeDasharray={`${currentData.bySource.appliedResearch * 2.51} 251`}
                strokeDashoffset={`-${currentData.bySource.businessUnits * 2.51}`}
                className="transition-all duration-500" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#475569" strokeWidth="12"
                strokeDasharray={`${currentData.bySource.partnerships * 2.51} 251`}
                strokeDashoffset={`-${(currentData.bySource.businessUnits + currentData.bySource.appliedResearch) * 2.51}`}
                className="transition-all duration-500" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{formatRupiah(currentData.totalRevenue)}</span>
              <span className="text-xs text-gray-600">Total IDR</span>
            </div>
          </div>
          
          {/* Legend */}
          <div className="space-y-3">
            {revenueSources.map((source) => {
              const Icon = source.icon;
              return (
                <div key={source.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                    <span className="text-sm text-gray-600">{source.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{source.percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}