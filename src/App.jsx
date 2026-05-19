import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import EfisiensiEdukasi from "./pages/EfisiensiEdukasi";
import LulusanTerserap from "./pages/LulusanTerserap";
import AktivitasMahasiswa from "./pages/AktivitasMahasiswa";
import RekognisiDosen from "./pages/RekognisiDosen";
import PublikasiInternasional from "./pages/PublikasiInternasional";
import KerjasamaLuaran from "./pages/KerjasamaLuaran";
import Sdgs from "./pages/Sdgs";
import SdmKebijakan from "./pages/SdmKebijakan";
import PendapatanNonUkt from "./pages/PendapatanNonUkt";
import ZonaIntegritas from "./pages/ZonaIntegritas";
import TataKelola from "./pages/TataKelola";

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
          <Route path="sdgs" element={<Sdgs />} />
          <Route path="sdm-kebijakan" element={<SdmKebijakan />} />
          <Route path="pendapatan-non-ukt" element={<PendapatanNonUkt />} />
          <Route path="zona-integritas" element={<ZonaIntegritas />} />
          <Route path="tata-kelola" element={<TataKelola />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;