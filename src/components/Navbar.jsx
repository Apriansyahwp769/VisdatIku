import { Bell, HelpCircle, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-6">
      {/* Left: Title & Tabs */}
      <div className="flex items-center gap-8">
        <h1 className="text-lg font-bold text-gray-800">EduAdmin KPI</h1>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-500">

        </nav>
      </div>

      {/* Right: Icons & Profile */}
      <div className="flex items-center gap-5 text-gray-500">
        <Bell className="w-5 h-5 cursor-pointer hover:text-gray-800 transition" />
        <HelpCircle className="w-5 h-5 cursor-pointer hover:text-gray-800 transition" />
        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </header>
  );
}