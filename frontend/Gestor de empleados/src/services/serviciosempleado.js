// Configuración base de la API
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Servicio para manejar todas las operaciones relacionadas con empleados
 */
export const employeeService = {
  /**
   * Obtiene todos los empleados
   * @returns {Promise<Array>} Lista de empleados
   */
  getAllEmployees: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      throw error;
    }
  },

  /**
   * Obtiene un empleado por su ID
   * @param {number} id - ID del empleado
   * @returns {Promise<Object>} Datos del empleado
   */
  getEmployeeById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error al obtener empleado ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crea un nuevo empleado
   * @param {Object} employeeData - Datos del empleado
   * @returns {Promise<Object>} Empleado creado
   */
  createEmployee: async (employeeData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al crear empleado:', error);
      throw error;
    }
  },

  /**
   * Actualiza un empleado existente
   * @param {number} id - ID del empleado
   * @param {Object} employeeData - Datos actualizados
   * @returns {Promise<Object>} Empleado actualizado
   */
  updateEmployee: async (id, employeeData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error al actualizar empleado ${id}:`, error);
      throw error;
    }
  },

  /**
   * Elimina un empleado
   * @param {number} id - ID del empleado
   * @returns {Promise<Object>} Respuesta de eliminación
   */
  deleteEmployee: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error al eliminar empleado ${id}:`, error);
      throw error;
    }
  }
};

// Servicios para departamentos
export const departmentService = {
  getAllDepartments: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/departments`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al obtener departamentos:', error);
      throw error;
    }
  }
};

// Servicios para posiciones
export const positionService = {
  getAllPositions: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/positions`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al obtener posiciones:', error);
      throw error;
    }
  }
};