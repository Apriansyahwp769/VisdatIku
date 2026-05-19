import { Link, useLocation } from "react-router-dom";
import {
  GraduationCap, Briefcase, Users, Award, Handshake,
  Globe, Leaf, ShieldCheck, Banknote, Shield, LayoutDashboard,
  Settings, HelpCircle
} from "lucide-react";

const menuItems = [
  { path: "/", label: "IKU 1 – EFISIENSI EDUKASI", icon: GraduationCap, disabled: false },
  { path: "/lulusan-terserap", label: "IKU 2 – LULUSAN TERSERAP", icon: Briefcase, disabled: false },
  { path: "/aktivitas-mahasiswa", label: "IKU 3 – AKTIVITAS MAHASISWA", icon: Users, disabled: false },
  { path: "/rekognisi-dosen", label: "IKU 4 – REKOGNISI DOSEN", icon: Award, disabled: false },
  { path: "/kerjasama-luaran", label: "IKU 5 – KERJASAMA & LUARAN", icon: Handshake, disabled: false },
  { path: "/publikasi-internasional", label: "IKU 6 – PUBLIKASI INTERNASIONAL", icon: Globe, disabled: false },
  // 👇 IKU 7-11: disabled: true
  { path: "/sdgs", label: "IKU 7 – SDGS", icon: Leaf, disabled: false },
  { path: "/sdm-kebijakan", label: "IKU 8 – SDM DALAM KEBIJAKAN", icon: ShieldCheck, disabled: false },
  { path: "/pendapatan-non-ukt", label: "IKU 9 – PENDAPATAN NON UKT", icon: Banknote, disabled: false },
  { path: "/zona-integritas", label: "IKU 10 – ZONA INTEGRITAS", icon: Shield, disabled: false },
  { path: "/tata-kelola", label: "IKU 11 – TATA KELOLA", icon: LayoutDashboard, disabled: false },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed top-16 left-0 w-72 h-[calc(100vh-4rem)] bg-gray-50 border-r border-gray-200 z-40 flex flex-col">
      {/* Logo Header */}
      <div className="p-5 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg overflow-hidden bg-white">
            <img src="/img/unsri.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-blue-900 leading-tight">
              Indikator<br />Kerja Utama
            </h2>
            <p className="text-[10px] text-gray-500 tracking-wide">HIGHER ED ANALYTICS</p>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = !item.disabled && location.pathname === item.path;
          
          // Style untuk item yang disabled
          if (item.disabled) {
            return (
              <div
                key={item.path}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 cursor-not-allowed select-none"
                title="Fitur ini akan segera hadir"
              >
                <item.icon className="w-4 h-4 flex-shrink-0 opacity-60" />
                <span className="text-left leading-tight">{item.label}</span>
                <span className="ml-auto text-[10px] bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">Soon</span>
              </div>
            );
          }

          // Style untuk item aktif/normal (bisa diklik)
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-l-4 border-transparent"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-left leading-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-1 bg-white">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <Settings className="w-4 h-4 flex-shrink-0" /> 
          <span>SETTINGS</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition">
          <HelpCircle className="w-4 h-4 flex-shrink-0" /> 
          <span>SUPPORT</span>
        </button>
      </div>
    </aside>
  );
}