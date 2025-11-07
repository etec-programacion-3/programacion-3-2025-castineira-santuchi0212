import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import EmployeesPage from './pages/EmployeesPage';
import DepartmentsPage from './pages/DepartmentsPage';
import PositionsPage from './pages/PositionsPage';
import './App.css';

/**
 * Componente principal de la aplicación
 * Implementa React Router para navegación SPA (Single Page Application)
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 
          Ruta raíz con Layout
          MainLayout contiene header, nav y footer que persisten en todas las páginas
          <Outlet /> renderiza el componente hijo según la ruta activa
        */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="departments" element={<DepartmentsPage />} />
          <Route path="positions" element={<PositionsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;