
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Home } from './components/Home';
import Servicios from './components/Servicios';
import Turno from './components/Turnos';
import Ubicacion from './components/Ubicacion';
import { AdminPanel } from './components/admin/AdminPanel';
import { AdminLogin } from './components/admin/AdminLogin';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { WhatsAppButton } from './components/common/WhatsAppButton';
import { ReservarTurnoButton } from './components/common/ReservarTurnoButton';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-16">
                <Home />
                <section id="servicios">
                  <Servicios />
                </section>
                <section id="turnos">
                  <Turno />
                </section>
                <section id="ubicacion">
                  <Ubicacion />
                </section>
              </div>
            }
          />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/turnos" element={<Turno />} />
          <Route path="/ubicacion" element={<Ubicacion />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
        <WhatsAppButton />
        <ReservarTurnoButton />
      </div>
    </Router>
  );
};

export default App;