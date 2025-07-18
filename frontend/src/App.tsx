import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <Router>
      <Layout darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes as we build them */}
          <Route path="/about" element={<div className="p-8 text-center">About Page - Coming Soon</div>} />
          <Route path="/portfolio" element={<div className="p-8 text-center">Portfolio Page - Coming Soon</div>} />
          <Route path="/skills" element={<div className="p-8 text-center">Skills Page - Coming Soon</div>} />
          <Route path="/experience" element={<div className="p-8 text-center">Experience Page - Coming Soon</div>} />
          <Route path="/contact" element={<div className="p-8 text-center">Contact Page - Coming Soon</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
