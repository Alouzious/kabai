import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import IndabaXLayout from "./layouts/IndabaXLayout";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ResearchPage from "./pages/ResearchPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";

import IndabaXHomePage from "./pages/indabax/IndabaXHomePage";
import IndabaXAboutPage from "./pages/indabax/IndabaXAboutPage";
import IndabaXTeamPage from "./pages/indabax/IndabaXTeamPage";
import IndabaXGalleryPage from "./pages/indabax/IndabaXGalleryPage";
import IndabaXLearningPage from "./pages/indabax/IndabaXLearningPage";
import IndabaXJoinPage from "./pages/indabax/IndabaXJoinPage";

import { AuthProvider } from "./admin/AuthContext";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminSlides from "./admin/pages/AdminSlides";
import AdminProjects from "./admin/pages/AdminProjects";
import AdminBlog from "./admin/pages/AdminBlog";
import AdminCategories from "./admin/pages/AdminCategories";
import AdminCoreValues from "./admin/pages/AdminCoreValues";
import AdminEvents from "./admin/pages/AdminEvents";
import AdminTeam from "./admin/pages/AdminTeam";
import AdminResearch from "./admin/pages/AdminResearch";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />}/>
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage/>} />
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

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="slides" element={<AdminSlides />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="core-values" element={<AdminCoreValues />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="research" element={<AdminResearch />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
