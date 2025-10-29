import React, { useState, useEffect } from 'react';
import { employeeService } from './services/serviciosempleado';
import './App.css';

function App() {
  // Estados del componente
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * useEffect: Hook para efectos secundarios
   * - Se ejecuta después del primer renderizado (montaje)
   * - El array vacío [] significa que solo se ejecuta UNA VEZ
   * - Ideal para llamadas a APIs al cargar el componente
   */
  useEffect(() => {
    console.log('🔵 Componente montado - Ejecutando useEffect');
    
    const fetchEmployees = async () => {
      try {
        console.log('📡 Iniciando llamada a la API...');
        setLoading(true);
        setError(null);
        
        // Llamada al servicio
        const data = await employeeService.getAllEmployees();
        
        console.log('✅ Datos recibidos:', data);
        setEmployees(data);
        
      } catch (err) {
        console.error('❌ Error al cargar empleados:', err);
        setError(err.message || 'Error al cargar los empleados');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();

    // Función de limpieza (opcional) - se ejecuta al desmontar
    return () => {
      console.log('🔴 Componente desmontado - Limpieza');
    };
  }, []); // Array de dependencias vacío = solo se ejecuta al montar

  // Calcular estadísticas
  const stats = {
    total: employees.length,
    activos: employees.filter(emp => emp.activo).length,
    inactivos: employees.filter(emp => !emp.activo).length,
  };

  // RENDERIZADO CONDICIONAL: Loading
  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando empleados...</p>
        </div>
      </div>
    );
  }

  // RENDERIZADO CONDICIONAL: Error
  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <h2>❌ Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // RENDERIZADO PRINCIPAL
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>👥 Sistema de Gestión de Empleados</h1>
        <p>Administra tu equipo de trabajo</p>
      </header>

      {/* Estadísticas */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Empleados</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Activos</h3>
          <p className="stat-number active">{stats.activos}</p>
        </div>
        <div className="stat-card">
          <h3>Inactivos</h3>
          <p className="stat-number inactive">{stats.inactivos}</p>
        </div>
      </div>

      {/* Lista de empleados */}
      <main className="main-content">
        <h2>Lista de Empleados</h2>
        
        {employees.length === 0 ? (
          <div className="empty-state">
            <p>No hay empleados registrados</p>
          </div>
        ) : (
          <div className="employee-grid">
            {employees.map((employee) => (
              <div key={employee.id} className="employee-card">
                <div className="card-header">
                  <h3>
                    {employee.nombre_completo || 
                     `${employee.nombre} ${employee.apellido}`}
                  </h3>
                  <span className={`badge ${employee.activo ? 'active' : 'inactive'}`}>
                    {employee.activo ? '✅ Activo' : '⭕ Inactivo'}
                  </span>
                </div>
                
                <div className="card-body">
                  <p><strong>Código:</strong> {employee.codigo_empleado}</p>
                  <p><strong>Email:</strong> {employee.email}</p>
                  
                  {employee.telefono && (
                    <p><strong>Teléfono:</strong> {employee.telefono}</p>
                  )}
                  
                  <p>
                    <strong>Departamento:</strong>{' '}
                    {employee.departamento?.nombre || 'Sin asignar'}
                  </p>
                  
                  <p>
                    <strong>Posición:</strong>{' '}
                    {employee.Posicion?.titulo || 'Sin asignar'}
                  </p>
                  
                  <p>
                    <strong>Salario:</strong> $
                    {parseFloat(employee.salario).toLocaleString('es-AR')}
                  </p>
                  
                  {employee.fecha_contratacion && (
                    <p>
                      <strong>Contratación:</strong>{' '}
                      {new Date(employee.fecha_contratacion).toLocaleDateString('es-AR')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Información educativa */}
      <footer className="info-box">
        <h3>📚 Conceptos de React Aplicados</h3>
        <ul>
          <li>
            <strong>useEffect:</strong> Hook que ejecuta código después del renderizado. 
            Se usa para llamadas a APIs.
          </li>
          <li>
            <strong>useState:</strong> Hook para manejar el estado del componente 
            (employees, loading, error).
          </li>
          <li>
            <strong>Ciclo de vida:</strong> Montaje → useEffect se ejecuta → 
            Actualización → Re-renderizado cuando cambia el estado.
          </li>
          <li>
            <strong>Array de dependencias []:</strong> Asegura que useEffect 
            solo se ejecute una vez al montar el componente.
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;