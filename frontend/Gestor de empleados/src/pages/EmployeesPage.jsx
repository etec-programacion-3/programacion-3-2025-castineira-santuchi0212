import React, { useState, useEffect } from 'react';
import { employeeService } from '../services/employeeService';
import DataTable from '../components/DataTable';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import './Page.css';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeService.getAll();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Definición de columnas para la tabla reutilizable
  const columns = [
    { 
      key: 'codigo_empleado', 
      label: 'Código',
      width: '10%'
    },
    { 
      key: 'nombre_completo', 
      label: 'Nombre Completo',
      width: '20%',
      render: (value, row) => value || `${row.nombre} ${row.apellido}`
    },
    { 
      key: 'email', 
      label: 'Email',
      width: '20%'
    },
    { 
      key: 'departamento', 
      label: 'Departamento',
      width: '15%',
      render: (value) => value?.nombre || 'Sin asignar'
    },
    { 
      key: 'Posicion', 
      label: 'Posición',
      width: '15%',
      render: (value) => value?.titulo || 'Sin asignar'
    },
    { 
      key: 'salario', 
      label: 'Salario',
      width: '12%',
      render: (value) => `$${parseFloat(value).toLocaleString('es-AR')}`
    },
    { 
      key: 'activo', 
      label: 'Estado',
      width: '8%',
      render: (value) => (
        <span className={`status-badge ${value ? 'active' : 'inactive'}`}>
          {value ? '✅ Activo' : '⭕ Inactivo'}
        </span>
      )
    },
  ];

  if (loading) return <LoadingSpinner message="Cargando empleados..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchEmployees} />;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>👥 Empleados</h1>
        <p>Listado completo de empleados registrados en el sistema</p>
      </div>

      <div className="page-stats">
        <div className="stat-box">
          <span className="stat-label">Total</span>
          <span className="stat-value">{employees.length}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Activos</span>
          <span className="stat-value active">{employees.filter(e => e.activo).length}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Inactivos</span>
          <span className="stat-value inactive">{employees.filter(e => !e.activo).length}</span>
        </div>
      </div>

      <DataTable 
        data={employees}
        columns={columns}
        emptyMessage="No hay empleados registrados"
      />
    </div>
  );
};

export default EmployeesPage;