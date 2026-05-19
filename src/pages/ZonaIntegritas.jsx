import { useState } from "react";
import { TrendingUp, FileText, Award, Clock, Shield, AlertCircle, CheckCircle2, ChevronDown, MoreHorizontal, FileCheck, UserCheck, BookOpen } from "lucide-react";

// Data dummy lengkap: [tahun][fakultas]
const dummyData = {
  2024: {
    fasilkom: {
      totalProposals: 4,
      yoyGrowth: "+15%",
      achievedStatus: 2,
      underEvaluation: 2,
      evaluationBreakdown: { internalReview: 1, ministryLevel: 1 },
      proposalsByUnit: [
        { unit: "Lab. RPL", wbk: 1, wbbm: 1, total: 2 },
        { unit: "Lab. Jaringan", wbk: 1, wbbm: 0, total: 1 },
        { unit: "Prodi SI", wbk: 1, wbbm: 0, total: 1 }
      ],
      governanceInitiatives: [
        { title: "Digital SOP", description: "SOP layanan akademik terdigitalisasi 90%.", icon: FileCheck, status: "progress", progress: 90 },
        { title: "Whistleblower", description: "Portal pelaporan aman dengan resolusi 100%.", icon: AlertCircle, status: "success", progress: 100 },
        { title: "Integrity Training", description: "Pelatihan integritas untuk 95% staf.", icon: UserCheck, status: "progress", progress: 95 }
      ],
      wbkAchievements: [
        { unit: "Lab. RPL", year: 2023, score: 93.2, status: "Achieved" },
        { unit: "Prodi SI", year: 2024, score: 90.5, status: "In Review" }
      ],
      wbbmAchievements: [
        { unit: "Lab. RPL", year: 2024, score: 96.1, status: "Achieved" }
      ]
    },
    fkip: {
      totalProposals: 3,
      yoyGrowth: "+10%",
      achievedStatus: 1,
      underEvaluation: 2,
      evaluationBreakdown: { internalReview: 2, ministryLevel: 0 },
      proposalsByUnit: [
        { unit: "Prodi PGSD", wbk: 1, wbbm: 1, total: 2 },
        { unit: "Prodi B. Inggris", wbk: 1, wbbm: 0, total: 1 }
      ],
      governanceInitiatives: [
        { title: "Standardized SOPs", description: "SOP seragam diterapkan di 75% unit.", icon: FileCheck, status: "progress", progress: 75 },
        { title: "Whistleblower", description: "Sistem pelaporan internal aktif.", icon: AlertCircle, status: "success", progress: 100 }
      ],
      wbkAchievements: [
        { unit: "Prodi PGSD", year: 2023, score: 89.8, status: "Achieved" }
      ],
      wbbmAchievements: []
    },
    teknik: {
      totalProposals: 6,
      yoyGrowth: "+18%",
      achievedStatus: 3,
      underEvaluation: 3,
      evaluationBreakdown: { internalReview: 2, ministryLevel: 1 },
      proposalsByUnit: [
        { unit: "Prodi Sipil", wbk: 2, wbbm: 1, total: 3 },
        { unit: "Prodi Mesin", wbk: 1, wbbm: 1, total: 2 },
        { unit: "Prodi Elektro", wbk: 1, wbbm: 0, total: 1 }
      ],
      governanceInitiatives: [
        { title: "Digital SOP", description: "Digitalisasi SOP layanan laboratorium 85%.", icon: FileCheck, status: "progress", progress: 85 },
        { title: "Whistleblower", description: "Portal pelaporan dengan enkripsi end-to-end.", icon: AlertCircle, status: "success", progress: 100 },
        { title: "Integrity Training", description: "Pelatihan untuk 92% dosen & staf.", icon: UserCheck, status: "progress", progress: 92 }
      ],
      wbkAchievements: [
        { unit: "Prodi Sipil", year: 2023, score: 94.1, status: "Achieved" },
        { unit: "Prodi Mesin", year: 2023, score: 91.5, status: "Achieved" }
      ],
      wbbmAchievements: [
        { unit: "Prodi Sipil", year: 2024, score: 97.2, status: "Achieved" }
      ]
    },
    ekonomi: {
      totalProposals: 4,
      yoyGrowth: "+12%",
      achievedStatus: 2,
      underEvaluation: 2,
      evaluationBreakdown: { internalReview: 1, ministryLevel: 1 },
      proposalsByUnit: [
        { unit: "Prodi Akuntansi", wbk: 1, wbbm: 1, total: 2 },
        { unit: "Prodi Manajemen", wbk: 1, wbbm: 1, total: 2 }
      ],
      governanceInitiatives: [
        { title: "SOP Keuangan", description: "Standarisasi SOP keuangan 80% unit.", icon: FileCheck, status: "progress", progress: 80 },
        { title: "Whistleblower", description: "Sistem pelaporan terintegrasi dengan audit internal.", icon: AlertCircle, status: "success", progress: 100 }
      ],
      wbkAchievements: [
        { unit: "Prodi Akuntansi", year: 2023, score: 92.3, status: "Achieved" }
      ],
      wbbmAchievements: [
        { unit: "Prodi Akuntansi", year: 2024, score: 95.8, status: "Achieved" }
      ]
    },
    kedokteran: {
      totalProposals: 5,
      yoyGrowth: "+20%",
      achievedStatus: 3,
      underEvaluation: 2,
      evaluationBreakdown: { internalReview: 1, ministryLevel: 1 },
      proposalsByUnit: [
        { unit: "RS Pendidikan", wbk: 2, wbbm: 1, total: 3 },
        { unit: "Prodi Kedokteran", wbk: 1, wbbm: 1, total: 2 }
      ],
      governanceInitiatives: [
        { title: "Clinical SOP", description: "SOP klinis terstandarisasi 95% unit.", icon: FileCheck, status: "progress", progress: 95 },
        { title: "Whistleblower", description: "Sistem pelaporan etika medis dengan proteksi whistleblower.", icon: AlertCircle, status: "success", progress: 100 },
        { title: "Integrity Training", description: "Pelatihan integritas medis untuk 98% staf.", icon: UserCheck, status: "progress", progress: 98 }
      ],
      wbkAchievements: [
        { unit: "RS Pendidikan", year: 2023, score: 95.5, status: "Achieved" },
        { unit: "Prodi Kedokteran", year: 2023, score: 93.1, status: "Achieved" }
      ],
      wbbmAchievements: [
        { unit: "RS Pendidikan", year: 2024, score: 98.1, status: "Achieved" }
      ]
    }
  },
  2023: {
    fasilkom: {
      totalProposals: 3,
      yoyGrowth: "+12%",
      achievedStatus: 1,
      underEvaluation: 2,
      evaluationBreakdown: { internalReview: 2, ministryLevel: 0 },
      proposalsByUnit: [
        { unit: "Lab. RPL", wbk: 1, wbbm: 0, total: 1 },
        { unit: "Prodi SI", wbk: 1, wbbm: 1, total: 2 }
      ],
      governanceInitiatives: [
        { title: "Digital SOP", description: "SOP terdigitalisasi 75% unit.", icon: FileCheck, status: "progress", progress: 75 },
        { title: "Whistleblower", description: "Portal pelaporan dasar diluncurkan.", icon: AlertCircle, status: "success", progress: 100 }
      ],
      wbkAchievements: [
        { unit: "Lab. RPL", year: 2023, score: 93.2, status: "Achieved" }
      ],
      wbbmAchievements: []
    },
    fkip: {
      totalProposals: 2,
      yoyGrowth: "+8%",
      achievedStatus: 1,
      underEvaluation: 1,
      evaluationBreakdown: { internalReview: 1, ministryLevel: 0 },
      proposalsByUnit: [
        { unit: "Prodi PGSD", wbk: 1, wbbm: 1, total: 2 }
      ],
      governanceInitiatives: [
        { title: "Standardized SOPs", description: "SOP seragam di 60% unit.", icon: FileCheck, status: "progress", progress: 60 }
      ],
      wbkAchievements: [
        { unit: "Prodi PGSD", year: 2023, score: 89.8, status: "Achieved" }
      ],
      wbbmAchievements: []
    },
    teknik: {
      totalProposals: 5,
      yoyGrowth: "+15%",
      achievedStatus: 2,
      underEvaluation: 3,
      evaluationBreakdown: { internalReview: 2, ministryLevel: 1 },
      proposalsByUnit: [
        { unit: "Prodi Sipil", wbk: 1, wbbm: 1, total: 2 },
        { unit: "Prodi Mesin", wbk: 1, wbbm: 0, total: 1 },
        { unit: "Prodi Elektro", wbk: 1, wbbm: 1, total: 2 }
      ],
      governanceInitiatives: [
        { title: "Digital SOP", description: "Digitalisasi SOP 70% unit.", icon: FileCheck, status: "progress", progress: 70 },
        { title: "Whistleblower", description: "Sistem pelaporan internal aktif.", icon: AlertCircle, status: "success", progress: 100 }
      ],
      wbkAchievements: [
        { unit: "Prodi Sipil", year: 2023, score: 94.1, status: "Achieved" }
      ],
      wbbmAchievements: []
    },
    ekonomi: {
      totalProposals: 3,
      yoyGrowth: "+10%",
      achievedStatus: 1,
      underEvaluation: 2,
      evaluationBreakdown: { internalReview: 2, ministryLevel: 0 },
      proposalsByUnit: [
        { unit: "Prodi Akuntansi", wbk: 1, wbbm: 0, total: 1 },
        { unit: "Prodi Manajemen", wbk: 1, wbbm: 1, total: 2 }
      ],
      governanceInitiatives: [
        { title: "SOP Keuangan", description: "Standarisasi SOP 65% unit.", icon: FileCheck, status: "progress", progress: 65 }
      ],
      wbkAchievements: [
        { unit: "Prodi Akuntansi", year: 2023, score: 92.3, status: "Achieved" }
      ],
      wbbmAchievements: []
    },
    kedokteran: {
      totalProposals: 4,
      yoyGrowth: "+16%",
      achievedStatus: 2,
      underEvaluation: 2,
      evaluationBreakdown: { internalReview: 1, ministryLevel: 1 },
      proposalsByUnit: [
        { unit: "RS Pendidikan", wbk: 1, wbbm: 1, total: 2 },
        { unit: "Prodi Kedokteran", wbk: 1, wbbm: 1, total: 2 }
      ],
      governanceInitiatives: [
        { title: "Clinical SOP", description: "SOP klinis terstandarisasi 85% unit.", icon: FileCheck, status: "progress", progress: 85 },
        { title: "Whistleblower", description: "Sistem pelaporan etika medis diluncurkan.", icon: AlertCircle, status: "success", progress: 100 }
      ],
      wbkAchievements: [
        { unit: "RS Pendidikan", year: 2023, score: 95.5, status: "Achieved" }
      ],
      wbbmAchievements: []
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

const years = [2023, 2024];

// Fungsi agregasi untuk "Semua Fakultas"
function getAggregatedData(dataByYear, year) {
  const yearData = dataByYear[year];
  const facultyKeys = Object.keys(yearData);
  
  let totalProposals = 0, totalAchieved = 0, totalUnderEval = 0;
  let totalInternal = 0, totalMinistry = 0;
  const allProposalsByUnit = [];
  const allInitiatives = [];
  const allWbk = [], allWbbm = [];
  
  facultyKeys.forEach(key => {
    const f = yearData[key];
    totalProposals += f.totalProposals;
    totalAchieved += f.achievedStatus;
    totalUnderEval += f.underEvaluation;
    totalInternal += f.evaluationBreakdown.internalReview;
    totalMinistry += f.evaluationBreakdown.ministryLevel;
    
    f.proposalsByUnit.forEach(p => {
      allProposalsByUnit.push({ ...p, unit: `${f.key || key} - ${p.unit}` });
    });
    f.governanceInitiatives.forEach(i => allInitiatives.push(i));
    f.wbkAchievements.forEach(w => allWbk.push(w));
    f.wbbmAchievements.forEach(w => allWbbm.push(w));
  });
  
  // Deduplicate & limit proposals by unit (top 8)
  const uniqueUnits = {};
  allProposalsByUnit.forEach(p => {
    if (!uniqueUnits[p.unit]) uniqueUnits[p.unit] = p;
  });
  const proposalsByUnit = Object.values(uniqueUnits).slice(0, 8);
  
  // Deduplicate initiatives by title
  const uniqueInitiatives = {};
  allInitiatives.forEach(i => {
    if (!uniqueInitiatives[i.title]) uniqueInitiatives[i.title] = i;
  });
  const governanceInitiatives = Object.values(uniqueInitiatives);
  
  return {
    totalProposals,
    yoyGrowth: "+14%",
    achievedStatus: totalAchieved,
    underEvaluation: totalUnderEval,
    evaluationBreakdown: { internalReview: totalInternal, ministryLevel: totalMinistry },
    proposalsByUnit,
    governanceInitiatives,
    wbkAchievements: allWbk.slice(0, 4),
    wbbmAchievements: allWbbm.slice(0, 4)
  };
}

export default function ZonaIntegritas() {
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [selectedYear, setSelectedYear] = useState(2024);

  const yearData = dummyData[selectedYear];
  const currentData = selectedFaculty === "all" 
    ? getAggregatedData(dummyData, selectedYear)
    : yearData[selectedFaculty];

  return (
    <div className="space-y-6">
      {/* Header + Filters */}
      <div className="mt-5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Zona Integritas (WBK/WBBM)</h1>
            <p className="text-gray-600 mt-2 max-w-3xl">
              Monitoring Wilayah Bebas dari Korupsi proposals and governance integrity.
            </p>
          </div>
          
          {/* Filters - Export Report dihilangkan */}
          <div className="flex flex-wrap gap-3">
            {/* Faculty Filter */}
            <div className="relative">
              <select
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Proposals */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
          <div className="relative">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-gray-700 font-semibold text-lg">Total Proposals</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">{currentData.totalProposals}</span>
                  <span className="inline-flex items-center text-sm font-medium text-teal-700">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {currentData.yoyGrowth}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">Active submissions for WBK/WBBM</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Achieved Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-gray-700 font-semibold text-lg">Achieved Status</h3>
              <div className="mt-3">
                <span className="text-4xl font-bold text-gray-900">{currentData.achievedStatus}</span>
                <span className="text-gray-600 ml-2">Units</span>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-teal-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${currentData.totalProposals > 0 ? (currentData.achievedStatus / currentData.totalProposals) * 100 : 0}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {currentData.totalProposals > 0 ? ((currentData.achievedStatus / currentData.totalProposals) * 100).toFixed(1) : 0}% success rate
              </p>
            </div>
            <div className="p-3 bg-teal-100 rounded-lg">
              <Award className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        {/* Under Evaluation */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-gray-700 font-semibold text-lg">Under Evaluation</h3>
              <div className="mt-3">
                <span className="text-4xl font-bold text-gray-900">{currentData.underEvaluation}</span>
                <span className="text-gray-600 ml-2">Units</span>
              </div>
              <div className="mt-3 flex gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                  {currentData.evaluationBreakdown.internalReview} Internal Review
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                  {currentData.evaluationBreakdown.ministryLevel} Ministry Level
                </span>
              </div>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Proposals by Unit */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900 font-semibold text-lg">Proposals by Unit</h3>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <MoreHorizontal className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-4">
            {currentData.proposalsByUnit.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="w-48 text-sm font-medium text-gray-700 truncate">{item.unit}</span>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full bg-blue-900 transition-all duration-500"
                      style={{ width: `${item.total > 0 ? (item.wbk / item.total) * 100 : 0}%` }}
                    ></div>
                    <div 
                      className="absolute top-0 h-full bg-teal-600 transition-all duration-500"
                      style={{ 
                        left: `${item.total > 0 ? (item.wbk / item.total) * 100 : 0}%`,
                        width: `${item.total > 0 ? (item.wbbm / item.total) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-8 text-right">{item.total}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-900"></div>
              <span className="text-sm text-gray-600">WBK Proposal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal-600"></div>
              <span className="text-sm text-gray-600">WBBM Proposal</span>
            </div>
          </div>
        </div>

        {/* Right: Governance Initiatives */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-gray-900 font-semibold text-lg">Governance Initiatives</h3>
          </div>
          
          <div className="space-y-4">
            {currentData.governanceInitiatives.map((initiative, index) => {
              const Icon = initiative.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${initiative.status === 'success' ? 'bg-green-100' : 'bg-blue-100'}`}>
                      <Icon className={`w-4 h-4 ${initiative.status === 'success' ? 'text-green-600' : 'text-blue-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{initiative.title}</h4>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{initiative.description}</p>
                      {initiative.progress < 100 && (
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" style={{ width: `${initiative.progress}%` }}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{initiative.progress}% completed</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button className="w-full mt-6 py-2 text-sm font-semibold text-blue-900 hover:bg-blue-50 rounded-lg transition">
            VIEW FULL ACTION PLAN
          </button>
        </div>
      </div>

      {/* Achievements Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* WBK Achievements */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 font-semibold text-lg mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            WBK Achievements
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Unit</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Year</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Score</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentData.wbkAchievements.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0">
                    <td className="py-3 px-4 text-sm text-gray-900">{item.unit}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{item.year}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">{item.score}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Achieved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* WBBM Achievements */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 font-semibold text-lg mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-teal-600" />
            WBBM Achievements
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Unit</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Year</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Score</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentData.wbbmAchievements.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0">
                    <td className="py-3 px-4 text-sm text-gray-900">{item.unit}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{item.year}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">{item.score}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}