from tortoise.expressions import Q
from app.models import Posicion
from app.models import Departamento

async def get_Posicion(posicion_id: int):
    return await Posicion.get_or_none(id=posicion_id)

async def get_posicion(skip: int = 0, limit: int = 100):
    return await Posicion.all().offset(skip).limit(limit)

async def create_posicion(posicion: dict):
    return await Posicion.create(**posicion)

async def update_posicion(posicion_id: int, posicion: dict):
    await Posicion.filter(id=posicion_id).update(**posicion)
    return await get_posicion(posicion_id)

async def delete_posicion(posicion_id: int):
    deleted_count = await Posicion.filter(id=posicion_id).delete()
    return deleted_count > 0 