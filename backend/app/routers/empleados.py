from fastapi import APIRouter, HTTPException
from typing import List
from marshmallow import ValidationError

from app import crud
from app.schemas import EmpleadoSchema, EmpleadoCreateSchema

router = APIRouter()
empleado_schema = EmpleadoSchema()
empleados_schema = EmpleadoSchema(many=True)
empleado_create_schema = EmpleadoCreateSchema()

@router.get("/", response_model=List[dict])
async def read_empleados(skip: int = 0, limit: int = 100):
    """
    GET /api/employees
    Obtiene una lista de todos los empĺeados con paginación
    """
    empleados = await crud.get_empleados(skip=skip, limit=limit)
    return empleados_schema.dump(empleados)

@router.get("/{empleado_id}", response_model=dict)
async def read_empleado(empleado_id: int):
    """
    GET /api/employees/{id}
    Obtiene un empleado específica por su ID
    """
    db_empleado = await crud.get_empleado(empleado_id=empleado_id)
    if db_empleado is None:
        raise HTTPException(status_code=404, detail="empleado no encontrado")
    return empleado_schema.dump(db_empleado)

@router.post("/", response_model=dict, status_code=201)
async def create_empleado(empleado_data: dict):
    """
    POST /api/employees
    Crea un nuevo empleado con validación de datos
    - El título es requerido y no puede estar vacío
    - La descripción y salarios son opcionales
    """
    try:
        # Validar y deserializar datos de entrada
        print("empleado_data:", empleado_data)
        data = empleado_create_schema.load(empleado_data)
        print("Validated data:", data)
    except ValidationError as err:
        raise HTTPException(status_code=400, detail=err.messages)
    
    empleado = await crud.create_empleado(data)
    return empleado_schema.dump(empleado)

@router.put("/{empleado_id}", response_model=dict)
async def update_empleado(empleado_id: int, empleado_data: dict):
    """
    PUT /api/employees/{id}
    Actualiza un empleado existente con validación de datos
    - El título no puede estar vacío si se envía
    """
    try:
        # Validar y deserializar datos de entrada
        data = empleado_create_schema.load(empleado_data)
    except ValidationError as err:
        raise HTTPException(status_code=400, detail=err.messages)
    
    db_empleado = await crud.update_empleado(empleado_id=empleado_id, empleado=data)
    if db_empleado is None:
        raise HTTPException(status_code=404, detail="empleado no encontrado")
    return empleado_schema.dump(db_empleado)

@router.delete("/{empleado_id}")
async def delete_empleado(empleado_id: int):
    """
    DELETE /api/employees/{id}
    Elimina un empleado por su ID
    """
    success = await crud.delete_empleado(empleado_id=empleado_id)
    if not success:
        raise HTTPException(status_code=404, detail="Empleado no encontrado")
    return {"message": "Empleado eliminada correctamente"}