import { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Briefcase, 
  GraduationCap, 
  Rocket, 
  Download, 
  Filter,
  Lightbulb,
  ChevronDown
} from "lucide-react";

// Data dummy: [tahun][fakultas]
const dummyData = {
  2024: {
    fasilkom: {
      employed: 64.2, employedChange: "+3.1%",
      study: 21.5, studyChange: "0.0%",
      entrepreneur: 14.3, entrepreneurChange: "-1.2%",
      totalGraduates: 1492,
      trend: [58, 60, 61, 62, 64.2],
      insights: {
        curriculum: "Integrasi magang wajib di Fasilkom berkorelasi dengan penurunan 12% waktu tunggu kerja pertama. Lulusan mendapat posisi relevan dalam rata-rata 3,2 bulan.",
        entrepreneurial: "Penurunan venture wirausaha (-1,2%) mencerminkan preferensi terhadap peran korporat stabil di tengah iklim ekonomi saat ini."
      }
    },
    fkip: {
      employed: 58.7, employedChange: "+2.4%",
      study: 28.3, studyChange: "+1.1%",
      entrepreneur: 13.0, entrepreneurChange: "-0.8%",
      totalGraduates: 2105,
      trend: [52, 54, 56, 57, 58.7],
      insights: {
        curriculum: "Program PPG dan sertifikasi guru meningkatkan daya serap lulusan di sektor pendidikan formal sebesar 18% YoY.",
        entrepreneurial: "Minat wirausaha pendidikan (edupreneur) mulai tumbuh, terutama di bidang kursus online dan konten edukasi."
      }
    },
    teknik: {
      employed: 71.5, employedChange: "+4.2%",
      study: 18.2, studyChange: "-0.5%",
      entrepreneur: 10.3, entrepreneurChange: "-1.8%",
      totalGraduates: 1876,
      trend: [63, 65, 67, 69, 71.5],
      insights: {
        curriculum: "Kolaborasi dengan industri manufaktur dan energi mempercepat penyerapan lulusan di posisi engineering.",
        entrepreneurial: "Startup teknologi engineering masih niche, namun berpotensi dengan dukungan inkubator kampus."
      }
    },
    ekonomi: {
      employed: 62.8, employedChange: "+1.9%",
      study: 24.1, studyChange: "+0.7%",
      entrepreneur: 13.1, entrepreneurChange: "-0.3%",
      totalGraduates: 1654,
      trend: [57, 59, 60, 61, 62.8],
      insights: {
        curriculum: "Sertifikasi profesional (CPA, CFA) dan magang di BUMN meningkatkan employability lulusan Ekonomi.",
        entrepreneurial: "Wirausaha di sektor fintech dan konsultan bisnis mulai diminati generasi muda."
      }
    },
    kedokteran: {
      employed: 82.4, employedChange: "+1.5%",
      study: 15.8, studyChange: "+0.3%",
      entrepreneur: 1.8, entrepreneurChange: "-0.2%",
      totalGraduates: 428,
      trend: [78, 79, 80, 81, 82.4],
      insights: {
        curriculum: "Program ko-asistensi terstruktur dan jejaring rumah sakit mitra menjamin penyerapan tinggi lulusan Kedokteran.",
        entrepreneurial: "Praktik mandiri dan klinik spesialis menjadi jalur wirausaha utama, namun persentasenya tetap kecil."
      }
    }
  },
  2025: {
    fasilkom: {
      employed: 67.8, employedChange: "+3.6%",
      study: 20.1, studyChange: "-1.4%",
      entrepreneur: 12.1, entrepreneurChange: "-2.2%",
      totalGraduates: 1580,
      trend: [60, 61, 62, 64, 67.8],
      insights: {
        curriculum: "Program 'Tech Talent Pipeline' dengan 15+ perusahaan teknologi meningkatkan placement rate secara signifikan.",
        entrepreneurial: "Beberapa alumni meluncurkan startup AI/ML, namun masih memerlukan pendampingan intensif dari inkubator."
      }
    },
    fkip: {
      employed: 61.3, employedChange: "+2.6%",
      study: 26.8, studyChange: "-1.5%",
      entrepreneur: 11.9, entrepreneurChange: "-1.1%",
      totalGraduates: 2240,
      trend: [54, 56, 57, 59, 61.3],
      insights: {
        curriculum: "Digital teaching certification dan platform micro-teaching meningkatkan kompetensi dan daya saing lulusan.",
        entrepreneurial: "Platform edukasi berbasis subscription mulai dilirik sebagai model bisnis berkelanjutan."
      }
    },
    teknik: {
      employed: 74.9, employedChange: "+3.4%",
      study: 17.5, studyChange: "-0.7%",
      entrepreneur: 7.6, entrepreneurChange: "-2.7%",
      totalGraduates: 1920,
      trend: [65, 67, 69, 72, 74.9],
      insights: {
        curriculum: "Green engineering curriculum dan sertifikasi industri 4.0 membuka peluang di sektor energi terbarukan.",
        entrepreneurial: "Konsultan teknis dan kontraktor spesialis menjadi alternatif wirausaha yang semakin diminati."
      }
    },
    ekonomi: {
      employed: 65.4, employedChange: "+2.6%",
      study: 22.9, studyChange: "-1.2%",
      entrepreneur: 11.7, entrepreneurChange: "-1.4%",
      totalGraduates: 1702,
      trend: [59, 60, 61, 63, 65.4],
      insights: {
        curriculum: "Data analytics track dan partnership dengan fintech meningkatkan relevansi kurikulum dengan kebutuhan industri.",
        entrepreneurial: "Financial advisory dan business consulting menjadi jalur wirausaha yang semakin populer."
      }
    },
    kedokteran: {
      employed: 84.1, employedChange: "+1.7%",
      study: 14.5, studyChange: "-1.3%",
      entrepreneur: 1.4, entrepreneurChange: "-0.4%",
      totalGraduates: 445,
      trend: [79, 80, 81, 82, 84.1],
      insights: {
        curriculum: "Telemedicine rotation dan digital health modules mempersiapkan lulusan untuk era kesehatan digital.",
        entrepreneurial: "Klinik spesialis dan praktik bersama (group practice) menjadi model wirausaha yang lebih feasible."
      }
    }
  },
  2026: {
    fasilkom: {
      employed: 71.5, employedChange: "+3.7%",
      study: 18.8, studyChange: "-1.3%",
      entrepreneur: 9.7, entrepreneurChange: "-2.4%",
      totalGraduates: 1645,
      trend: [62, 64, 66, 68, 71.5],
      insights: {
        curriculum: "AI/ML specialization dan industry capstone project menjadi differentiator utama di pasar kerja teknologi.",
        entrepreneurial: "Product studio model memungkinkan alumni membangun startup dengan dukungan ekosistem kampus."
      }
    },
    fkip: {
      employed: 64.2, employedChange: "+2.9%",
      study: 25.1, studyChange: "-1.7%",
      entrepreneur: 10.7, entrepreneurChange: "-1.2%",
      totalGraduates: 2310,
      trend: [56, 58, 60, 62, 64.2],
      insights: {
        curriculum: "Hybrid teaching certification dan educational technology integration meningkatkan employability di era blended learning.",
        entrepreneurial: "EdTech startup dan content creator education menjadi jalur wirausaha yang semakin viable."
      }
    },
    teknik: {
      employed: 78.3, employedChange: "+3.4%",
      study: 16.2, studyChange: "-1.3%",
      entrepreneur: 5.5, entrepreneurChange: "-2.1%",
      totalGraduates: 1985,
      trend: [67, 69, 72, 75, 78.3],
      insights: {
        curriculum: "Sustainability engineering dan smart infrastructure track membuka peluang di proyek nasional dan internasional.",
        entrepreneurial: "Engineering consultancy dan specialized contracting menjadi niche wirausaha dengan margin tinggi."
      }
    },
    ekonomi: {
      employed: 68.9, employedChange: "+3.5%",
      study: 21.4, studyChange: "-1.5%",
      entrepreneur: 9.7, entrepreneurChange: "-2.0%",
      totalGraduates: 1758,
      trend: [61, 63, 64, 66, 68.9],
      insights: {
        curriculum: "ESG finance dan digital economy specialization menjawab kebutuhan industri akan talenta berkelanjutan.",
        entrepreneurial: "Sustainable business consulting dan impact investing advisory menjadi tren wirausaha baru."
      }
    },
    kedokteran: {
      employed: 86.2, employedChange: "+2.1%",
      study: 13.1, studyChange: "-1.4%",
      entrepreneur: 0.7, entrepreneurChange: "-0.7%",
      totalGraduates: 462,
      trend: [80, 81, 82, 84, 86.2],
      insights: {
        curriculum: "Precision medicine track dan hospital management modules memperkuat kompetensi klinis dan manajerial.",
        entrepreneurial: "Specialized clinic chains dan digital health platforms menjadi model wirausaha skala menengah."
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

const years = [2024, 2025, 2026];

// Fungsi agregasi untuk "Semua Fakultas"
function getAggregatedData(dataByYear, year) {
  const yearData = dataByYear[year];
  const facultyKeys = Object.keys(yearData);
  
  let totalEmployed = 0, totalStudy = 0, totalEntrepreneur = 0;
  let totalGraduates = 0;
  let employedChanges = [], studyChanges = [], entrepreneurChanges = [];
  let allTrends = [];
  
  facultyKeys.forEach(key => {
    const f = yearData[key];
    totalEmployed += f.employed;
    totalStudy += f.study;
    totalEntrepreneur += f.entrepreneur;
    totalGraduates += f.totalGraduates;
    employedChanges.push(parseFloat(f.employedChange.replace(/[+%]/g, '')));
    studyChanges.push(parseFloat(f.studyChange.replace(/[+%]/g, '')));
    entrepreneurChanges.push(parseFloat(f.entrepreneurChange.replace(/[+%]/g, '')));
    allTrends.push(...f.trend);
  });
  
  const count = facultyKeys.length;
  
  // Hitung trend 5 tahun agregat (rata-rata per tahun)
  const aggregatedTrend = [];
  for (let i = 0; i < 5; i++) {
    const yearValues = facultyKeys.map(k => yearData[k].trend[i]);
    aggregatedTrend.push(Math.round((yearValues.reduce((a,b)=>a+b,0)/count)*10)/10);
  }
  
  return {
    employed: Math.round((totalEmployed/count)*10)/10,
    employedChange: `+${(employedChanges.reduce((a,b)=>a+b,0)/count).toFixed(1)}%`,
    study: Math.round((totalStudy/count)*10)/10,
    studyChange: `${(studyChanges.reduce((a,b)=>a+b,0)/count).toFixed(1)}%`,
    entrepreneur: Math.round((totalEntrepreneur/count)*10)/10,
    entrepreneurChange: `${(entrepreneurChanges.reduce((a,b)=>a+b,0)/count).toFixed(1)}%`,
    totalGraduates,
    trend: aggregatedTrend,
    insights: {
      curriculum: `Rata-rata employability dari ${count} fakultas menunjukkan tren positif. ${yearData.teknik.employed > yearData.fasilkom.employed ? 'Fakultas Teknik' : 'Fakultas Ilmu Komputer'} memimpin dengan ${Math.max(...facultyKeys.map(k=>yearData[k].employed))}% penyerapan kerja, didorong oleh kolaborasi industri dan kurikulum berbasis proyek.`,
      entrepreneurial: "Secara keseluruhan, minat wirausaha mengalami penurunan moderat, mencerminkan preferensi terhadap stabilitas karir di sektor formal. Program inkubasi kampus perlu diintensifkan untuk mendorong ekosistem startup yang lebih kuat."
    }
  };
}

export default function LulusanTerserap() {
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [selectedYear, setSelectedYear] = useState(2024);

  // Ambil data berdasarkan filter
  const yearData = dummyData[selectedYear];
  const currentData = selectedFaculty === "all" 
    ? getAggregatedData(dummyData, selectedYear)
    : yearData[selectedFaculty];

  // Metrics untuk cards
  const metrics = [
    {
      title: "Employed",
      value: `${currentData.employed}%`,
      change: currentData.employedChange,
      trend: currentData.employedChange.includes('+') || currentData.employedChange.includes('0') ? "up" : "down",
      icon: Briefcase,
      color: "blue"
    },
    {
      title: "Continuing Study",
      value: `${currentData.study}%`,
      change: currentData.studyChange,
      trend: currentData.studyChange.includes('+') ? "up" : currentData.studyChange.includes('-') ? "down" : "neutral",
      icon: GraduationCap,
      color: "gray"
    },
    {
      title: "Entrepreneurship",
      value: `${currentData.entrepreneur}%`,
      change: currentData.entrepreneurChange,
      trend: currentData.entrepreneurChange.includes('+') ? "up" : "down",
      icon: Rocket,
      color: "red"
    }
  ];

  // Data untuk outcome distribution (dinamis)
  const outcomes = [
    { label: "Employed", value: `${currentData.employed}%`, color: "bg-blue-600" },
    { label: "Continuing Study", value: `${currentData.study}%`, color: "bg-teal-400" },
    { label: "Entrepreneur", value: `${currentData.entrepreneur}%`, color: "bg-red-400" }
  ];

  // Data untuk trend chart (5 tahun)
  const trendData = [
    { year: "2022", value: currentData.trend[0] },
    { year: "2023", value: currentData.trend[1] },
    { year: "2024", value: currentData.trend[2] },
    { year: "2025", value: currentData.trend[3] },
    { year: "2026", value: currentData.trend[4] }
  ].filter((_, i) => selectedYear >= 2022 + i); // Sesuaikan dengan tahun yang dipilih

  const getTrendIcon = (trend) => {
    switch(trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-teal-600" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend) => {
    switch(trend) {
      case "up": return "bg-teal-50 text-teal-700";
      case "down": return "bg-red-50 text-red-700";
      default: return "bg-gray-50 text-gray-700";
    }
  };

  // Hitung strokeDashoffset untuk donut chart
  const circumference = 2 * Math.PI * 40; // r=40
  const employedOffset = circumference - (currentData.employed / 100) * circumference;
  const studyOffset = employedOffset - (currentData.study / 100) * circumference;
  const entrepreneurOffset = studyOffset - (currentData.entrepreneur / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Header + Filters */}
      <div className="flex items-start justify-between">
        <div className="mt-5">
          <h1 className="text-2xl font-bold text-gray-900">Lulusan Terserap</h1>
          <p className="text-gray-600 mt-1 max-w-3xl">
            Memantau persentase lulusan yang terserap ke dunia kerja, melanjutkan pendidikan, atau membuka usaha mandiri dalam waktu 12 bulan setelah lulus.
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mt-5 md:mt-0">
          {/* Faculty Filter */}
          <div className="relative mt-7">
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

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-gray-900 font-semibold">{metric.title}</h3>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  metric.color === "blue" ? "bg-blue-100" : 
                  metric.color === "red" ? "bg-red-100" : "bg-gray-100"
                }`}>
                  <Icon className={`w-5 h-5 ${
                    metric.color === "blue" ? "text-blue-600" : 
                    metric.color === "red" ? "text-red-600" : "text-gray-600"
                  }`} />
                </div>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
              </div>
              <div className={`mt-2 inline-flex items-center gap-1 px-2 py-1 rounded text-sm font-medium ${getTrendColor(metric.trend)}`}>
                {getTrendIcon(metric.trend)}
                {metric.change}
                <span className="text-gray-600 ml-1">vs last academic year</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Outcome Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 font-semibold mb-6">Outcome Distribution</h3>
          
          {/* Circular visualization */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                {/* Employed - Blue */}
                <circle
                  cx="50" cy="50" r="40" fill="none" stroke="#1e40af" strokeWidth="20"
                  strokeDasharray={circumference}
                  strokeDashoffset={employedOffset}
                  className="transition-all duration-1000"
                  strokeLinecap="round"
                />
                {/* Study - Teal */}
                <circle
                  cx="50" cy="50" r="40" fill="none" stroke="#2dd4bf" strokeWidth="20"
                  strokeDasharray={circumference}
                  strokeDashoffset={studyOffset}
                  className="transition-all duration-1000"
                  strokeLinecap="round"
                />
                {/* Entrepreneur - Red */}
                <circle
                  cx="50" cy="50" r="40" fill="none" stroke="#f87171" strokeWidth="20"
                  strokeDasharray={circumference}
                  strokeDashoffset={entrepreneurOffset}
                  className="transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-2xl font-bold text-gray-900">{currentData.totalGraduates.toLocaleString()}</span>
                <span className="text-sm text-gray-600">Total Graduates</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {outcomes.map((outcome) => (
              <div key={outcome.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${outcome.color}`}></div>
                  <span className="text-sm text-gray-600">{outcome.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{outcome.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Year Employment Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900 font-semibold">5-Year Employment Trend</h3>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                <option>All Faculties</option>
                <option>Employed</option>
                <option>Continuing Study</option>
                <option>Entrepreneur</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Simple bar chart visualization */}
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {trendData.map((data, index) => (
              <div key={data.year} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative">
                  <div 
                    className="bg-blue-600 rounded-t-lg transition-all duration-500 hover:bg-blue-700"
                    style={{ 
                      height: `${(data.value / 100) * 200}px`,
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 font-medium">{data.year}</span>
              </div>
            ))}
          </div>

          {/* Y-axis labels */}
          <div className="flex justify-between mt-2 text-xs text-gray-500 px-2">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Strategic Insights */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          Strategic Insights & Relevance
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Insight 1 */}
          <div className="border-l-4 border-teal-400 pl-4 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">Curriculum Alignment Success</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {currentData.insights.curriculum}
            </p>
          </div>

          {/* Insight 2 */}
          <div className="border-l-4 border-red-300 pl-4 py-2">
            <h4 className="font-semibold text-gray-900 mb-2">Entrepreneurial Shift</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {currentData.insights.entrepreneurial}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}