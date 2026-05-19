import { useState } from "react";
import { TrendingUp, Award, Shield, FileCheck, ChevronDown, Info, CheckCircle2, AlertCircle } from "lucide-react";

// Data dummy: [tahun][fakultas]
const dummyData = {
  2023: {
    fasilkom: {
      nilaiSakip: 85.2,
      previousSakip: 82.5,
      classification: "A",
      classificationLabel: "Memuaskan",
      opiniBpk: "WTP",
      opiniBpkYears: 4,
      zonaIntegritas: { total: 2, wbk: 2, wbbm: 0 },
      performanceScore: 85.2,
      insights: {
        accountability: "Peningkatan 2,7 poin melalui alignment perencanaan strategis dengan eksekusi anggaran. Kepatuhan dokumentasi 96%.",
        integrity: "Dua unit kerja mencapai status WBK. Pelatihan anti-gratifikasi diikuti 88% staf."
      }
    },
    fkip: {
      nilaiSakip: 81.8,
      previousSakip: 79.2,
      classification: "A",
      classificationLabel: "Memuaskan",
      opiniBpk: "WTP",
      opiniBpkYears: 3,
      zonaIntegritas: { total: 1, wbk: 1, wbbm: 0 },
      performanceScore: 81.8,
      insights: {
        accountability: "Peningkatan 2,6 poin melalui perbaikan sistem pelaporan kinerja. Kepatuhan dokumentasi 93%.",
        integrity: "Satu unit kerja mencapai WBK. Partisipasi pelatihan integritas meningkat 10%."
      }
    },
    teknik: {
      nilaiSakip: 87.5,
      previousSakip: 84.8,
      classification: "A",
      classificationLabel: "Memuaskan",
      opiniBpk: "WTP",
      opiniBpkYears: 5,
      zonaIntegritas: { total: 3, wbk: 2, wbbm: 1 },
      performanceScore: 87.5,
      insights: {
        accountability: "Peningkatan 2,7 poin didorong oleh digitalisasi SOP dan monitoring real-time. Kepatuhan dokumentasi 98%.",
        integrity: "Satu unit mencapai WBBM, dua WBK. Program anti-korupsi diikuti 95% dosen & staf."
      }
    },
    ekonomi: {
      nilaiSakip: 83.4,
      previousSakip: 80.9,
      classification: "A",
      classificationLabel: "Memuaskan",
      opiniBpk: "WTP",
      opiniBpkYears: 4,
      zonaIntegritas: { total: 2, wbk: 1, wbbm: 1 },
      performanceScore: 83.4,
      insights: {
        accountability: "Peningkatan 2,5 poin melalui integrasi sistem keuangan & pelaporan. Kepatuhan dokumentasi 94%.",
        integrity: "Satu unit WBK, satu WBBM. Pelatihan transparansi anggaran diikuti 90% staf."
      }
    },
    kedokteran: {
      nilaiSakip: 89.1,
      previousSakip: 86.3,
      classification: "A",
      classificationLabel: "Memuaskan",
      opiniBpk: "WTP",
      opiniBpkYears: 5,
      zonaIntegritas: { total: 3, wbk: 2, wbbm: 1 },
      performanceScore: 89.1,
      insights: {
        accountability: "Peningkatan 2,8 poin melalui sistem akuntansi terintegrasi RS. Kepatuhan dokumentasi 99%.",
        integrity: "Dua unit WBK, satu WBBM. Program etika medis & anti-gratifikasi diikuti 97% staf."
      }
    }
  },
  2024: {
    fasilkom: {
      nilaiSakip: 87.8,
      previousSakip: 85.2,
      classification: "A",
      classificationLabel: "Memuaskan",
      opiniBpk: "WTP",
      opiniBpkYears: 5,
      zonaIntegritas: { total: 3, wbk: 2, wbbm: 1 },
      performanceScore: 87.8,
      insights: {
        accountability: "Peningkatan 2,6 poin melalui optimalisasi dashboard kinerja real-time. Kepatuhan dokumentasi 98%.",
        integrity: "Satu unit tambahan mencapai WBBM. Partisipasi pelatihan integritas digital meningkat 15%."
      }
    },
    fkip: {
      nilaiSakip: 84.2,
      previousSakip: 81.8,
      classification: "A",
      classificationLabel: "Memuaskan",
      opiniBpk: "WTP",
      opiniBpkYears: 4,
      zonaIntegritas: { total: 2, wbk: 1, wbbm: 1 },
      performanceScore: 84.2,
      insights: {
        accountability: "Peningkatan 2,4 poin melalui sistem evaluasi pembelajaran terdigitalisasi. Kepatuhan dokumentasi 95%.",
        integrity: "Satu unit tambahan mencapai WBBM. Pelatihan etika pendidikan diikuti 92% dosen."
      }
    },
    teknik: {
      nilaiSakip: 90.1,
      previousSakip: 87.5,
      classification: "AA",
      classificationLabel: "Sangat Memuaskan",
      opiniBpk: "WTP",
      opiniBpkYears: 6,
      zonaIntegritas: { total: 4, wbk: 3, wbbm: 1 },
      performanceScore: 90.1,
      insights: {
        accountability: "Peningkatan 2,6 poin, mencapai klasifikasi AA. Sistem monitoring proyek terintegrasi AI meningkatkan akuntabilitas.",
        integrity: "Satu unit tambahan mencapai WBK. Program zero-gratification policy diimplementasikan 100%."
      }
    },
    ekonomi: {
      nilaiSakip: 85.9,
      previousSakip: 83.4,
      classification: "A",
      classificationLabel: "Memuaskan",
      opiniBpk: "WTP",
      opiniBpkYears: 5,
      zonaIntegritas: { total: 3, wbk: 2, wbbm: 1 },
      performanceScore: 85.9,
      insights: {
        accountability: "Peningkatan 2,5 poin melalui audit internal berbasis risiko. Kepatuhan dokumentasi 97%.",
        integrity: "Satu unit tambahan mencapai WBK. Pelatihan transparansi & akuntabilitas keuangan diikuti 94% staf."
      }
    },
    kedokteran: {
      nilaiSakip: 91.5,
      previousSakip: 89.1,
      classification: "AA",
      classificationLabel: "Sangat Memuaskan",
      opiniBpk: "WTP",
      opiniBpkYears: 6,
      zonaIntegritas: { total: 4, wbk: 3, wbbm: 1 },
      performanceScore: 91.5,
      insights: {
        accountability: "Peningkatan 2,4 poin, mencapai klasifikasi AA. Sistem akuntansi klinis terintegrasi meningkatkan presisi pelaporan.",
        integrity: "Satu unit tambahan mencapai WBK. Program integritas medis & anti-korupsi diikuti 99% staf."
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

const years = [2023, 2024];

const scoreClassifications = [
  { code: "AA", label: "Sangat Memuaskan", range: ">90", color: "bg-blue-900" },
  { code: "A", label: "Memuaskan", range: "80-90", color: "bg-blue-700" },
  { code: "BB", label: "Sangat Baik", range: "70-80", color: "bg-gray-400" },
  { code: "B", label: "Baik", range: "60-70", color: "bg-gray-300" }
];

// Fungsi agregasi untuk "Semua Fakultas"
function getAggregatedData(dataByYear, year) {
  const yearData = dataByYear[year];
  const facultyKeys = Object.keys(yearData);
  
  let totalSakip = 0, totalPrevSakip = 0;
  let totalZona = { total: 0, wbk: 0, wbbm: 0 };
  let totalOpiniYears = 0;
  let validFaculties = 0;
  
  const allClassifications = {};
  
  facultyKeys.forEach(key => {
    const f = yearData[key];
    totalSakip += f.nilaiSakip;
    totalPrevSakip += f.previousSakip;
    totalZona.total += f.zonaIntegritas.total;
    totalZona.wbk += f.zonaIntegritas.wbk;
    totalZona.wbbm += f.zonaIntegritas.wbbm;
    totalOpiniYears += f.opiniBpkYears;
    allClassifications[f.classification] = (allClassifications[f.classification] || 0) + 1;
    validFaculties++;
  });
  
  const avgSakip = Math.round((totalSakip / validFaculties) * 10) / 10;
  const avgPrevSakip = Math.round((totalPrevSakip / validFaculties) * 10) / 10;
  
  // Find most common classification
  const topClassification = Object.entries(allClassifications).sort((a,b) => b[1]-a[1])[0][0];
  const topClassInfo = scoreClassifications.find(c => c.code === topClassification) || scoreClassifications[1];
  
  return {
    nilaiSakip: avgSakip,
    previousSakip: avgPrevSakip,
    classification: topClassification,
    classificationLabel: topClassInfo.label,
    opiniBpk: "WTP",
    opiniBpkYears: Math.round(totalOpiniYears / validFaculties),
    zonaIntegritas: {
      total: totalZona.total,
      wbk: totalZona.wbk,
      wbbm: totalZona.wbbm
    },
    performanceScore: avgSakip,
    insights: {
      accountability: `Rata-rata dari ${validFaculties} fakultas menunjukkan peningkatan SAKIP sebesar ${(avgSakip - avgPrevSakip).toFixed(1)} poin. ${yearData.kedokteran.nilaiSakip >= yearData.teknik.nilaiSakip ? 'Fakultas Kedokteran' : 'Fakultas Teknik'} memimpin dengan skor ${Math.max(...facultyKeys.map(k=>yearData[k].nilaiSakip))}, didorong oleh digitalisasi sistem pelaporan dan monitoring real-time.`,
      integrity: `Total ${totalZona.total} unit kerja terlibat dalam program Zona Integritas, dengan ${totalZona.wbk} mencapai WBK dan ${totalZona.wbbm} mencapai WBBM. Partisipasi pelatihan anti-korupsi meningkat rata-rata 13% dibanding tahun sebelumnya.`
    }
  };
}

export default function TataKelola() {
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [selectedYear, setSelectedYear] = useState(2024);

  const yearData = dummyData[selectedYear];
  const data = selectedFaculty === "all" 
    ? getAggregatedData(dummyData, selectedYear)
    : yearData[selectedFaculty];

  const sakipChange = data.nilaiSakip - data.previousSakip;

  return (
    <div className="space-y-6">
      {/* Header + Filters */}
      <div className="mt-5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tata Kelola & Akuntabilitas</h1>
            <p className="text-gray-600 mt-2 max-w-3xl">
              Institutional governance performance and integrity metrics.
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
        {/* Nilai SAKIP */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-gray-600" />
              <h3 className="text-gray-700 font-semibold">Nilai SAKIP</h3>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${
              sakipChange >= 0 ? 'bg-teal-100 text-teal-800' : 'bg-red-100 text-red-800'
            }`}>
              <TrendingUp className={`w-3 h-3 ${sakipChange < 0 ? 'rotate-180' : ''}`} />
              {sakipChange >= 0 ? '+' : ''}{sakipChange.toFixed(1)} pts
            </div>
          </div>
          
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-gray-900">{data.nilaiSakip}</span>
            <span className="text-gray-500">/ 100</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">CLASSIFICATION</span>
            <div className="px-3 py-1 bg-blue-100 text-blue-900 rounded-lg text-sm font-bold">
              {data.classification} ({data.classificationLabel})
            </div>
          </div>
        </div>

        {/* Opini BPK */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-gray-600" />
              <h3 className="text-gray-700 font-semibold">Opini BPK</h3>
            </div>
            <span className="text-sm text-gray-500">FY {selectedYear}</span>
          </div>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <CheckCircle2 className="w-8 h-8 text-blue-600" />
            </div>
            <span className="text-4xl font-bold text-blue-900">{data.opiniBpk}</span>
          </div>
          
          <p className="text-sm text-gray-600">
            Wajar Tanpa Pengecualian for {data.opiniBpkYears} consecutive years.
          </p>
        </div>

        {/* Zona Integritas */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start gap-2 mb-4">
            <Shield className="w-5 h-5 text-gray-600" />
            <h3 className="text-gray-700 font-semibold">Zona Integritas</h3>
          </div>
          
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-gray-900">{data.zonaIntegritas.total}</span>
            <span className="text-gray-600">Unit Kerja</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">WBK (Wilayah Bebas Korupsi)</span>
              <span className="font-semibold text-gray-900">{data.zonaIntegritas.wbk}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">WBBM (Wilayah Birokrasi Bersih...)</span>
              <span className="font-semibold text-gray-900">{data.zonaIntegritas.wbbm}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Performance Level */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-gray-900 font-semibold text-lg">Overall Performance Level</h3>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Info className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-12">
            {/* Gauge Chart */}
            <div className="relative w-64 h-32 overflow-hidden">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <svg width="256" height="128" viewBox="0 0 256 128">
                  {/* Background arc */}
                  <path
                    d="M 20 128 A 108 108 0 0 1 236 128"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="24"
                    strokeLinecap="round"
                  />
                  {/* Value arc */}
                  <path
                    d="M 20 128 A 108 108 0 0 1 236 128"
                    fill="none"
                    stroke="#1e3a8a"
                    strokeWidth="24"
                    strokeLinecap="round"
                    strokeDasharray={`${(data.performanceScore / 100) * 339.292} 339.292`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="text-4xl font-bold text-gray-900">{data.performanceScore}</div>
                  <div className="text-sm text-gray-600 font-medium">SCORE</div>
                </div>
              </div>
            </div>

            {/* Score Classification */}
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                SCORE CLASSIFICATION
              </h4>
              <div className="space-y-3">
                {scoreClassifications.map((item) => (
                  <div 
                    key={item.code} 
                    className={`flex items-center gap-3 transition-opacity ${
                      data.classification === item.code ? 'opacity-100' : 'opacity-50'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-semibold text-gray-900 w-32">
                      {item.code} ({item.range})
                    </span>
                    <span className="text-sm text-gray-600">{item.label}</span>
                    {data.classification === item.code && (
                      <span className="ml-auto text-xs font-semibold text-blue-600">← Current</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-gray-900 font-semibold text-lg">Key Insights</h3>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Institutional Accountability</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {data.insights.accountability}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-2">Integrity Zone Expansion</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {data.insights.integrity}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}