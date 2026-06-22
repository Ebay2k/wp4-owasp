import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));
const DetailPage = lazy(() => import("./pages/DetailPage.jsx"));
const SaveButton = lazy(() => import("./pages/SaveButton.jsx"));
const SavedProjects = lazy(() => import("./pages/SavedProjects.jsx"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Laden...</p>}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/projects/:id" element={<DetailPage />} />
          <Route path="/savebtn" element={<SaveButton />} />
          <Route path="/SavedProjects" element={<SavedProjects />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;