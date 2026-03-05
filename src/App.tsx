/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import BootScreen from './pages/BootScreen';
import LoginScreen from './pages/LoginScreen';
import Desktop from './pages/Desktop';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BootScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/desktop" element={<Desktop />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </PortfolioProvider>
  );
}
