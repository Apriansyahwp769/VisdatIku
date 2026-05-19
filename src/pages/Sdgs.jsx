import { useState } from "react";
import { TrendingUp, Target, Lightbulb, ChevronDown, Users, Briefcase, Globe } from "lucide-react";

// Data dummy lengkap: [tahun][fakultas]
const dummyData = {
  2024: {
    fasilkom: {
      programsContributing: 78.5,
      trend: "+3.2%",
      activeProjects: 124,
      communityOutreach: 56,
      regions: 10,
      sdgCoverage: {
        sdg4: 92,
        sdg17: 85,
        sdg9: 78,
        sdg11: 72,
        sdg13: 65
      },
      strategicAlignment: {
        primary: "SDG 4 (Quality Education)",
        secondary: "SDG 17 (Partnerships)",
        percentage: 58,
        sdg4Integration: 88,
        sdg17Integration: 82
      },
      priorityGrowth: [
        { sdg: "SDG 9 (Industry, Innovation)", status: "Requires expansion in AI & IoT research programs", icon: "up" },
        { sdg: "SDG 13 (Climate Action)", status: "Limited integration in curriculum, needs green computing initiatives", icon: "alert" }
      ],
      insights: {
        gap: "21,5%",
        gapDesc: "Terdapat kesenjangan 21,5% menuju target 100% program berkontribusi pada SDGs. Fokus utama pada SDG 4 dan SDG 17 dengan integrasi 88% dan 82%.",
        trendDesc: "Peningkatan 3,2% didorong oleh program Community Service Learning yang terintegrasi dengan 124 proyek aktif di 10 wilayah."
      }
    },
    fkip: {
      programsContributing: 82.3,
      trend: "+4.1%",
      activeProjects: 98,
      communityOutreach: 72,
      regions: 12,
      sdgCoverage: {
        sdg4: 95,
        sdg17: 78,
        sdg5: 82,
        sdg10: 75,
        sdg16: 68
      },
      strategicAlignment: {
        primary: "SDG 4 (Quality Education)",
        secondary: "SDG 5 (Gender Equality)",
        percentage: 64,
        sdg4Integration: 95,
        sdg17Integration: 78
      },
      priorityGrowth: [
        { sdg: "SDG 10 (Reduced Inequalities)", status: "Perlu program inklusivitas lebih luas untuk daerah terpencil", icon: "up" },
        { sdg: "SDG 16 (Peace & Justice)", status: "Integrasi pendidikan karakter dan anti-korupsi perlu ditingkatkan", icon: "alert" }
      ],
      insights: {
        gap: "17,7%",
        gapDesc: "Kinerja terbaik dalam SDG 4 (95%) sebagai core business fakultas. Outreach komunitas tertinggi (72) dengan cakupan 12 wilayah.",
        trendDesc: "Pertumbuhan tertinggi (+4,1%) berkat program Guru Penggerak dan kemitraan dengan 45 sekolah mitra."
      }
    },
    teknik: {
      programsContributing: 75.8,
      trend: "+2.8%",
      activeProjects: 156,
      communityOutreach: 48,
      regions: 9,
      sdgCoverage: {
        sdg9: 88,
        sdg7: 82,
        sdg11: 79,
        sdg13: 76,
        sdg6: 68
      },
      strategicAlignment: {
        primary: "SDG 9 (Industry & Innovation)",
        secondary: "SDG 7 (Clean Energy)",
        percentage: 55,
        sdg4Integration: 72,
        sdg17Integration: 85
      },
      priorityGrowth: [
        { sdg: "SDG 6 (Clean Water)", status: "Perlu penelitian lebih dalam water treatment technology", icon: "up" },
        { sdg: "SDG 12 (Responsible Consumption)", status: "Integrasi circular economy dalam proyek teknik masih terbatas", icon: "alert" }
      ],
      insights: {
        gap: "24,2%",
        gapDesc: "Fokus kuat pada SDG 9 (88%) dan SDG 7 (82%). Jumlah proyek aktif tertinggi (156) namun outreach komunitas perlu ditingkatkan.",
        trendDesc: "Peningkatan 2,8% didorong oleh kolaborasi industri dalam renewable energy dan smart city projects."
      }
    },
    ekonomi: {
      programsContributing: 71.2,
      trend: "+1.9%",
      activeProjects: 87,
      communityOutreach: 64,
      regions: 11,
      sdgCoverage: {
        sdg8: 86,
        sdg1: 78,
        sdg10: 82,
        sdg12: 74,
        sdg17: 79
      },
      strategicAlignment: {
        primary: "SDG 8 (Decent Work)",
        secondary: "SDG 10 (Reduced Inequalities)",
        percentage: 52,
        sdg4Integration: 75,
        sdg17Integration: 79
      },
      priorityGrowth: [
        { sdg: "SDG 1 (No Poverty)", status: "Perlu program financial literacy untuk masyarakat bawah", icon: "up" },
        { sdg: "SDG 12 (Responsible Consumption)", status: "Integrasi sustainable business practices dalam kurikulum", icon: "alert" }
      ],
      insights: {
        gap: "28,8%",
        gapDesc: "Kesenjangan terbesar di antara fakultas. Fokus pada SDG 8 (86%) dan pemberdayaan UMKM. Perlu akselerasi program SDGs.",
        trendDesc: "Pertumbuhan moderat (+1,9%) seiring program KKN tematik ekonomi dan pendampingan 200+ UMKM."
      }
    },
    kedokteran: {
      programsContributing: 86.4,
      trend: "+3.8%",
      activeProjects: 112,
      communityOutreach: 89,
      regions: 14,
      sdgCoverage: {
        sdg3: 96,
        sdg4: 88,
        sdg17: 84,
        sdg6: 79,
        sdg2: 72
      },
      strategicAlignment: {
        primary: "SDG 3 (Good Health)",
        secondary: "SDG 4 (Quality Education)",
        percentage: 68,
        sdg4Integration: 88,
        sdg17Integration: 84
      },
      priorityGrowth: [
        { sdg: "SDG 2 (Zero Hunger)", status: "Program gizi masyarakat perlu ekspansi ke daerah stunting", icon: "up" },
        { sdg: "SDG 6 (Clean Water)", status: "Kolaborasi dengan teknik untuk water sanitation programs", icon: "alert" }
      ],
      insights: {
        gap: "13,6%",
        gapDesc: "Performa terbaik dengan SDG 3 mencapai 96%. Community outreach tertinggi (89) dengan cakupan 14 wilayah termasuk daerah terpencil.",
        trendDesc: "Peningkatan signifikan (+3,8%) berkat program Sehat Nusantara dan mobile clinic services."
      }
    }
  },
  2025: {
    fasilkom: {
      programsContributing: 81.7,
      trend: "+3.2%",
      activeProjects: 138,
      communityOutreach: 62,
      regions: 11,
      sdgCoverage: {
        sdg4: 94,
        sdg17: 88,
        sdg9: 82,
        sdg11: 76,
        sdg13: 71
      },
      strategicAlignment: {
        primary: "SDG 4 (Quality Education)",
        secondary: "SDG 17 (Partnerships)",
        percentage: 61,
        sdg4Integration: 94,
        sdg17Integration: 88
      },
      priorityGrowth: [
        { sdg: "SDG 9 (Industry, Innovation)", status: "Ekspansi program AI for Social Good menunjukkan hasil positif", icon: "up" },
        { sdg: "SDG 13 (Climate Action)", status: "Green computing initiative mulai diadopsi di 3 mata kuliah inti", icon: "success" }
      ],
      insights: {
        gap: "18,3%",
        gapDesc: "Kesenjangan menyusut menjadi 18,3%. Integrasi SDG 4 dan SDG 17 meningkat signifikan. Proyek aktif bertambah 14.",
        trendDesc: "Pertumbuhan konsisten (+3,2%) dengan program Digital Literacy for All menjangkau 15.000 beneficiaries."
      }
    },
    fkip: {
      programsContributing: 85.6,
      trend: "+3.3%",
      activeProjects: 108,
      communityOutreach: 78,
      regions: 13,
      sdgCoverage: {
        sdg4: 97,
        sdg17: 82,
        sdg5: 86,
        sdg10: 79,
        sdg16: 73
      },
      strategicAlignment: {
        primary: "SDG 4 (Quality Education)",
        secondary: "SDG 5 (Gender Equality)",
        percentage: 67,
        sdg4Integration: 97,
        sdg17Integration: 82
      },
      priorityGrowth: [
        { sdg: "SDG 10 (Reduced Inequalities)", status: "Program beasiswa afirmatif meningkat 40%", icon: "success" },
        { sdg: "SDG 16 (Peace & Justice)", status: "Kurikulum anti-korupsi terintegrasi di semua prodi", icon: "success" }
      ],
      insights: {
        gap: "14,4%",
        gapDesc: "SDG 4 mencapai 97%, tertinggi di universitas. Outreach meningkat ke 78 dengan 13 wilayah cakupan.",
        trendDesc: "Akselerasi (+3,3%) berkat program Indonesia Mengajar dan kemitraan dengan 60 sekolah."
      }
    },
    teknik: {
      programsContributing: 79.2,
      trend: "+3.4%",
      activeProjects: 168,
      communityOutreach: 54,
      regions: 10,
      sdgCoverage: {
        sdg9: 91,
        sdg7: 86,
        sdg11: 83,
        sdg13: 81,
        sdg6: 74
      },
      strategicAlignment: {
        primary: "SDG 9 (Industry & Innovation)",
        secondary: "SDG 7 (Clean Energy)",
        percentage: 59,
        sdg4Integration: 76,
        sdg17Integration: 88
      },
      priorityGrowth: [
        { sdg: "SDG 6 (Clean Water)", status: "Proyek water purification untuk desa meningkat 25%", icon: "success" },
        { sdg: "SDG 12 (Responsible Consumption)", status: "Lab circular economy mulai beroperasi", icon: "up" }
      ],
      insights: {
        gap: "20,8%",
        gapDesc: "SDG 9 mencapai 91%. Proyek aktif tertinggi (168) dengan fokus renewable energy dan smart infrastructure.",
        trendDesc: "Pertumbuhan tertinggi (+3,4%) berkat kolaborasi triple helix dengan 25 industri dan pemerintah daerah."
      }
    },
    ekonomi: {
      programsContributing: 75.8,
      trend: "+4.6%",
      activeProjects: 96,
      communityOutreach: 71,
      regions: 12,
      sdgCoverage: {
        sdg8: 89,
        sdg1: 83,
        sdg10: 86,
        sdg12: 79,
        sdg17: 82
      },
      strategicAlignment: {
        primary: "SDG 8 (Decent Work)",
        secondary: "SDG 10 (Reduced Inequalities)",
        percentage: 57,
        sdg4Integration: 79,
        sdg17Integration: 82
      },
      priorityGrowth: [
        { sdg: "SDG 1 (No Poverty)", status: "Program financial inclusion menjangkau 5.000 keluarga", icon: "success" },
        { sdg: "SDG 12 (Responsible Consumption)", status: "Sustainable business course mandatory untuk S1", icon: "success" }
      ],
      insights: {
        gap: "24,2%",
        gapDesc: "Pertumbuhan tercepat (+4,6%). SDG 8 mencapai 89%. Program UMKM digitalisasi berkembang pesat.",
        trendDesc: "Rebound positif dengan pendampingan 350 UMKM dan program kewirausahaan sosial."
      }
    },
    kedokteran: {
      programsContributing: 89.2,
      trend: "+2.8%",
      activeProjects: 125,
      communityOutreach: 96,
      regions: 15,
      sdgCoverage: {
        sdg3: 98,
        sdg4: 91,
        sdg17: 87,
        sdg6: 84,
        sdg2: 78
      },
      strategicAlignment: {
        primary: "SDG 3 (Good Health)",
        secondary: "SDG 4 (Quality Education)",
        percentage: 72,
        sdg4Integration: 91,
        sdg17Integration: 87
      },
      priorityGrowth: [
        { sdg: "SDG 2 (Zero Hunger)", status: "Program gizi balita menurunkan stunting 15% di area intervensi", icon: "success" },
        { sdg: "SDG 6 (Clean Water)", status: "Kolaborasi sanitasi dengan teknik berhasil di 20 desa", icon: "success" }
      ],
      insights: {
        gap: "10,8%",
        gapDesc: "Performa terbaik universitas. SDG 3 mencapai 98%. Outreach 96 dengan cakupan 15 wilayah termasuk Papua.",
        trendDesc: "Stabilitas tinggi (+2,8%) dengan 50.000 beneficiaries program kesehatan masyarakat."
      }
    }
  },
  2026: {
    fasilkom: {
      programsContributing: 84.2,
      trend: "+2.5%",
      activeProjects: 142,
      communityOutreach: 68,
      regions: 12,
      sdgCoverage: {
        sdg4: 95,
        sdg17: 91,
        sdg9: 85,
        sdg11: 80,
        sdg13: 76
      },
      strategicAlignment: {
        primary: "SDG 4 (Quality Education)",
        secondary: "SDG 17 (Partnerships)",
        percentage: 62,
        sdg4Integration: 92,
        sdg17Integration: 85
      },
      priorityGrowth: [
        { sdg: "SDG 9 (Industry, Innovation)", status: "AI for Good initiatives mencapai 45 proyek aktif", icon: "success" },
        { sdg: "SDG 5 (Gender Equality)", status: "Women in Tech program meningkatkan partisipasi 35%", icon: "up" }
      ],
      insights: {
        gap: "15,8%",
        gapDesc: "Kesenjangan terus menyusut. SDG 4 dan SDG 17 mendominasi dengan 62% dari total inisiatif. Integrasi mencapai 92% dan 85%.",
        trendDesc: "Pertumbuhan berkelanjutan (+2,5%) dengan digital campus ecosystem dan 142 proyek aktif di 12 regions."
      }
    },
    fkip: {
      programsContributing: 88.4,
      trend: "+2.8%",
      activeProjects: 115,
      communityOutreach: 84,
      regions: 14,
      sdgCoverage: {
        sdg4: 98,
        sdg17: 86,
        sdg5: 89,
        sdg10: 84,
        sdg16: 78
      },
      strategicAlignment: {
        primary: "SDG 4 (Quality Education)",
        secondary: "SDG 5 (Gender Equality)",
        percentage: 70,
        sdg4Integration: 95,
        sdg17Integration: 86
      },
      priorityGrowth: [
        { sdg: "SDG 3 (Good Health)", status: "Perlu integrasi health education dalam kurikulum guru", icon: "up" },
        { sdg: "SDG 13 (Climate Action)", status: "Environmental education perlu diperkuat di semua jenjang", icon: "alert" }
      ],
      insights: {
        gap: "11,6%",
        gapDesc: "SDG 4 mencapai 98%, mendekati perfect score. Gender equality (SDG 5) meningkat signifikan ke 89%.",
        trendDesc: "Lompatan (+2,8%) dengan micro-credentials dan 84 community outreach di 14 regions."
      }
    },
    teknik: {
      programsContributing: 82.6,
      trend: "+3.4%",
      activeProjects: 178,
      communityOutreach: 61,
      regions: 11,
      sdgCoverage: {
        sdg9: 93,
        sdg7: 89,
        sdg11: 87,
        sdg13: 85,
        sdg6: 79
      },
      strategicAlignment: {
        primary: "SDG 9 (Industry & Innovation)",
        secondary: "SDG 7 (Clean Energy)",
        percentage: 63,
        sdg4Integration: 80,
        sdg17Integration: 91
      },
      priorityGrowth: [
        { sdg: "SDG 12 (Responsible Consumption)", status: "Circular economy lab menghasilkan 12 paten hijau", icon: "success" },
        { sdg: "SDG 14 (Life Below Water)", status: "Perlu ekspansi marine technology research", icon: "up" }
      ],
      insights: {
        gap: "17,4%",
        gapDesc: "SDG 9 mencapai 93%. Proyek aktif tertinggi (178) dengan fokus sustainability engineering dan green technology.",
        trendDesc: "Pertumbuhan konsisten (+3,4%) dengan triple helix collaboration dan 40+ industri partners."
      }
    },
    ekonomi: {
      programsContributing: 80.3,
      trend: "+4.5%",
      activeProjects: 108,
      communityOutreach: 78,
      regions: 13,
      sdgCoverage: {
        sdg8: 92,
        sdg1: 87,
        sdg10: 89,
        sdg12: 84,
        sdg17: 85
      },
      strategicAlignment: {
        primary: "SDG 8 (Decent Work)",
        secondary: "SDG 10 (Reduced Inequalities)",
        percentage: 61,
        sdg4Integration: 83,
        sdg17Integration: 85
      },
      priorityGrowth: [
        { sdg: "SDG 17 (Partnerships)", status: "MoU dengan 15 financial institutions untuk financial inclusion", icon: "success" },
        { sdg: "SDG 11 (Sustainable Cities)", status: "Urban economics research perlu diperkuat", icon: "up" }
      ],
      insights: {
        gap: "19,7%",
        gapDesc: "Transformasi signifikan dengan SDG 8 mencapai 92%. Pertumbuhan tercepat (+4,5%) di tahun 2026.",
        trendDesc: "Rebound kuat dengan 500+ UMKM terdigitalisasi dan program sustainable finance berkembang pesat."
      }
    },
    kedokteran: {
      programsContributing: 91.5,
      trend: "+2.3%",
      activeProjects: 135,
      communityOutreach: 102,
      regions: 16,
      sdgCoverage: {
        sdg3: 99,
        sdg4: 93,
        sdg17: 90,
        sdg6: 87,
        sdg2: 83
      },
      strategicAlignment: {
        primary: "SDG 3 (Good Health)",
        secondary: "SDG 4 (Quality Education)",
        percentage: 75,
        sdg4Integration: 93,
        sdg17Integration: 90
      },
      priorityGrowth: [
        { sdg: "SDG 17 (Partnerships)", status: "Global health partnerships dengan 8 universitas internasional", icon: "success" },
        { sdg: "SDG 11 (Sustainable Cities)", status: "Healthy city initiatives perlu kolaborasi lintas fakultas", icon: "up" }
      ],
      insights: {
        gap: "8,5%",
        gapDesc: "Target institusional hampir tercapai! SDG 3 mencapai 99%. Community outreach 102 dengan 16 regions termasuk area 3T.",
        trendDesc: "Excellence dalam SDG implementation dengan 75.000 beneficiaries dan competency-based health programs."
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
  
  let totalPrograms = 0;
  let totalProjects = 0;
  let totalOutreach = 0;
  let totalRegions = 0;
  let validFaculties = 0;
  
  const sdgTotals = {};
  const sdgCounts = {};
  
  // Hitung rata-rata untuk setiap fakultas
  facultyKeys.forEach(facultyKey => {
    const faculty = yearData[facultyKey];
    totalPrograms += faculty.programsContributing;
    totalProjects += faculty.activeProjects;
    totalOutreach += faculty.communityOutreach;
    totalRegions += faculty.regions;
    validFaculties++;
    
    // Agregasi SDG coverage
    Object.entries(faculty.sdgCoverage).forEach(([sdg, value]) => {
      sdgTotals[sdg] = (sdgTotals[sdg] || 0) + value;
      sdgCounts[sdg] = (sdgCounts[sdg] || 0) + 1;
    });
  });
  
  // Hitung rata-rata
  const avgPrograms = totalPrograms / validFaculties;
  const avgProjects = Math.round(totalProjects / validFaculties);
  const avgOutreach = Math.round(totalOutreach / validFaculties);
  const avgRegions = Math.round(totalRegions / validFaculties);
  
  // Hitung rata-rata per SDG
  const avgSdgCoverage = {};
  Object.keys(sdgTotals).forEach(sdg => {
    avgSdgCoverage[sdg] = Math.round((sdgTotals[sdg] / sdgCounts[sdg]) * 10) / 10;
  });
  
  // Hitung trend rata-rata
  const trends = facultyKeys.map(k => parseFloat(yearData[k].trend.replace('+', '')));
  const avgTrend = (trends.reduce((a, b) => a + b, 0) / trends.length).toFixed(1);
  
  // Cari SDG dominan
  const sortedSdgs = Object.entries(avgSdgCoverage).sort((a, b) => b[1] - a[1]);
  const primarySdg = sortedSdgs[0][0];
  const secondarySdg = sortedSdgs[1][0];
  
  return {
    programsContributing: Math.round(avgPrograms * 10) / 10,
    trend: `+${avgTrend}%`,
    activeProjects: avgProjects,
    communityOutreach: avgOutreach,
    regions: avgRegions,
    sdgCoverage: avgSdgCoverage,
    strategicAlignment: {
      primary: primarySdg === 'sdg4' ? 'SDG 4 (Quality Education)' : 
               primarySdg === 'sdg3' ? 'SDG 3 (Good Health)' :
               primarySdg === 'sdg9' ? 'SDG 9 (Industry & Innovation)' :
               primarySdg === 'sdg8' ? 'SDG 8 (Decent Work)' : 'SDG 4 (Quality Education)',
      secondary: secondarySdg === 'sdg17' ? 'SDG 17 (Partnerships)' :
                 secondarySdg === 'sdg4' ? 'SDG 4 (Quality Education)' :
                 secondarySdg === 'sdg5' ? 'SDG 5 (Gender Equality)' :
                 secondarySdg === 'sdg7' ? 'SDG 7 (Clean Energy)' :
                 secondarySdg === 'sdg10' ? 'SDG 10 (Reduced Inequalities)' : 'SDG 17 (Partnerships)',
      percentage: Math.round((avgSdgCoverage[sortedSdgs[0][0]] + avgSdgCoverage[sortedSdgs[1][0]]) / 2),
      sdg4Integration: Math.round(avgSdgCoverage.sdg4 || 85),
      sdg17Integration: Math.round(avgSdgCoverage.sdg17 || 82)
    },
    priorityGrowth: [
      { sdg: "SDG 3 (Good Health)", status: "Requires broader curriculum integration in non-medical faculties", icon: "up" },
      { sdg: "SDG 5 (Gender Equality)", status: "Steady progress in leadership ratios, monitor ongoing policies", icon: "alert" }
    ],
    insights: {
      gap: `${(100 - avgPrograms).toFixed(1)}%`,
      gapDesc: `Rata-rata ${validFaculties} fakultas menunjukkan ${avgPrograms.toFixed(1)}% program berkontribusi pada SDGs. Fakultas Kedokteran memimpin (${yearData.kedokteran.programsContributing}%), sementara Ekonomi memerlukan akselerasi (${yearData.ekonomi.programsContributing}%).`,
      trendDesc: `Pertumbuhan rata-rata +${avgTrend}% dengan ${avgProjects} proyek aktif di ${avgRegions} wilayah. FKIP dan Kedokteran menunjukkan komitmen tertinggi terhadap SDG 4.`
    }
  };
}

// Helper untuk label SDG
const sdgLabels = {
  sdg1: "SDG 1 (No Poverty)",
  sdg2: "SDG 2 (Zero Hunger)",
  sdg3: "SDG 3 (Good Health)",
  sdg4: "SDG 4 (Quality Education)",
  sdg5: "SDG 5 (Gender Equality)",
  sdg6: "SDG 6 (Clean Water)",
  sdg7: "SDG 7 (Clean Energy)",
  sdg8: "SDG 8 (Decent Work)",
  sdg9: "SDG 9 (Industry & Innovation)",
  sdg10: "SDG 10 (Reduced Inequalities)",
  sdg11: "SDG 11 (Sustainable Cities)",
  sdg12: "SDG 12 (Responsible Consumption)",
  sdg13: "SDG 13 (Climate Action)",
  sdg14: "SDG 14 (Life Below Water)",
  sdg15: "SDG 15 (Life on Land)",
  sdg16: "SDG 16 (Peace & Justice)",
  sdg17: "SDG 17 (Partnerships)"
};

export default function Sdgs() {
  const [selectedFaculty, setSelectedFaculty] = useState("all");
  const [selectedYear, setSelectedYear] = useState(2024);

  // Ambil data berdasarkan filter
  const yearData = dummyData[selectedYear];
  const currentData = selectedFaculty === "all" 
    ? getAggregatedData(dummyData, selectedYear)
    : yearData[selectedFaculty];
    
  const sdgData = Object.entries(currentData.sdgCoverage)
    .map(([sdg, value]) => ({ sdg, label: sdgLabels[sdg], value }));

  return (
    <div className="space-y-6">
      {/* Header + Filters */}
      <div className="mt-5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sustainable Development Goals</h1>
            <p className="text-gray-600 mt-1">
              IKU 7 Performance and Institutional Alignment Overview
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Programs Contributing */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-gray-700 font-semibold text-sm uppercase tracking-wide">Programs Contributing</h3>
              <div className="mt-2">
                <span className="text-4xl font-bold text-gray-900">{currentData.programsContributing}%</span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1 bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                {currentData.trend} vs last academic year
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Card 2: Active SDG Projects */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-gray-700 font-semibold text-sm uppercase tracking-wide">Active SDG Projects</h3>
              <div className="mt-2">
                <span className="text-4xl font-bold text-gray-900">{currentData.activeProjects}</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <p className="mt-1 text-sm text-gray-600">70% of annual target reached</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Card 3: Community Outreach */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-gray-700 font-semibold text-sm uppercase tracking-wide">Community Outreach</h3>
              <div className="mt-2">
                <span className="text-4xl font-bold text-gray-900">{currentData.communityOutreach}</span>
              </div>
              <div className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium inline-block">
                Across {currentData.regions} Regions
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: SDG Coverage Distribution */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900 font-semibold text-lg">
              SDG Coverage Distribution
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Export Data
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </button>
          </div>
          
          {/* Radar Chart Simulation */}
          <div className="relative h-80 flex items-center justify-center">
            <svg viewBox="0 0 400 400" className="w-full h-full max-w-md">
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
                </pattern>
              </defs>
              
              {/* Concentric circles */}
              <circle cx="200" cy="200" r="150" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
              <circle cx="200" cy="200" r="112.5" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
              <circle cx="200" cy="200" r="75" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
              <circle cx="200" cy="200" r="37.5" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
              
              {/* Axis lines */}
              <line x1="200" y1="50" x2="200" y2="350" stroke="#e5e7eb" strokeWidth="1"/>
              <line x1="200" y1="200" x2="346" y2="285" stroke="#e5e7eb" strokeWidth="1"/>
              <line x1="200" y1="200" x2="285" y2="346" stroke="#e5e7eb" strokeWidth="1"/>
              <line x1="200" y1="200" x2="115" y2="346" stroke="#e5e7eb" strokeWidth="1"/>
              <line x1="200" y1="200" x2="54" y2="285" stroke="#e5e7eb" strokeWidth="1"/>
              
              {/* Data polygon */}
              <polygon 
                points={`
                  200,${200 - (sdgData.find(d => d.sdg === 'sdg4')?.value || 80) * 1.5}
                  ${200 + (sdgData.find(d => d.sdg === 'sdg17')?.value || 75) * 1.3},285
                  ${200 + (sdgData.find(d => d.sdg === 'sdg9')?.value || 70) * 1.1},${200 + (sdgData.find(d => d.sdg === 'sdg9')?.value || 70) * 1.1}
                  ${200 - (sdgData.find(d => d.sdg === 'sdg5')?.value || 65) * 1.1},${200 + (sdgData.find(d => d.sdg === 'sdg5')?.value || 65) * 1.1}
                  ${200 - (sdgData.find(d => d.sdg === 'sdg1')?.value || 60) * 1.3},285
                `}
                fill="rgba(59, 130, 246, 0.3)"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              
              {/* Data points */}
              <circle cx="200" cy={200 - (sdgData.find(d => d.sdg === 'sdg4')?.value || 80) * 1.5} r="4" fill="#1e40af"/>
              <circle cx={200 + (sdgData.find(d => d.sdg === 'sdg17')?.value || 75) * 1.3} cy="285" r="4" fill="#1e40af"/>
              <circle cx={200 + (sdgData.find(d => d.sdg === 'sdg9')?.value || 70) * 1.1} cy={200 + (sdgData.find(d => d.sdg === 'sdg9')?.value || 70) * 1.1} r="4" fill="#1e40af"/>
              <circle cx={200 - (sdgData.find(d => d.sdg === 'sdg5')?.value || 65) * 1.1} cy={200 + (sdgData.find(d => d.sdg === 'sdg5')?.value || 65) * 1.1} r="4" fill="#1e40af"/>
              <circle cx={200 - (sdgData.find(d => d.sdg === 'sdg1')?.value || 60) * 1.3} cy="285" r="4" fill="#1e40af"/>
              
              {/* Labels */}
              <text x="200" y="40" textAnchor="middle" className="text-xs font-semibold fill-gray-700">SDG 4 (Quality Education)</text>
              <text x="355" y="290" textAnchor="start" className="text-xs fill-gray-600">SDG 17 (Partnerships)</text>
              <text x="300" y="340" textAnchor="start" className="text-xs fill-gray-600">SDG 9 (Industry)</text>
              <text x="100" y="340" textAnchor="end" className="text-xs fill-gray-600">SDG 5 (Gender Equality)</text>
              <text x="45" y="290" textAnchor="end" className="text-xs fill-gray-600">SDG 1 (No Poverty)</text>
            </svg>
          </div>
          
          {/* SDG Legend */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {sdgData.slice(0, 6).map((item) => (
              <div key={item.sdg} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span className="text-gray-600">{item.label}</span>
                <span className="ml-auto font-semibold text-gray-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Strategic Alignment & Priority Growth */}
        <div className="space-y-6">
          {/* Strategic Alignment */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-6 text-white">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-300" />
              Strategic Alignment
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-4">
              Institutional focus remains strongly anchored in <strong>{currentData.strategicAlignment.primary}</strong> and <strong>{currentData.strategicAlignment.secondary}</strong>, 
              accounting for {currentData.strategicAlignment.percentage}% of all tracked sustainable initiatives this semester.
            </p>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-200">SDG 4 Integration</span>
                  <span className="font-semibold">{currentData.strategicAlignment.sdg4Integration}%</span>
                </div>
                <div className="w-full bg-blue-950 rounded-full h-2">
                  <div className="bg-cyan-400 h-2 rounded-full transition-all duration-500" 
                       style={{ width: `${currentData.strategicAlignment.sdg4Integration}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-200">SDG 17 Integration</span>
                  <span className="font-semibold">{currentData.strategicAlignment.sdg17Integration}%</span>
                </div>
                <div className="w-full bg-blue-950 rounded-full h-2">
                  <div className="bg-cyan-400 h-2 rounded-full transition-all duration-500" 
                       style={{ width: `${currentData.strategicAlignment.sdg17Integration}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Priority Growth Areas */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-gray-900 font-semibold mb-4 text-sm uppercase tracking-wide">
              Priority Growth Areas
            </h3>
            
            <div className="space-y-4">
              {currentData.priorityGrowth.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                    item.icon === 'success' ? 'bg-green-100 text-green-600' :
                    item.icon === 'up' ? 'bg-orange-100 text-orange-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {item.icon === 'success' ? <TrendingUp className="w-4 h-4" /> :
                     item.icon === 'up' ? <TrendingUp className="w-4 h-4" /> :
                     <Lightbulb className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{item.sdg}</h4>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          Wawasan Kinerja
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
  );
}