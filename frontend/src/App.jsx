import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage.jsx";
import DetailPage from "./pages/DetailPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/projects/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
