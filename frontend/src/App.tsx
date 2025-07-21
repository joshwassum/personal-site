
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Newsletter from './pages/Newsletter';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminBlog from './pages/AdminBlog';
import AdminBlogCreate from './pages/AdminBlogCreate';
import AdminBlogEdit from './pages/AdminBlogEdit';
import AdminNewsletter from './pages/AdminNewsletter';
import AdminFiles from './pages/AdminFiles';
import AdminSections from './pages/AdminSections';
import AdminContact from './pages/AdminContact';
import ProtectedRoute from './components/ProtectedRoute';
import { useDarkMode } from './hooks/useDarkMode';
import { SectionVisibilityProvider } from './contexts/SectionVisibilityContext';

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <SectionVisibilityProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Home />
            </Layout>
          } />
          <Route path="/about" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <About />
            </Layout>
          } />
          <Route path="/portfolio" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Portfolio />
            </Layout>
          } />
          <Route path="/skills" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Skills />
            </Layout>
          } />
          <Route path="/experience" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Experience />
            </Layout>
          } />
          <Route path="/contact" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Contact />
            </Layout>
          } />
          <Route path="/blog" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Blog />
            </Layout>
          } />
          <Route path="/newsletter" element={
            <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
              <Newsletter />
            </Layout>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/blog" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminBlog />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/blog/new" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminBlogCreate />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/blog/edit/:id" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminBlogEdit />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/newsletters" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminNewsletter />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/files" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminFiles />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/contact" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminContact />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/sections" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminSections />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute>
              <AdminLayout>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
                  <p className="text-gray-600">Admin settings coming soon...</p>
                </div>
              </AdminLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </SectionVisibilityProvider>
  );
}

export default App;
