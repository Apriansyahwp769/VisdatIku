import { useState } from "react";
import { Award, Target, Users, CheckCircle, Globe, Lightbulb, Download, ChevronDown } from "lucide-react";

// Data dummy: [tahun][fakultas]
const dummyData = {
  2024: {
    fasilkom: {
      recognized: 38, recognizedChange: "+15.2%",
      target: 40,
      totalLecturers: 245, eligiblePool: 180, pendingValidation: 8,
      progress: 95.0,
      topFaculty: [
        { initials: "SA", name: "Dr. Sarah Ahmad", faculty: "Fasilkom", type: "Visiting Professor", score: 9.8 },
        { initials: "RW", name: "Dr. Rudi Wijaya", faculty: "Fasilkom", type: "IEEE Fellow", score: 9.6 },
        { initials: "DN", name: "Prof. Diana Nur", faculty: "Fasilkom", type: "Intl. Committee", score: 9.3 },
        { initials: "BH", name: "Dr. Budi Hartono", faculty: "Fasilkom", type: "Keynote Speaker", score: 9.1 },
      ],
      insights: {
        region: "Asia-Pacific",
        type: "Visiting Professor",
        desc: "Fasilkom memimpin dengan 38 dosen terekognisi internasional, terutama melalui kolaborasi riset AI/ML dengan universitas di Singapura dan Australia."
      }
    },
    fkip: {
      recognized: 28, recognizedChange: "+12.0%",
      target: 35,
      totalLecturers: 312, eligiblePool: 210, pendingValidation: 12,
      progress: 80.0,
      topFaculty: [
        { initials: "LS", name: "Prof. Linda Sari", faculty: "FKIP", type: "UNESCO Expert", score: 9.4 },
        { initials: "AH", name: "Dr. Ahmad Hakim", faculty: "FKIP", type: "Intl. Conference Chair", score: 9.0 },
        { initials: "MR", name: "Dr. Maya Rahayu", faculty: "FKIP", type: "Curriculum Advisor", score: 8.8 },
        { initials: "TS", name: "Prof. Toni Susilo", faculty: "FKIP", type: "Visiting Lecturer", score: 8.6 },
      ],
      insights: {
        region: "ASEAN",
        type: "Curriculum Advisor",
        desc: "FKIP menunjukkan pertumbuhan signifikan melalui program pertukaran dosen dan kontribusi pada pengembangan kurikulum pendidikan regional."
      }
    },
    teknik: {
      recognized: 42, recognizedChange: "+16.7%",
      target: 45,
      totalLecturers: 278, eligiblePool: 195, pendingValidation: 6,
      progress: 93.3,
      topFaculty: [
        { initials: "BC", name: "Prof. Budi Cahyono", faculty: "Teknik", type: "Keynote Speaker", score: 9.5 },
        { initials: "IR", name: "Dr. Indra Rahman", faculty: "Teknik", type: "Patent Holder", score: 9.3 },
        { initials: "SW", name: "Prof. Siti Wulandari", faculty: "Teknik", type: "Intl. Standard Committee", score: 9.2 },
        { initials: "FA", name: "Dr. Fajar Aziz", faculty: "Teknik", type: "Industry Advisor", score: 8.9 },
      ],
      insights: {
        region: "Europe",
        type: "Keynote Speaker",
        desc: "Teknik mendominasi dengan 42 dosen terekognisi, didorong oleh riset energi terbarukan dan kolaborasi dengan institusi teknik terkemuka di Eropa."
      }
    },
    ekonomi: {
      recognized: 31, recognizedChange: "+10.7%",
      target: 38,
      totalLecturers: 198, eligiblePool: 142, pendingValidation: 9,
      progress: 81.6,
      topFaculty: [
        { initials: "LW", name: "Linda Wijaya, Ph.D", faculty: "Ekonomi", type: "Intl. Committee", score: 9.2 },
        { initials: "RP", name: "Dr. Rudi Pratama", faculty: "Ekonomi", type: "World Bank Consultant", score: 9.0 },
        { initials: "AN", name: "Prof. Ani Nugraha", faculty: "Ekonomi", type: "Visiting Scholar", score: 8.7 },
        { initials: "HS", name: "Dr. Hendra Saputra", faculty: "Ekonomi", type: "Policy Advisor", score: 8.5 },
      ],
      insights: {
        region: "Global",
        type: "Policy Advisor",
        desc: "Ekonomi memperkuat posisi melalui kontribusi pada kebijakan pembangunan berkelanjutan dan konsultasi dengan lembaga keuangan internasional."
      }
    },
    kedokteran: {
      recognized: 35, recognizedChange: "+13.5%",
      target: 36,
      totalLecturers: 156, eligiblePool: 128, pendingValidation: 4,
      progress: 97.2,
      topFaculty: [
        { initials: "RA", name: "Dr. Rizky Akbar", faculty: "Kedokteran", type: "Award Winner", score: 8.9 },
        { initials: "DK", name: "Prof. Dewi Kusuma", faculty: "Kedokteran", type: "WHO Collaborator", score: 9.4 },
        { initials: "AF", name: "Dr. Agus Firmansyah", faculty: "Kedokteran", type: "Clinical Trial Lead", score: 9.1 },
        { initials: "NP", name: "Prof. Nina Permata", faculty: "Kedokteran", type: "Intl. Journal Editor", score: 9.3 },
      ],
      insights: {
        region: "Asia",
        type: "Clinical Research",
        desc: "Kedokteran mencapai target hampir 100% dengan fokus pada riset klinis dan kolaborasi dengan organisasi kesehatan global seperti WHO."
      }
    }
  },
  2025: {
    fasilkom: {
      recognized: 44, recognizedChange: "+15.8%",
      target: 45,
      totalLecturers: 252, eligiblePool: 192, pendingValidation: 7,
      progress: 97.8,
      topFaculty: [
        { initials: "SA", name: "Dr. Sarah Ahmad", faculty: "Fasilkom", type: "ACM Distinguished Member", score: 9.9 },
        { initials: "RW", name: "Dr. Rudi Wijaya", faculty: "Fasilkom", type: "IEEE Senior Member", score: 9.7 },
        { initials: "DN", name: "Prof. Diana Nur", faculty: "Fasilkom", type: "UN AI Advisor", score: 9.5 },
        { initials: "BH", name: "Dr. Budi Hartono", faculty: "Fasilkom", type: "Tech Summit Keynote", score: 9.3 },
      ],
      insights: {
        region: "Global",
        type: "AI/ML Leadership",
        desc: "Fasilkom mencapai 44 dosen terekognisi dengan fokus pada kepemimpinan riset AI, termasuk penunjukan sebagai advisor untuk inisiatif AI global."
      }
    },
    fkip: {
      recognized: 33, recognizedChange: "+17.9%",
      target: 38,
      totalLecturers: 320, eligiblePool: 225, pendingValidation: 10,
      progress: 86.8,
      topFaculty: [
        { initials: "LS", name: "Prof. Linda Sari", faculty: "FKIP", type: "EdTech Innovation Award", score: 9.6 },
        { initials: "AH", name: "Dr. Ahmad Hakim", faculty: "FKIP", type: "Regional Education Leader", score: 9.2 },
        { initials: "MR", name: "Dr. Maya Rahayu", faculty: "FKIP", type: "Digital Pedagogy Expert", score: 9.0 },
        { initials: "TS", name: "Prof. Toni Susilo", faculty: "FKIP", type: "Teacher Training Consultant", score: 8.8 },
      ],
      insights: {
        region: "ASEAN+",
        type: "EdTech Innovation",
        desc: "FKIP menunjukkan lompatan signifikan melalui inovasi EdTech dan kepemimpinan dalam transformasi digital pendidikan regional."
      }
    },
    teknik: {
      recognized: 48, recognizedChange: "+14.3%",
      target: 50,
      totalLecturers: 285, eligiblePool: 205, pendingValidation: 5,
      progress: 96.0,
      topFaculty: [
        { initials: "BC", name: "Prof. Budi Cahyono", faculty: "Teknik", type: "Sustainability Award", score: 9.7 },
        { initials: "IR", name: "Dr. Indra Rahman", faculty: "Teknik", type: "Green Tech Patent", score: 9.5 },
        { initials: "SW", name: "Prof. Siti Wulandari", faculty: "Teknik", type: "ISO Committee Chair", score: 9.4 },
        { initials: "FA", name: "Dr. Fajar Aziz", faculty: "Teknik", type: "Industry 4.0 Advisor", score: 9.2 },
      ],
      insights: {
        region: "Europe & Asia",
        type: "Sustainability Engineering",
        desc: "Teknik memperluas pengaruh melalui riset sustainability dan standarisasi internasional untuk teknologi hijau dan infrastruktur cerdas."
      }
    },
    ekonomi: {
      recognized: 36, recognizedChange: "+16.1%",
      target: 42,
      totalLecturers: 205, eligiblePool: 155, pendingValidation: 8,
      progress: 85.7,
      topFaculty: [
        { initials: "LW", name: "Linda Wijaya, Ph.D", faculty: "Ekonomi", type: "ESG Finance Expert", score: 9.4 },
        { initials: "RP", name: "Dr. Rudi Pratama", faculty: "Ekonomi", type: "Fintech Policy Advisor", score: 9.2 },
        { initials: "AN", name: "Prof. Ani Nugraha", faculty: "Ekonomi", type: "Impact Investing Leader", score: 9.0 },
        { initials: "HS", name: "Dr. Hendra Saputra", faculty: "Ekonomi", type: "Digital Economy Researcher", score: 8.8 },
      ],
      insights: {
        region: "Global South",
        type: "Sustainable Finance",
        desc: "Ekonomi memperkuat kontribusi pada agenda pembangunan berkelanjutan melalui riset keuangan inklusif dan ekonomi digital."
      }
    },
    kedokteran: {
      recognized: 38, recognizedChange: "+8.6%",
      target: 40,
      totalLecturers: 162, eligiblePool: 135, pendingValidation: 3,
      progress: 95.0,
      topFaculty: [
        { initials: "RA", name: "Dr. Rizky Akbar", faculty: "Kedokteran", type: "Global Health Award", score: 9.2 },
        { initials: "DK", name: "Prof. Dewi Kusuma", faculty: "Kedokteran", type: "Pandemic Response Leader", score: 9.6 },
        { initials: "AF", name: "Dr. Agus Firmansyah", faculty: "Kedokteran", type: "Precision Medicine Pioneer", score: 9.3 },
        { initials: "NP", name: "Prof. Nina Permata", faculty: "Kedokteran", type: "Medical Journal EiC", score: 9.5 },
      ],
      insights: {
        region: "Global Health",
        type: "Precision Medicine",
        desc: "Kedokteran mempertahankan posisi puncak dengan kontribusi pada kesehatan global, termasuk riset presisi medis dan respons pandemi."
      }
    }
  },
  2026: {
    fasilkom: {
      recognized: 51, recognizedChange: "+15.9%",
      target: 52,
      totalLecturers: 260, eligiblePool: 205, pendingValidation: 6,
      progress: 98.1,
      topFaculty: [
        { initials: "SA", name: "Dr. Sarah Ahmad", faculty: "Fasilkom", type: "UNESCO Chair", score: 10.0 },
        { initials: "RW", name: "Dr. Rudi Wijaya", faculty: "Fasilkom", type: "IEEE Fellow", score: 9.8 },
        { initials: "DN", name: "Prof. Diana Nur", faculty: "Fasilkom", type: "AI Ethics Board", score: 9.6 },
        { initials: "BH", name: "Dr. Budi Hartono", faculty: "Fasilkom", type: "Quantum Computing Lead", score: 9.4 },
      ],
      insights: {
        region: "Worldwide",
        type: "AI Governance",
        desc: "Fasilkom hampir mencapai target dengan 51 dosen terekognisi, termasuk penunjukan sebagai UNESCO Chair dan kepemimpinan dalam tata kelola AI global."
      }
    },
    fkip: {
      recognized: 39, recognizedChange: "+18.2%",
      target: 42,
      totalLecturers: 328, eligiblePool: 240, pendingValidation: 9,
      progress: 92.9,
      topFaculty: [
        { initials: "LS", name: "Prof. Linda Sari", faculty: "FKIP", type: "Global Education Prize", score: 9.8 },
        { initials: "AH", name: "Dr. Ahmad Hakim", faculty: "FKIP", type: "ASEAN Education Council", score: 9.4 },
        { initials: "MR", name: "Dr. Maya Rahayu", faculty: "FKIP", type: "Micro-Credentials Pioneer", score: 9.2 },
        { initials: "TS", name: "Prof. Toni Susilo", faculty: "FKIP", type: "Teacher AI Integration", score: 9.0 },
      ],
      insights: {
        region: "Indo-Pacific",
        type: "Future of Learning",
        desc: "FKIP menunjukkan pertumbuhan tercepat melalui inovasi dalam micro-credentials dan integrasi AI dalam pelatihan guru."
      }
    },
    teknik: {
      recognized: 54, recognizedChange: "+12.5%",
      target: 55,
      totalLecturers: 292, eligiblePool: 215, pendingValidation: 4,
      progress: 98.2,
      topFaculty: [
        { initials: "BC", name: "Prof. Budi Cahyono", faculty: "Teknik", type: "Climate Tech Laureate", score: 9.9 },
        { initials: "IR", name: "Dr. Indra Rahman", faculty: "Teknik", type: "Smart Grid Standard", score: 9.7 },
        { initials: "SW", name: "Prof. Siti Wulandari", faculty: "Teknik", type: "Circular Economy Chair", score: 9.6 },
        { initials: "FA", name: "Dr. Fajar Aziz", faculty: "Teknik", type: "Autonomous Systems Lead", score: 9.4 },
      ],
      insights: {
        region: "Global",
        type: "Climate Engineering",
        desc: "Teknik hampir mencapai target dengan kontribusi pada solusi iklim, termasuk standarisasi smart grid dan ekonomi sirkular."
      }
    },
    ekonomi: {
      recognized: 42, recognizedChange: "+16.7%",
      target: 46,
      totalLecturers: 212, eligiblePool: 168, pendingValidation: 7,
      progress: 91.3,
      topFaculty: [
        { initials: "LW", name: "Linda Wijaya, Ph.D", faculty: "Ekonomi", type: "G20 Economic Advisor", score: 9.6 },
        { initials: "RP", name: "Dr. Rudi Pratama", faculty: "Ekonomi", type: "CBDC Research Lead", score: 9.4 },
        { initials: "AN", name: "Prof. Ani Nugraha", faculty: "Ekonomi", type: "Social Impact Finance", score: 9.2 },
        { initials: "HS", name: "Dr. Hendra Saputra", faculty: "Ekonomi", type: "Platform Economy Expert", score: 9.0 },
      ],
      insights: {
        region: "Emerging Markets",
        type: "Digital Currency",
        desc: "Ekonomi memperkuat peran melalui riset mata uang digital dan inklusi keuangan untuk pasar berkembang."
      }
    },
    kedokteran: {
      recognized: 41, recognizedChange: "+7.9%",
      target: 42,
      totalLecturers: 168, eligiblePool: 142, pendingValidation: 2,
      progress: 97.6,
      topFaculty: [
        { initials: "RA", name: "Dr. Rizky Akbar", faculty: "Kedokteran", type: "One Health Champion", score: 9.4 },
        { initials: "DK", name: "Prof. Dewi Kusuma", faculty: "Kedokteran", type: "Genomic Medicine Leader", score: 9.7 },
        { initials: "AF", name: "Dr. Agus Firmansyah", faculty: "Kedokteran", type: "Telemedicine Pioneer", score: 9.5 },
        { initials: "NP", name: "Prof. Nina Permata", faculty: "Kedokteran", type: "Medical AI Ethics", score: 9.6 },
      ],
      insights: {
        region: "Global Health",
        type: "One Health Approach",
        desc: "Kedokteran hampir mencapai target dengan pendekatan One Health yang mengintegrasikan kesehatan manusia, hewan, dan lingkungan."
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
  const count = facultyKeys.length;
  
  let totalRecognized = 0, totalChange = 0, totalTarget = 0;
  let totalLecturers = 0, totalEligible = 0, totalPending = 0;
  let allProgress = [], allTopFaculty = [];
  let regionCount = {}, typeCount = {};
  
  facultyKeys.forEach(key => {
    const f = yearData[key];
    totalRecognized += f.recognized;
    totalChange += parseFloat(f.recognizedChange.replace(/[+%]/g, ''));
    totalTarget += f.target;
    totalLecturers += f.totalLecturers;
    totalEligible += f.eligiblePool;
    totalPending += f.pendingValidation;
    allProgress.push(f.progress);
    allTopFaculty.push(...f.topFaculty);
    regionCount[f.insights.region] = (regionCount[f.insights.region] || 0) + 1;
    typeCount[f.insights.type] = (typeCount[f.insights.type] || 0) + 1;
  });
  
  // Find most common region & type
  const topRegion = Object.entries(regionCount).sort((a,b) => b[1]-a[1])[0][0];
  const topType = Object.entries(typeCount).sort((a,b) => b[1]-a[1])[0][0];
  
  return {
    recognized: Math.round(totalRecognized / count),
    recognizedChange: `+${(totalChange / count).toFixed(1)}%`,
    target: Math.round(totalTarget / count),
    totalLecturers: Math.round(totalLecturers / count),
    eligiblePool: Math.round(totalEligible / count),
    pendingValidation: Math.round(totalPending / count),
    progress: Math.round((allProgress.reduce((a,b)=>a+b,0)/count)*10)/10,
    topFaculty: allTopFaculty.slice(0, 4), // Ambil 4 teratas dari semua fakultas
    insights: {
      region: topRegion,
      type: topType,
      desc: `Rata-rata dari ${count} fakultas menunjukkan ${Math.round(totalRecognized / count)} dosen terekognisi internasional. ${yearData.teknik.recognized >= yearData.fasilkom.recognized ? 'Fakultas Teknik' : 'Fakultas Ilmu Komputer'} memimpin dengan ${Math.max(...facultyKeys.map(k=>yearData[k].recognized))} pengakuan, didorong oleh kolaborasi riset ${topType.toLowerCase()} di wilayah ${topRegion}.`
    }
  };
}

export default function RekognisiDosen() {
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [selectedYear, setSelectedYear] = useState(2024);

  // Ambil data berdasarkan filter
  const yearData = dummyData[selectedYear];
  const currentData = selectedFaculty === "all" 
    ? getAggregatedData(dummyData, selectedYear)
    : yearData[selectedFaculty];

  return (
    <div className="space-y-6">
      {/* Header + Filters */}
      <div className="flex items-start justify-between">
        <div className="mt-5">
          <h1 className="text-2xl font-bold text-gray-900">Rekognisi Dosen</h1>
          <p className="text-gray-600 mt-1">Tracking the international recognition, achievements, and professional footprint of our faculty members globally.</p>
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

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Internationally Recognized (Dark Blue) */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-6 text-white shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-blue-200" />
            <h3 className="font-semibold">Internationally Recognized</h3>
          </div>
          <div className="text-4xl font-bold mb-2">{currentData.recognized}</div>
          <p className="text-blue-200 text-sm mb-6">Lecturers with global credentials</p>
          <div className="flex items-center justify-between text-sm border-t border-blue-700 pt-4">
            <span className="flex items-center gap-1 text-green-300">
              <Award className="w-4 h-4" /> {currentData.recognizedChange} vs last year
            </span>
            <span className="text-blue-200">Target: {currentData.target}</span>
          </div>
        </div>

        {/* Card 2: Achievement vs Total Faculty */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 lg:col-span-2">
          <h3 className="font-semibold text-gray-900 mb-4">Achievement vs Total Faculty</h3>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-gray-600">Overall Progress to Institutional Target</span>
            <span className="font-bold text-blue-900">{currentData.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div className="bg-blue-900 h-3 rounded-full transition-all duration-500" style={{ width: `${currentData.progress}%` }}></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "TOTAL LECTURERS", value: currentData.totalLecturers.toLocaleString() }, 
              { label: "ELIGIBLE POOL", value: currentData.eligiblePool.toLocaleString() }, 
              { label: "PENDING VALIDATION", value: currentData.pendingValidation }
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                <p className="text-xs text-gray-500 font-medium mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table: Top Recognized Faculty */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 lg:col-span-2 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Top Recognized Faculty</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
              View Directory <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium">
                <tr>
                  <th className="px-6 py-3">LECTURER</th>
                  <th className="px-6 py-3">FACULTY</th>
                  <th className="px-6 py-3">RECOGNITION TYPE</th>
                  <th className="px-6 py-3 text-right">IMPACT SCORE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentData.topFaculty.map((f, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
                          {f.initials}
                        </div>
                        <span className="font-medium text-gray-900">{f.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{f.faculty}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {f.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">{f.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insight Card (Teal) */}
        <div className="bg-teal-800 rounded-xl p-6 text-white shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-teal-300" />
              <h3 className="font-semibold text-lg">Global Insight</h3>
            </div>
            <p className="text-teal-100 text-sm leading-relaxed mb-6">
              {currentData.insights.desc}
            </p>
          </div>
          <div className="space-y-3">
            <div className="bg-teal-900/50 rounded-lg p-3 flex justify-between items-center">
              <span className="text-sm text-teal-200">Top Region</span>
              <span className="font-bold text-white">{currentData.insights.region}</span>
            </div>
            <div className="bg-teal-900/50 rounded-lg p-3 flex justify-between items-center">
              <span className="text-sm text-teal-200">Most Common Type</span>
              <span className="font-bold text-white">{currentData.insights.type}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}