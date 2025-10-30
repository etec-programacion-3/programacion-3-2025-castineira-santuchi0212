import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '🏠 Inicio', exact: true },
    { path: '/employees', label: '👥 Empleados' },
    { path: '/departments', label: '🏢 Departamentos' },
    { path: '/positions', label: '💼 Posiciones' },
  ];

  const isActive = (path, exact) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content">
          <div className="logo">
            <h1>👥 Gestor de Empleados</h1>
            <p>Sistema de administración de recursos humanos</p>
          </div>
        </div>
        
        <nav className="main-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={isActive(item.path, item.exact) ? 'active' : ''}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

      <footer className="layout-footer">
        <div className="footer-content">
          <h4>📚 Conceptos de React Router - SPA</h4>
          <ul>
            <li>
              <strong>SPA (Single Page Application):</strong> La aplicación no recarga 
              la página al navegar, solo actualiza el contenido dinámicamente.
            </li>
            <li>
              <strong>React Router:</strong> Librería que maneja el enrutamiento del 
              lado del cliente, sincronizando la URL con los componentes.
            </li>
            <li>
              <strong>{'<Outlet />'}:</strong> Placeholder donde se renderizan los 
              componentes hijos según la ruta activa.
            </li>
            <li>
              <strong>useLocation:</strong> Hook que permite acceder a la ubicación 
              actual para resaltar la navegación activa.
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;