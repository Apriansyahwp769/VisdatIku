import { useState } from "react";
import { TrendingUp, Users, FileText, ChevronDown, CheckCircle2, AlertTriangle, ArrowUpRight, Building2, MapPin, Briefcase } from "lucide-react";

// Data dummy lengkap: [tahun][fakultas]
const dummyData = {
  2024: {
    fasilkom: {
      staffInvolvement: 38.2,
      trend: "+3.8%",
      activeContributors: 145,
      policiesImpacted: 12,
      byLevel: {
        national: { percentage: 48, count: 70 },
        regional: { percentage: 32, count: 46 },
        industry: { percentage: 20, count: 29 }
      },
      insights: {
        national: "Kontribusi utama pada standar kurikulum nasional dan kerangka kualifikasi pendidikan tinggi bidang komputer.",
        industry: "Peningkatan 15% dalam peran advisory board di perusahaan teknologi.",
        regional: "Perlu peningkatan keterlibatan dalam kebijakan daerah terkait digitalisasi pemerintahan."
      }
    },
    fkip: {
      staffInvolvement: 42.5,
      trend: "+5.2%",
      activeContributors: 198,
      policiesImpacted: 18,
      byLevel: {
        national: { percentage: 52, count: 103 },
        regional: { percentage: 35, count: 69 },
        industry: { percentage: 13, count: 26 }
      },
      insights: {
        national: "Kontribusi signifikan dalam penyusunan kebijakan pendidikan nasional dan standar kompetensi guru.",
        industry: "Keterlibatan dalam pengembangan kurikulum pelatihan korporat untuk sektor pendidikan.",
        regional: "Aktif dalam penyusunan perda pendidikan di 5 provinsi."
      }
    },
    teknik: {
      staffInvolvement: 35.8,
      trend: "+4.1%",
      activeContributors: 167,
      policiesImpacted: 15,
      byLevel: {
        national: { percentage: 42, count: 70 },
        regional: { percentage: 33, count: 55 },
        industry: { percentage: 25, count: 42 }
      },
      insights: {
        national: "Kontribusi pada standar kompetensi insinyur dan kebijakan energi terbarukan.",
        industry: "Peran advisory di 12 BUMN dan perusahaan infrastruktur.",
        regional: "Keterlibatan dalam perencanaan infrastruktur daerah."
      }
    },
    ekonomi: {
      staffInvolvement: 31.2,
      trend: "+2.9%",
      activeContributors: 142,
      policiesImpacted: 11,
      byLevel: {
        national: { percentage: 40, count: 57 },
        regional: { percentage: 38, count: 54 },
        industry: { percentage: 22, count: 31 }
      },
      insights: {
        national: "Kontribusi pada kebijakan ekonomi makro dan regulasi sektor keuangan.",
        industry: "Advisory board di lembaga keuangan dan fintech.",
        regional: "Pendampingan penyusunan APBD di 8 daerah."
      }
    },
    kedokteran: {
      staffInvolvement: 45.6,
      trend: "+6.1%",
      activeContributors: 212,
      policiesImpacted: 22,
      byLevel: {
        national: { percentage: 55, count: 117 },
        regional: { percentage: 30, count: 64 },
        industry: { percentage: 15, count: 31 }
      },
      insights: {
        national: "Kontribusi utama dalam kebijakan kesehatan nasional dan standar praktik medis.",
        industry: "Keterlibatan dalam standar protokol kesehatan industri.",
        regional: "Pendampingan kebijakan kesehatan daerah pasca-pandemi."
      }
    }
  },
  2025: {
    fasilkom: {
      staffInvolvement: 41.5,
      trend: "+3.3%",
      activeContributors: 158,
      policiesImpacted: 14,
      byLevel: {
        national: { percentage: 50, count: 79 },
        regional: { percentage: 33, count: 52 },
        industry: { percentage: 17, count: 27 }
      },
      insights: {
        national: "Ekspansi kontribusi pada kebijakan AI dan transformasi digital nasional.",
        industry: "Peningkatan peran dalam corporate digital transformation advisory.",
        regional: "Mulai terlibat dalam smart city initiatives di 3 kota."
      }
    },
    fkip: {
      staffInvolvement: 45.8,
      trend: "+3.3%",
      activeContributors: 214,
      policiesImpacted: 20,
      byLevel: {
        national: { percentage: 54, count: 116 },
        regional: { percentage: 34, count: 73 },
        industry: { percentage: 12, count: 25 }
      },
      insights: {
        national: "Kontribusi pada kebijakan Merdeka Belajar dan digitalisasi pendidikan.",
        industry: "Pengembangan corporate training standards.",
        regional: "Ekspansi ke 7 provinsi untuk penyusunan kebijakan pendidikan."
      }
    },
    teknik: {
      staffInvolvement: 38.9,
      trend: "+3.1%",
      activeContributors: 181,
      policiesImpacted: 17,
      byLevel: {
        national: { percentage: 44, count: 80 },
        regional: { percentage: 34, count: 62 },
        industry: { percentage: 22, count: 39 }
      },
      insights: {
        national: "Kontribusi pada kebijakan infrastruktur berkelanjutan dan IKN.",
        industry: "Advisory di 15 proyek strategis nasional.",
        regional: "Keterlibatan dalam perencanaan infrastruktur hijau."
      }
    },
    ekonomi: {
      staffInvolvement: 34.6,
      trend: "+3.4%",
      activeContributors: 157,
      policiesImpacted: 13,
      byLevel: {
        national: { percentage: 42, count: 66 },
        regional: { percentage: 37, count: 58 },
        industry: { percentage: 21, count: 33 }
      },
      insights: {
        national: "Kontribusi pada kebijakan ekonomi digital dan UMKM.",
        industry: "Peningkatan peran dalam financial regulation advisory.",
        regional: "Pendampingan 12 daerah dalam pemulihan ekonomi."
      }
    },
    kedokteran: {
      staffInvolvement: 48.2,
      trend: "+2.6%",
      activeContributors: 224,
      policiesImpacted: 24,
      byLevel: {
        national: { percentage: 56, count: 125 },
        regional: { percentage: 31, count: 69 },
        industry: { percentage: 13, count: 30 }
      },
      insights: {
        national: "Kontribusi pada kebijakan kesehatan preventif dan universal health coverage.",
        industry: "Standarisasi occupational health di industri.",
        regional: "Penguatan sistem kesehatan daerah."
      }
    }
  },
  2026: {
    fasilkom: {
      staffInvolvement: 34.5,
      trend: "+4.2%",
      activeContributors: 1248,
      policiesImpacted: 86,
      byLevel: {
        national: { percentage: 45, count: 561 },
        regional: { percentage: 35, count: 436 },
        industry: { percentage: 20, count: 251 }
      },
      insights: {
        national: "The institution's primary contribution remains at the national level, driving core educational frameworks and digital transformation policies.",
        industry: "Corporate advisory roles have seen a 12% YoY increase, particularly in the Engineering and Tech faculties.",
        regional: "Local government policy engagement is lagging behind targets. Strategic outreach is recommended."
      }
    },
    fkip: {
      staffInvolvement: 48.3,
      trend: "+2.5%",
      activeContributors: 225,
      policiesImpacted: 22,
      byLevel: {
        national: { percentage: 55, count: 124 },
        regional: { percentage: 33, count: 74 },
        industry: { percentage: 12, count: 27 }
      },
      insights: {
        national: "Leadership in national education policy reform and teacher competency standards.",
        industry: "Development of corporate learning & development frameworks.",
        regional: "Strategic partnerships with 10 provincial education offices."
      }
    },
    teknik: {
      staffInvolvement: 41.2,
      trend: "+2.3%",
      activeContributors: 192,
      policiesImpacted: 19,
      byLevel: {
        national: { percentage: 46, count: 88 },
        regional: { percentage: 33, count: 63 },
        industry: { percentage: 21, count: 41 }
      },
      insights: {
        national: "Key contributor to sustainable infrastructure and renewable energy policies.",
        industry: "Advisory roles in 18 major infrastructure projects.",
        regional: "Green building and smart city policy development."
      }
    },
    ekonomi: {
      staffInvolvement: 37.8,
      trend: "+3.2%",
      activeContributors: 172,
      policiesImpacted: 15,
      byLevel: {
        national: { percentage: 43, count: 74 },
        regional: { percentage: 36, count: 62 },
        industry: { percentage: 21, count: 36 }
      },
      insights: {
        national: "Influence on digital economy and MSME development policies.",
        industry: "Financial inclusion and fintech regulation advisory.",
        regional: "Economic recovery strategy for 15 regions."
      }
    },
    kedokteran: {
      staffInvolvement: 50.1,
      trend: "+1.9%",
      activeContributors: 233,
      policiesImpacted: 26,
      byLevel: {
        national: { percentage: 57, count: 133 },
        regional: { percentage: 30, count: 70 },
        industry: { percentage: 13, count: 30 }
      },
      insights: {
        national: "Leading role in national health security and medical education standards.",
        industry: "Workplace health and safety protocol development.",
        regional: "Regional health system strengthening initiatives."
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

// Fungsi untuk menghitung rata-rata/agregat semua fakultas
function getAggregatedData(dataByYear, year) {
  const yearData = dataByYear[year];
  const facultyKeys = Object.keys(yearData);
  
  let totalInvolvement = 0;
  let totalContributors = 0;
  let totalPolicies = 0;
  let validFaculties = 0;
  
  const levelTotals = {
    national: { percentage: 0, count: 0 },
    regional: { percentage: 0, count: 0 },
    industry: { percentage: 0, count: 0 }
  };
  
  facultyKeys.forEach(facultyKey => {
    const faculty = yearData[facultyKey];
    totalInvolvement += faculty.staffInvolvement;
    totalContributors += faculty.activeContributors;
    totalPolicies += faculty.policiesImpacted;
    validFaculties++;
    
    Object.keys(levelTotals).forEach(level => {
      levelTotals[level].percentage += faculty.byLevel[level].percentage;
      levelTotals[level].count += faculty.byLevel[level].count;
    });
  });
  
  const avgInvolvement = totalInvolvement / validFaculties;
  
  // Calculate percentages for aggregated data
  const totalCount = levelTotals.national.count + levelTotals.regional.count + levelTotals.industry.count;
  
  return {
    staffInvolvement: Math.round(avgInvolvement * 10) / 10,
    trend: "+3.5%",
    activeContributors: totalContributors,
    policiesImpacted: totalPolicies,
    byLevel: {
      national: { 
        percentage: Math.round((levelTotals.national.count / totalCount) * 100), 
        count: levelTotals.national.count 
      },
      regional: { 
        percentage: Math.round((levelTotals.regional.count / totalCount) * 100), 
        count: levelTotals.regional.count 
      },
      industry: { 
        percentage: Math.round((levelTotals.industry.count / totalCount) * 100), 
        count: levelTotals.industry.count 
      }
    },
    insights: {
      national: `National-level engagement remains the primary focus with ${levelTotals.national.count} staff contributors (${Math.round((levelTotals.national.count / totalCount) * 100)}%), driving institutional influence on federal policies and standards.`,
      industry: `Industry advisory roles show strong growth with ${levelTotals.industry.count} active contributors, particularly in Engineering, Technology, and Medical faculties with 12% YoY increase.`,
      regional: `Regional engagement at ${Math.round((levelTotals.regional.count / totalCount) * 100)}% requires strategic enhancement. Current ${levelTotals.regional.count} staff involved in provincial policy-making should be expanded.`
    }
  };
}

export default function SdmKebijakan() {
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [selectedYear, setSelectedYear] = useState(2024);

  const yearData = dummyData[selectedYear];
  const currentData = selectedFaculty === "all" 
    ? getAggregatedData(dummyData, selectedYear)
    : yearData[selectedFaculty];

  const involvementLevels = [
    { 
      key: "national", 
      label: "National / Federal", 
      icon: Building2,
      percentage: currentData.byLevel.national.percentage,
      count: currentData.byLevel.national.count,
      color: "bg-blue-900"
    },
    { 
      key: "regional", 
      label: "Regional / Provincial", 
      icon: MapPin,
      percentage: currentData.byLevel.regional.percentage,
      count: currentData.byLevel.regional.count,
      color: "bg-slate-600"
    },
    { 
      key: "industry", 
      label: "Industry / Corporate Board", 
      icon: Briefcase,
      percentage: currentData.byLevel.industry.percentage,
      count: currentData.byLevel.industry.count,
      color: "bg-teal-700"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mt-5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>Performance Dashboard</span>
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              <span className="text-blue-600 font-medium">IKU 8</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">SDM dalam Kebijakan</h1>
            <p className="text-gray-600 mt-2 max-w-3xl">
              Monitoring the involvement of academic staff in policy-making at national, regional, and institutional levels.
            </p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <select
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-gray-400 transition"
              >
                {faculties.map((f) => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-gray-400 transition"
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

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Staff Involvement */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-gray-700 font-semibold text-lg">Staff Involvement</h3>
              <div className="mt-3">
                <span className="text-4xl font-bold text-gray-900">{currentData.staffInvolvement}%</span>
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                  {currentData.trend}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Of total academic staff</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Active Contributors */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-gray-700 font-semibold text-lg">Active Contributors</h3>
              <div className="mt-3">
                <span className="text-4xl font-bold text-gray-900">{currentData.activeContributors.toLocaleString()}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Staff members actively engaged</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Policies Impacted */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-gray-700 font-semibold text-lg">Policies Impacted</h3>
              <div className="mt-3">
                <span className="text-4xl font-bold text-gray-900">{currentData.policiesImpacted}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Documented policy contributions YTD</p>
            </div>
            <div className="p-3 bg-cyan-100 rounded-lg">
              <FileText className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Involvement by Level */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900 font-semibold text-lg">Involvement by Level</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View Details
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-6">
            {involvementLevels.map((level) => {
              const Icon = level.icon;
              return (
                <div key={level.key}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">{level.label}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {level.percentage}% ({level.count} staff)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`${level.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${level.percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Key Insights */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 font-semibold text-lg mb-6 flex items-center gap-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-gray-600" />
            </div>
            Key Insights
          </h3>
          
          <div className="space-y-6">
            {/* National Prominence */}
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">National Prominence</h4>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {currentData.insights.national}
                </p>
              </div>
            </div>

            {/* Industry Growth */}
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Industry Growth</h4>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {currentData.insights.industry}
                </p>
              </div>
            </div>

            {/* Regional Gap */}
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Regional Gap</h4>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {currentData.insights.regional}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}