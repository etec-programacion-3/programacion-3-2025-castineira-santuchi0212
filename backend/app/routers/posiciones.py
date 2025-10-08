from fastapi import APIRouter, HTTPException
from typing import List
from marshmallow import ValidationError

from app import crud
from app.schemas import PosicionSchema, PosicionCreateSchema

router = APIRouter()
posicion_schema = PosicionSchema()
posiciones_schema = PosicionSchema(many=True)
posicion_create_schema = PosicionCreateSchema()

@router.get("/", response_model=List[dict])
async def read_posiciones(skip: int = 0, limit: int = 100):
    """
    GET /api/positions
    Obtiene una lista de todas las posiciones con paginación
    """
    posiciones = await crud.get_posiciones(skip=skip, limit=limit)
    return posiciones_schema.dump(posiciones)

@router.get("/{posicion_id}", response_model=dict)
async def read_posicion(posicion_id: int):
    """
    GET /api/positions/{id}
    Obtiene una posición específica por su ID
    """
    db_posicion = await crud.get_posicion(posicion_id=posicion_id)
    if db_posicion is None:
        raise HTTPException(status_code=404, detail="Posición no encontrada")
    return posicion_schema.dump(db_posicion)

@router.post("/", response_model=dict, status_code=201)
async def create_posicion(posicion_data: dict):
    """
    POST /api/positions
    Crea una nueva posición con validación de datos
    - El título es requerido y no puede estar vacío
    - La descripción y salarios son opcionales
    """
    try:
        # Validar y deserializar datos de entrada
        data = posicion_create_schema.load(posicion_data)
    except ValidationError as err:
        raise HTTPException(status_code=400, detail=err.messages)
    
    posicion = await crud.create_posicion(data)
    return posicion_schema.dump(posicion)

@router.put("/{posicion_id}", response_model=dict)
async def update_posicion(posicion_id: int, posicion_data: dict):
    """
    PUT /api/positions/{id}
    Actualiza una posición existente con validación de datos
    - El título no puede estar vacío si se envía
    """
    try:
        # Validar y deserializar datos de entrada
        data = posicion_create_schema.load(posicion_data)
    except ValidationError as err:
        raise HTTPException(status_code=400, detail=err.messages)
    
    db_posicion = await crud.update_posicion(posicion_id=posicion_id, posicion=data)
    if db_posicion is None:
        raise HTTPException(status_code=404, detail="Posición no encontrada")
    return posicion_schema.dump(db_posicion)

@router.delete("/{posicion_id}")
async def delete_posicion(posicion_id: int):
    """
    DELETE /api/positions/{id}
    Elimina una posición por su ID
    """
    success = await crud.delete_posicion(posicion_id=posicion_id)
    if not success:
        raise HTTPException(status_code=404, detail="Posición no encontrada")
    return {"message": "Posición eliminada correctamente"}