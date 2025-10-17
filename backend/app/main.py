from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import init_db, close_db
from app.routers import departamentos, posiciones, empleados

app = FastAPI(
    title="Empleados API",
    description="API para gestionar departamentos y posiciones",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(departamentos.router, prefix="/api/departments", tags=["departments"])
app.include_router(posiciones.router, prefix="/api/positions", tags=["positions"])
app.include_router(empleados.router, prefix="/api/employees", tags=["employees"])

@app.on_event("startup")
async def startup_event():
    await init_db(app)

@app.on_event("shutdown")
async def shutdown_event():
    await close_db()

@app.get("/")
async def root():
    return {"message": "Bienvenido a la API de Gestión de Recursos"}