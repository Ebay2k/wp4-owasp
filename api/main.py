import asyncio
import os

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from .db import add_random_listing, setup_database
from .routers import companies, listings

interval = int(os.environ.get("LISTING_CREATION_INTERVAL"))

async def periodically_create_listing():
    try:
        while interval:
            add_random_listing()
            await asyncio.sleep(interval)
    except asyncio.CancelledError:
        return

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Actions to do on startup (if any)
    setup_database()
    create_listing_task = asyncio.create_task(periodically_create_listing())
    # Yielding for the application to run
    yield
    # Actions to do on shutdown (if any)
    create_listing_task.cancel()


app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"] ,
    allow_headers=["*"] ,
)

@app.get("/")
async def root():
    return RedirectResponse(url="/docs")

app.include_router(companies.router)
app.include_router(listings.router)
