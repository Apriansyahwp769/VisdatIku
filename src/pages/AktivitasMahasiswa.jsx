import { useState } from "react";
import { 
  Plane, 
  Trophy, 
  TrendingUp, 
  Download, 
  Globe2, 
  Building2,
  ChevronDown
} from "lucide-react";

// Data dummy: [tahun][fakultas]
const dummyData = {
  2024: {
    fasilkom: {
      participation: 34.8, participationChange: "+4.2%",
      achievements: { national: 982, international: 263, total: 1245 },
      employmentBoost: 22,
      distribution: { internship: 45, community: 28, exchange: 15, research: 12 },
      highlights: [
        { icon: Globe2, title: "Global Mobility Program", desc: "50 students secured placements in top 100 QS universities for the upcoming semester." },
        { icon: Building2, title: "Industry Partners Growth", desc: "Added 12 new multinational corporate partners to the certified internship roster." }
      ],
      impactDesc: "Students participating in off-campus activities demonstrate a 22% higher employment rate within 6 months of graduation compared to their peers."
    },
    fkip: {
      participation: 28.3, participationChange: "+3.1%",
      achievements: { national: 1240, international: 185, total: 1425 },
      employmentBoost: 18,
      distribution: { internship: 38, community: 35, exchange: 12, research: 15 },
      highlights: [
        { icon: Globe2, title: "Teaching Exchange ASEAN", desc: "35 education students placed in partner schools across Thailand, Malaysia, and Vietnam." },
        { icon: Building2, title: "School Partnership Network", desc: "Expanded collaboration with 28 new public schools for practicum and community service programs." }
      ],
      impactDesc: "FKIP graduates with teaching practicum experience show 18% faster job placement in formal education institutions."
    },
    teknik: {
      participation: 41.2, participationChange: "+5.8%",
      achievements: { national: 756, international: 312, total: 1068 },
      employmentBoost: 26,
      distribution: { internship: 52, community: 22, exchange: 10, research: 16 },
      highlights: [
        { icon: Globe2, title: "Engineering Exchange Program", desc: "28 students participated in joint research projects with universities in Germany and Japan." },
        { icon: Building2, title: "Industry Immersion", desc: "Partnership with 15 manufacturing and energy companies for hands-on internship programs." }
      ],
      impactDesc: "Technical students with industry immersion experience secure engineering roles 26% faster than peers without off-campus engagement."
    },
    ekonomi: {
      participation: 31.5, participationChange: "+2.9%",
      achievements: { national: 892, international: 201, total: 1093 },
      employmentBoost: 20,
      distribution: { internship: 48, community: 25, exchange: 14, research: 13 },
      highlights: [
        { icon: Globe2, title: "Business Study Abroad", desc: "42 economics students completed semester exchanges at partner universities in Singapore and Australia." },
        { icon: Building2, title: "Corporate Mentorship", desc: "Launched mentorship program with 20+ banks, consulting firms, and multinational corporations." }
      ],
      impactDesc: "Economics graduates with corporate internship experience demonstrate 20% higher starting salaries and faster career progression."
    },
    kedokteran: {
      participation: 52.7, participationChange: "+3.4%",
      achievements: { national: 412, international: 89, total: 501 },
      employmentBoost: 15,
      distribution: { internship: 65, community: 20, exchange: 8, research: 7 },
      highlights: [
        { icon: Globe2, title: "Clinical Rotation Exchange", desc: "18 medical students completed clinical rotations at teaching hospitals in Malaysia and Thailand." },
        { icon: Building2, title: "Community Health Outreach", desc: "Expanded rural health service programs to 12 new villages with mobile clinic support." }
      ],
      impactDesc: "Medical students with diverse clinical exposure show 15% higher competency scores in national licensing examinations."
    }
  },
  2025: {
    fasilkom: {
      participation: 38.9, participationChange: "+4.1%",
      achievements: { national: 1105, international: 298, total: 1403 },
      employmentBoost: 24,
      distribution: { internship: 48, community: 26, exchange: 14, research: 12 },
      highlights: [
        { icon: Globe2, title: "Tech Talent Global", desc: "65 students placed in internships at tech hubs in Singapore, Jakarta, and Bandung." },
        { icon: Building2, title: "Startup Incubator Expansion", desc: "12 student-led startups received seed funding and mentorship through university incubator." }
      ],
      impactDesc: "Fasilkom students with startup or tech internship experience show 24% higher employment rate in the digital economy sector."
    },
    fkip: {
      participation: 31.8, participationChange: "+3.5%",
      achievements: { national: 1385, international: 215, total: 1600 },
      employmentBoost: 19,
      distribution: { internship: 40, community: 36, exchange: 11, research: 13 },
      highlights: [
        { icon: Globe2, title: "Digital Teaching Fellowship", desc: "40 education students completed fellowships focused on EdTech integration in rural schools." },
        { icon: Building2, title: "Teacher Innovation Hub", desc: "Launched platform for sharing best practices among 200+ partner schools across Sumatra." }
      ],
      impactDesc: "FKIP graduates with digital teaching experience are 19% more likely to be hired by progressive educational institutions."
    },
    teknik: {
      participation: 45.6, participationChange: "+4.4%",
      achievements: { national: 823, international: 356, total: 1179 },
      employmentBoost: 28,
      distribution: { internship: 55, community: 20, exchange: 11, research: 14 },
      highlights: [
        { icon: Globe2, title: "Sustainable Engineering Exchange", desc: "32 students collaborated on renewable energy projects with European university partners." },
        { icon: Building2, title: "Green Industry Partnership", desc: "New collaborations with 8 companies focused on sustainability and circular economy." }
      ],
      impactDesc: "Engineering students engaged in sustainability projects show 28% higher placement in ESG-focused companies."
    },
    ekonomi: {
      participation: 35.2, participationChange: "+3.7%",
      achievements: { national: 965, international: 238, total: 1203 },
      employmentBoost: 22,
      distribution: { internship: 50, community: 24, exchange: 15, research: 11 },
      highlights: [
        { icon: Globe2, title: "Fintech Immersion Program", desc: "38 students completed intensive programs with leading fintech companies in Southeast Asia." },
        { icon: Building2, title: "ESG Consulting Initiative", desc: "Student consulting teams provided sustainability assessments for 15 local SMEs." }
      ],
      impactDesc: "Economics graduates with fintech or ESG experience command 22% higher starting salaries in the financial services sector."
    },
    kedokteran: {
      participation: 56.1, participationChange: "+3.4%",
      achievements: { national: 445, international: 102, total: 547 },
      employmentBoost: 16,
      distribution: { internship: 68, community: 19, exchange: 7, research: 6 },
      highlights: [
        { icon: Globe2, title: "Global Health Electives", desc: "22 medical students completed electives in public health programs across ASEAN countries." },
        { icon: Building2, title: "Telemedicine Community Pilot", desc: "Launched telehealth services reaching 5,000+ patients in underserved rural areas." }
      ],
      impactDesc: "Medical students with global health or telemedicine exposure demonstrate 16% stronger readiness for modern healthcare delivery."
    }
  },
  2026: {
    fasilkom: {
      participation: 42.5, participationChange: "+3.6%",
      achievements: { national: 1248, international: 335, total: 1583 },
      employmentBoost: 26,
      distribution: { internship: 50, community: 24, exchange: 15, research: 11 },
      highlights: [
        { icon: Globe2, title: "AI Research Exchange", desc: "45 students collaborated on AI/ML research projects with top-50 global universities." },
        { icon: Building2, title: "Product Studio Launch", desc: "Student teams launched 8 market-ready digital products through university-industry product studio." }
      ],
      impactDesc: "Fasilkom students with AI research or product development experience show 26% higher placement in high-growth tech companies."
    },
    fkip: {
      participation: 35.4, participationChange: "+3.6%",
      achievements: { national: 1512, international: 248, total: 1760 },
      employmentBoost: 21,
      distribution: { internship: 42, community: 37, exchange: 10, research: 11 },
      highlights: [
        { icon: Globe2, title: "Micro-Credentials Global", desc: "55 education students earned internationally recognized micro-credentials in digital pedagogy." },
        { icon: Building2, title: "EdTech Innovation Lab", desc: "Student-developed learning tools deployed in 50+ partner schools with measurable impact on student engagement." }
      ],
      impactDesc: "FKIP graduates with micro-credentials or EdTech experience are 21% more competitive in the evolving education job market."
    },
    teknik: {
      participation: 49.3, participationChange: "+3.7%",
      achievements: { national: 895, international: 398, total: 1293 },
      employmentBoost: 30,
      distribution: { internship: 58, community: 18, exchange: 12, research: 12 },
      highlights: [
        { icon: Globe2, title: "Smart Infrastructure Exchange", desc: "38 students worked on smart city projects with international engineering firms." },
        { icon: Building2, title: "Industry 4.0 Certification", desc: "200+ students earned industry-recognized certifications in IoT, automation, and data analytics." }
      ],
      impactDesc: "Engineering students with Industry 4.0 certifications show 30% faster placement in advanced manufacturing and digital infrastructure roles."
    },
    ekonomi: {
      participation: 38.8, participationChange: "+3.6%",
      achievements: { national: 1042, international: 275, total: 1317 },
      employmentBoost: 24,
      distribution: { internship: 52, community: 22, exchange: 16, research: 10 },
      highlights: [
        { icon: Globe2, title: "Sustainable Finance Fellowship", desc: "42 students completed fellowships focused on green bonds, impact investing, and ESG reporting." },
        { icon: Building2, title: "Digital Economy Incubator", desc: "Student ventures in e-commerce, digital payments, and platform economics received seed support." }
      ],
      impactDesc: "Economics graduates with sustainable finance or digital economy experience command 24% premium in the competitive job market."
    },
    kedokteran: {
      participation: 59.4, participationChange: "+3.3%",
      achievements: { national: 478, international: 118, total: 596 },
      employmentBoost: 17,
      distribution: { internship: 70, community: 18, exchange: 7, research: 5 },
      highlights: [
        { icon: Globe2, title: "Precision Medicine Rotation", desc: "25 medical students completed rotations in genomics and personalized medicine programs abroad." },
        { icon: Building2, title: "Integrated Care Network", desc: "Expanded community-based integrated care model to serve 10,000+ patients with chronic conditions." }
      ],
      impactDesc: "Medical students with precision medicine or integrated care exposure demonstrate 17% stronger clinical decision-making skills."
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
  
  let totalParticipation = 0, totalChange = 0;
  let totalAchievements = { national: 0, international: 0, total: 0 };
  let totalEmploymentBoost = 0;
  let totalDistribution = { internship: 0, community: 0, exchange: 0, research: 0 };
  let allHighlights = [];
  
  facultyKeys.forEach(key => {
    const f = yearData[key];
    totalParticipation += f.participation;
    totalChange += parseFloat(f.participationChange.replace(/[+%]/g, ''));
    totalAchievements.national += f.achievements.national;
    totalAchievements.international += f.achievements.international;
    totalAchievements.total += f.achievements.total;
    totalEmploymentBoost += f.employmentBoost;
    totalDistribution.internship += f.distribution.internship;
    totalDistribution.community += f.distribution.community;
    totalDistribution.exchange += f.distribution.exchange;
    totalDistribution.research += f.distribution.research;
    allHighlights.push(...f.highlights);
  });
  
  return {
    participation: Math.round((totalParticipation / count) * 10) / 10,
    participationChange: `+${(totalChange / count).toFixed(1)}%`,
    achievements: {
      national: Math.round(totalAchievements.national / count),
      international: Math.round(totalAchievements.international / count),
      total: Math.round(totalAchievements.total / count)
    },
    employmentBoost: Math.round(totalEmploymentBoost / count),
    distribution: {
      internship: Math.round(totalDistribution.internship / count),
      community: Math.round(totalDistribution.community / count),
      exchange: Math.round(totalDistribution.exchange / count),
      research: Math.round(totalDistribution.research / count)
    },
    highlights: allHighlights.slice(0, 2), // Ambil 2 highlights representatif
    impactDesc: `Rata-rata dari ${count} fakultas menunjukkan bahwa mahasiswa yang terlibat dalam aktivitas off-campus memiliki tingkat penyerapan kerja ${Math.round(totalEmploymentBoost / count)}% lebih tinggi. Fakultas Kedokteran memimpin partisipasi (${yearData.kedokteran.participation}%), sementara Teknik menunjukkan pertumbuhan tertinggi dalam pencapaian internasional.`
  };
}

export default function AktivitasMahasiswa() {
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [selectedYear, setSelectedYear] = useState(2024);

  // Ambil data berdasarkan filter
  const yearData = dummyData[selectedYear];
  const currentData = selectedFaculty === "all" 
    ? getAggregatedData(dummyData, selectedYear)
    : yearData[selectedFaculty];

  // Data untuk distribution bar chart
  const distributionData = [
    { label: "Internship (Magang)", value: currentData.distribution.internship, color: "bg-blue-600" },
    { label: "Community Service (KKN/Pengabdian)", value: currentData.distribution.community, color: "bg-blue-500" },
    { label: "Student Exchange (Pertukaran Pelajar)", value: currentData.distribution.exchange, color: "bg-teal-500" },
    { label: "Independent Research (Penelitian)", value: currentData.distribution.research, color: "bg-emerald-600" }
  ];

  return (
    <div className="space-y-6">
      {/* Header + Filters */}
      <div className="mt-5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Aktivitas Mahasiswa</h1>
            <p className="text-gray-600 mt-1">Monitoring off-campus engagement and experiential learning metrics.</p>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Off-Campus Participation */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Off-Campus Participation</h3>
            <Plane className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{currentData.participation}%</div>
          <p className="text-sm text-gray-500 mb-3">Active student body</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 bg-teal-50 text-teal-700 px-2 py-1 rounded-full font-medium">
              <TrendingUp className="w-3 h-3" /> {currentData.participationChange} YoY
            </span>
            <span className="text-gray-500">Target: 30%</span>
          </div>
        </div>

        {/* Card 2: Recognized Achievements */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Recognized Achievements</h3>
            <Trophy className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{currentData.achievements.total.toLocaleString()}</div>
          <p className="text-sm text-gray-500 mb-4">National & International</p>
          <div className="flex gap-6 pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">National</p>
              <p className="text-lg font-bold text-gray-800">{currentData.achievements.national.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">International</p>
              <p className="text-lg font-bold text-gray-800">{currentData.achievements.international.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Card 3 (Dark): Experiential Impact */}
        <div className="bg-blue-900 rounded-xl p-6 shadow-sm text-white relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Trophy className="w-24 h-24" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Experiential Impact</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-4">
              {currentData.impactDesc}
            </p>
          </div>
          <button className="bg-white text-blue-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition w-fit">
            View Impact Study
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Distribution by Activity Type */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Distribution by Activity Type</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition">
              Export Data <Download className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-5">
            {distributionData.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-700">{item.label}</span>
                  <span className="font-medium text-gray-900">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className={`${item.color} h-2.5 rounded-full transition-all duration-700`} 
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Engagement Highlights */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-5">Recent Engagement Highlights</h3>
          <div className="space-y-5">
            {currentData.highlights.map((item, index) => (
              <div key={index} className={`flex gap-3 ${index < currentData.highlights.length - 1 ? 'pb-5 border-b border-gray-100' : ''}`}>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}