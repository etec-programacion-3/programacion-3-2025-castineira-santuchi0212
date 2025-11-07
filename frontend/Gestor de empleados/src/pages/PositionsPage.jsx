import React, { useState, useEffect } from 'react';
import { positionService } from '../services/employeeService';
import DataTable from '../components/DataTable';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import './Page.css';

const PositionsPage = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPositions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await positionService.getAll();
      setPositions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  // Definición de columnas para la tabla reutilizable
  const columns = [
    { 
      key: 'id', 
      label: 'ID',
      width: '8%'
    },
    { 
      key: 'titulo', 
      label: 'Título del Puesto',
      width: '25%'
    },
    { 
      key: 'descripcion', 
      label: 'Descripción',
      width: '32%',
      render: (value) => value || 'Sin descripción'
    },
    { 
      key: 'salario_min', 
      label: 'Salario Mínimo',
      width: '15%',
      render: (value) => value ? `$${parseFloat(value).toLocaleString('es-AR')}` : 'N/A'
    },
    { 
      key: 'salario_max', 
      label: 'Salario Máximo',
      width: '15%',
      render: (value) => value ? `$${parseFloat(value).toLocaleString('es-AR')}` : 'N/A'
    },
  ];

  if (loading) return <LoadingSpinner message="Cargando posiciones..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchPositions} />;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>💼 Posiciones</h1>
        <p>Gestión de puestos de trabajo disponibles</p>
      </div>

      <div className="page-stats">
        <div className="stat-box">
          <span className="stat-label">Total Posiciones</span>
          <span className="stat-value">{positions.length}</span>
        </div>
      </div>

      <DataTable 
        data={positions}
        columns={columns}
        emptyMessage="No hay posiciones registradas"
      />
    </div>
  );
};

export default PositionsPage;