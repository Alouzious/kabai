import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import text

from app.core.config import settings
from app.db.session import engine

from app.api.routes import (
    auth,
    projects,
    team,
    events,
    research_papers,
    gallery,
    learning,
    partners,
    newsletter,
    uploads,
)

logging.basicConfig(
    level=logging.INFO if settings.is_production else logging.DEBUG,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("kabai")

app = FastAPI(
    title=settings.PROJECT_NAME,
    docs_url=None if settings.is_production else "/docs",
    redoc_url=None if settings.is_production else "/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"{request.method} {request.url.path}")
    response = await call_next(request)
    logger.info(f"{request.method} {request.url.path} -> {response.status_code}")
    return response


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error on {request.url.path}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


app.include_router(auth.router)
app.include_router(projects.router)
app.include_router(team.router)
app.include_router(events.router)
app.include_router(research_papers.router)
app.include_router(gallery.router)
app.include_router(learning.router)
app.include_router(partners.router)
app.include_router(newsletter.router)
app.include_router(uploads.router)


@app.on_event("startup")
def run_startup_tasks():
    from datetime import datetime
    from app.db.session import SessionLocal
    from app.crud.team import refresh_archiving

    db = SessionLocal()
    try:
        current_year = datetime.utcnow().year
        refresh_archiving(db, current_year)
        logger.info(f"Team archiving refreshed for year {current_year}")
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "Kabale AI Club API is running"}


@app.get("/health")
def health_check():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except Exception as e:
        return {"status": "error", "database": "disconnected", "detail": str(e)}
