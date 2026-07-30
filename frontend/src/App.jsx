import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import IndabaXLayout from "./layouts/IndabaXLayout";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ResearchPage from "./pages/ResearchPage";
import ContactPage from "./pages/ContactPage";

import IndabaXHomePage from "./pages/indabax/IndabaXHomePage";
import IndabaXAboutPage from "./pages/indabax/IndabaXAboutPage";
import IndabaXTeamPage from "./pages/indabax/IndabaXTeamPage";
import IndabaXGalleryPage from "./pages/indabax/IndabaXGalleryPage";
import IndabaXLearningPage from "./pages/indabax/IndabaXLearningPage";
import IndabaXJoinPage from "./pages/indabax/IndabaXJoinPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        <Route element={<IndabaXLayout />}>
          <Route path="/indabax" element={<IndabaXHomePage />} />
          <Route path="/indabax/about" element={<IndabaXAboutPage />} />
          <Route path="/indabax/projects" element={<ProjectsPage />} />
          <Route path="/indabax/team" element={<IndabaXTeamPage />} />
          <Route path="/indabax/gallery" element={<IndabaXGalleryPage />} />
          <Route path="/indabax/learning" element={<IndabaXLearningPage />} />
          <Route path="/indabax/join" element={<IndabaXJoinPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
