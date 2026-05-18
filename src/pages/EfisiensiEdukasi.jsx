import { useState } from "react";
import { Clock, TrendingUp, Target, Lightbulb, ChevronDown } from "lucide-react";

// Data dummy lengkap: [tahun][fakultas]
const dummyData = {
  2024: {
    fasilkom: {
      graduationRate: 84.5,
      trend: "+2.1%",
      target: 90.0,
      byLevel: { D3: 92, S1: 86, S2: 78, S3: 65 },
      insights: {
        gap: "5,5%",
        gapDesc: "Terdapat kesenjangan sebesar 5,5% antara realisasi saat ini (84,5%) dan target institusional (90,0%). Penurunan terbesar terjadi pada tingkat S3 (Doktor), yang saat ini berada pada efisiensi 65%.",
        trendDesc: "Meskipun terdapat kesenjangan, tren secara keseluruhan positif dengan peningkatan sebesar 2,1% dari semester akademik sebelumnya. Intervensi dalam proses pembimbingan tesis S2 telah menghasilkan peningkatan yang terukur."
      }
    },
    fkip: {
      graduationRate: 78.2,
      trend: "+1.8%",
      target: 88.0,
      byLevel: { D3: 88, S1: 82, S2: 71, S3: 58 },
      insights: {
        gap: "9,8%",
        gapDesc: "Kesenjangan 9,8% terutama disebabkan oleh tingkat kelulusan S3 yang masih rendah (58%). Program mentoring dosen pembimbing perlu dioptimalkan.",
        trendDesc: "Peningkatan 1,8% didorong oleh perbaikan sistem administrasi akademik dan digitalisasi proses bimbingan skripsi."
      }
    },
    teknik: {
      graduationRate: 81.3,
      trend: "+3.4%",
      target: 89.0,
      byLevel: { D3: 90, S1: 84, S2: 75, S3: 62 },
      insights: {
        gap: "7,7%",
        gapDesc: "Fokus perbaikan pada program S3 dengan penambahan kuota beasiswa penelitian kolaboratif dengan industri.",
        trendDesc: "Pertumbuhan tertinggi (+3,4%) berkat program magang terintegrasi dan kurikulum berbasis proyek."
      }
    },
    ekonomi: {
      graduationRate: 76.8,
      trend: "+0.9%",
      target: 87.0,
      byLevel: { D3: 85, S1: 79, S2: 68, S3: 54 },
      insights: {
        gap: "10,2%",
        gapDesc: "Tantangan utama pada tingkat S3 dengan efisiensi 54%. Diperlukan revitalisasi program doktor melalui kemitraan internasional.",
        trendDesc: "Peningkatan moderat (+0,9%) seiring adaptasi metode pembelajaran hybrid pasca-pandemi."
      }
    },
    kedokteran: {
      graduationRate: 88.9,
      trend: "+1.2%",
      target: 92.0,
      byLevel: { D3: null, S1: 91, S2: 87, S3: 72 },
      insights: {
        gap: "3,1%",
        gapDesc: "Performa terbaik di antara fakultas. Fokus saat ini pada peningkatan kelulusan program spesialis (S3).",
        trendDesc: "Stabilitas tinggi dengan peningkatan konsisten berkat sistem ko-asistensi yang terstruktur."
      }
    }
  },
  2025: {
    fasilkom: {
      graduationRate: 86.7,
      trend: "+2.2%",
      target: 90.0,
      byLevel: { D3: 94, S1: 88, S2: 81, S3: 69 },
      insights: {
        gap: "3,3%",
        gapDesc: "Kesenjangan menyusut menjadi 3,3% berkat program percepatan kelulusan S3 melalui kolaborasi riset dengan industri teknologi.",
        trendDesc: "Peningkatan 2,2% didorong oleh implementasi AI-assisted academic advising system."
      }
    },
    fkip: {
      graduationRate: 80.5,
      trend: "+2.3%",
      target: 88.0,
      byLevel: { D3: 90, S1: 84, S2: 74, S3: 61 },
      insights: {
        gap: "7,5%",
        gapDesc: "Program beasiswa penelitian untuk mahasiswa S3 mulai menunjukkan dampak positif pada retensi dan kelulusan.",
        trendDesc: "Akselerasi signifikan (+2,3%) setelah integrasi platform LMS dengan sistem monitoring progres akademik."
      }
    },
    teknik: {
      graduationRate: 84.1,
      trend: "+2.8%",
      target: 89.0,
      byLevel: { D3: 92, S1: 86, S2: 78, S3: 66 },
      insights: {
        gap: "4,9%",
        gapDesc: "Kolaborasi triple helix (akademisi-bisnis-pemerintah) mempercepat penyelesaian tesis S3 di bidang energi terbarukan.",
        trendDesc: "Pertumbuhan tertinggi kedua (+2,8%) dengan fokus pada project-based learning dan industri 4.0."
      }
    },
    ekonomi: {
      graduationRate: 79.2,
      trend: "+2.4%",
      target: 87.0,
      byLevel: { D3: 87, S1: 81, S2: 72, S3: 59 },
      insights: {
        gap: "7,8%",
        gapDesc: "Peningkatan signifikan pada S3 (+5 poin) setelah program joint-degree dengan universitas mitra di ASEAN.",
        trendDesc: "Rebound positif (+2,4%) seiring pemulihan ekonomi dan peningkatan minat penelitian terapan."
      }
    },
    kedokteran: {
      graduationRate: 90.3,
      trend: "+1.4%",
      target: 92.0,
      byLevel: { D3: null, S1: 93, S2: 89, S3: 75 },
      insights: {
        gap: "1,7%",
        gapDesc: "Hampir mencapai target institusional. Fokus pada optimalisasi waktu residensi untuk percepatan kelulusan spesialis.",
        trendDesc: "Konsistensi performa dengan peningkatan stabil berkat digitalisasi rekam medis pendidikan."
      }
    }
  },
  2026: {
    fasilkom: {
      graduationRate: 89.1,
      trend: "+2.4%",
      target: 90.0,
      byLevel: { D3: 96, S1: 91, S2: 85, S3: 74 },
      insights: {
        gap: "0,9%",
        gapDesc: "Hampir mencapai target! Program akselerasi S3 dengan skema 'fast-track research' berhasil meningkatkan efisiensi hingga 74%.",
        trendDesc: "Pertumbuhan berkelanjutan (+2,4%) dengan adopsi full-stack digital campus ecosystem."
      }
    },
    fkip: {
      graduationRate: 83.8,
      trend: "+3.3%",
      target: 88.0,
      byLevel: { D3: 93, S1: 87, S2: 78, S3: 67 },
      insights: {
        gap: "4,2%",
        gapDesc: "Kesenjangan menyusut signifikan. Program 'Guru Penggerak Digital' meningkatkan motivasi dan kelulusan mahasiswa S3.",
        trendDesc: "Lompatan tertinggi tahun ini (+3,3%) berkat integrasi micro-credentials dalam kurikulum."
      }
    },
    teknik: {
      graduationRate: 87.5,
      trend: "+3.4%",
      target: 89.0,
      byLevel: { D3: 94, S1: 89, S2: 82, S3: 71 },
      insights: {
        gap: "1,5%",
        gapDesc: "Target hampir tercapai! Kolaborasi riset dengan BUMN dan startup teknologi mempercepat penyelesaian disertasi.",
        trendDesc: "Pertumbuhan konsisten (+3,4%) dengan fokus pada sustainability engineering dan green technology."
      }
    },
    ekonomi: {
      graduationRate: 82.6,
      trend: "+3.4%",
      target: 87.0,
      byLevel: { D3: 90, S1: 84, S2: 76, S3: 64 },
      insights: {
        gap: "4,4%",
        gapDesc: "Peningkatan pesat pada S3 (+5 poin) setelah program 'Research Excellence Grant' dan kemitraan dengan bank sentral.",
        trendDesc: "Rebound kuat (+3,4%) seiring transformasi digital ekonomi dan peningkatan kualitas penelitian terapan."
      }
    },
    kedokteran: {
      graduationRate: 91.8,
      trend: "+1.5%",
      target: 92.0,
      byLevel: { D3: null, S1: 94, S2: 91, S3: 78 },
      insights: {
        gap: "0,2%",
        gapDesc: "Target institusional hampir tercapai! Fokus akhir pada optimalisasi program spesialis dengan skema 'competency-based progression'.",
        trendDesc: "Stabilitas tinggi dengan peningkatan marginal (+1,5%) menuju excellence dalam pendidikan kedokteran."
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
  
  let totalGraduationRate = 0;
  let totalTarget = 0;
  const levelTotals = {};
  const levelCounts = {};
  let validFaculties = 0;
  
  // Hitung rata-rata untuk setiap fakultas
  facultyKeys.forEach(facultyKey => {
    const faculty = yearData[facultyKey];
    totalGraduationRate += faculty.graduationRate;
    totalTarget += faculty.target;
    validFaculties++;
    
    // Agregasi per level pendidikan
    Object.entries(faculty.byLevel).forEach(([level, value]) => {
      if (value !== null) {
        levelTotals[level] = (levelTotals[level] || 0) + value;
        levelCounts[level] = (levelCounts[level] || 0) + 1;
      }
    });
  });
  
  // Hitung rata-rata
  const avgGraduationRate = totalGraduationRate / validFaculties;
  const avgTarget = totalTarget / validFaculties;
  
  // Hitung rata-rata per level
  const avgByLevel = {};
  Object.keys(levelTotals).forEach(level => {
    avgByLevel[level] = Math.round((levelTotals[level] / levelCounts[level]) * 10) / 10;
  });
  
  // Hitung trend rata-rata
  const trends = facultyKeys.map(k => parseFloat(yearData[k].trend.replace('+', '')));
  const avgTrend = (trends.reduce((a, b) => a + b, 0) / trends.length).toFixed(1);
  
  return {
    graduationRate: Math.round(avgGraduationRate * 10) / 10,
    trend: `+${avgTrend}%`,
    target: Math.round(avgTarget * 10) / 10,
    byLevel: avgByLevel,
    insights: {
      gap: `${(avgTarget - avgGraduationRate).toFixed(1)}%`,
      gapDesc: `Rata-rata kesenjangan dari ${validFaculties} fakultas. Fakultas Kedokteran menunjukkan performa terbaik (${yearData.kedokteran.graduationRate}%), sementara FKIP memerlukan perhatian khusus (${yearData.fkip.graduationRate}%).`,
      trendDesc: `Pertumbuhan rata-rata +${avgTrend}% menunjukkan tren positif di seluruh fakultas. Fasilkom dan Teknik memimpin dengan peningkatan di atas 2%, didorong oleh digitalisasi dan kolaborasi industri.`
    }
  };
}

export default function EfisiensiEdukasi() {
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [selectedYear, setSelectedYear] = useState(2024);

  // Ambil data berdasarkan filter
  const yearData = dummyData[selectedYear];
  const currentData = selectedFaculty === "all" 
    ? getAggregatedData(dummyData, selectedYear)
    : yearData[selectedFaculty];
    
  const pendidikanData = Object.entries(currentData.byLevel)
    .filter(([_, value]) => value !== null) // Filter null (misal: D3 untuk Kedokteran)
    .map(([level, nilai]) => ({ level, nilai }));

  return (
    <div className="space-y-6">
      {/* Header + Filters */}
      <div className="mt-5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Efisiensi Edukasi</h1>
            <p className="text-gray-600 mt-1">
              Memantau jadwal kelulusan siswa dan metrik efisiensi pendidikan.
            </p>
          </div>
          
          {/* Filters */}
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

      {/* Top Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Tingkat Kelulusan */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-gray-700 font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Tingkat Kelulusan Tepat Waktu
              </h3>
              <div className="mt-3">
                <span className="text-4xl font-bold text-gray-900">{currentData.graduationRate}%</span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                {currentData.trend} vs Semester Terakhir
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Target vs Pencapaian */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-700 font-semibold flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-blue-600" />
            Target vs Pencapaian
          </h3>
          
          <div className="space-y-4">
            {/* Institutional Target */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Institutional Target (Ideal)</span>
                <span className="font-semibold text-gray-900">{currentData.target}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-300 h-2 rounded-full" style={{ width: `${currentData.target}%` }}></div>
              </div>
            </div>

            {/* Pencapaian */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Pencapaian</span>
                <span className="font-semibold text-gray-900">{currentData.graduationRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-700 h-2 rounded-full" style={{ width: `${currentData.graduationRate}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Efisiensi berdasarkan Tingkat Pendidikan */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 font-semibold mb-6">
            Efisiensi berdasarkan Tingkat Pendidikan
          </h3>
          
          <div className="space-y-4">
            {pendidikanData.map((item) => (
              <div key={item.level} className="flex items-center gap-4">
                <span className="w-12 text-sm font-medium text-gray-700">{item.level}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="bg-blue-800 h-full rounded-full flex items-center justify-end px-3 transition-all duration-500"
                    style={{ width: `${item.nilai}%` }}
                  >
                    <span className="text-white text-sm font-semibold">{item.nilai}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Wawasan Kinerja */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            Wawasan Kinerja
          </h3>
          
          <div className="space-y-4">
            {/* Kesenjangan Kinerja */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                KESENJANGAN KINERJA
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {currentData.insights.gapDesc}
              </p>
            </div>

            {/* Analisis Tren */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                ANALISIS TREN
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {currentData.insights.trendDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}