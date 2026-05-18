import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import EfisiensiEdukasi from "./pages/EfisiensiEdukasi";
import LulusanTerserap from "./pages/LulusanTerserap";
import AktivitasMahasiswa from "./pages/AktivitasMahasiswa";
import RekognisiDosen from "./pages/RekognisiDosen";
import PublikasiInternasional from "./pages/PublikasiInternasional";
import KerjasamaLuaran from "./pages/KerjasamaLuaran";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<EfisiensiEdukasi />} />
          <Route path="lulusan-terserap" element={<LulusanTerserap />} />
          <Route path="aktivitas-mahasiswa" element={<AktivitasMahasiswa />} />
          <Route path="rekognisi-dosen" element={<RekognisiDosen />} />
          <Route path="kerjasama-luaran" element={<KerjasamaLuaran />} />
          <Route path="publikasi-internasional" element={<PublikasiInternasional />} />
          {/* Tambahkan route lain di sini nanti */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;