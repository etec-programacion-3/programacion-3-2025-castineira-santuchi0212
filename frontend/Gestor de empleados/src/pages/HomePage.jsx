import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeeService, departmentService, positionService } from '../services/employeeService';
import LoadingSpinner from '../components/LoadingSpinner';
import './HomePage.css';

const HomePage = () => {
  const [stats, setStats] = useState({
    employees: 0,
    activeEmployees: 0,
    departments: 0,
    positions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [employees, departments, positions] = await Promise.all([
          employeeService.getAll(),
          departmentService.getAll(),
          positionService.getAll(),
        ]);

        setStats({
          employees: employees.length,
          activeEmployees: employees.filter(e => e.activo).length,
          departments: departments.length,
          positions: positions.length,
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h2>Bienvenido al Sistema de Gestión</h2>
        <p>Administra empleados, departamentos y posiciones de forma eficiente</p>
      </div>

      <div className="stats-grid">
        <Link to="/employees" className="stat-card-link">
          <div className="stat-card employees">
            <div className="stat-icon">👥</div>
            <h3>Empleados</h3>
            <p className="stat-number">{stats.employees}</p>
            <p className="stat-detail">{stats.activeEmployees} activos</p>
          </div>
        </Link>

        <Link to="/departments" className="stat-card-link">
          <div className="stat-card departments">
            <div className="stat-icon">🏢</div>
            <h3>Departamentos</h3>
            <p className="stat-number">{stats.departments}</p>
            <p className="stat-detail">Ver listado →</p>
          </div>
        </Link>

        <Link to="/positions" className="stat-card-link">
          <div className="stat-card positions">
            <div className="stat-icon">💼</div>
            <h3>Posiciones</h3>
            <p className="stat-number">{stats.positions}</p>
            <p className="stat-detail">Ver listado →</p>
          </div>
        </Link>
      </div>

      <div className="quick-actions">
        <h3>Acciones Rápidas</h3>
        <div className="action-buttons">
          <Link to="/employees" className="action-button primary">
            Ver Todos los Empleados
          </Link>
          <Link to="/departments" className="action-button secondary">
            Gestionar Departamentos
          </Link>
          <Link to="/positions" className="action-button secondary">
            Gestionar Posiciones
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;