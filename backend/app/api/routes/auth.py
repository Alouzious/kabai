from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.core.security import verify_password, create_access_token
from app.crud.user import get_user_by_email, create_user
from app.db.session import get_db
from app.schemas.user import LoginIn, Token, UserCreate, UserOut
from app.api.deps import get_current_super_admin, get_current_user
from app.core.config import settings
from app.core.limiter import limiter

router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


@router.post("/login", response_model=Token)
@limiter.limit(settings.LOGIN_RATE_LIMIT)
def login(request: Request, credentials: LoginIn, db: Session = Depends(get_db)): 
    user = get_user_by_email(db, credentials.email)
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    token = create_access_token({"sub": str(user.id)})

    response = JSONResponse(content={"access_token": token, "token_type": "bearer"})
    response.set_cookie(
        key="kabai_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=settings.is_production,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )
    return response


@router.post("/logout")
def logout():
    response = JSONResponse(content={"detail": "Logged out"})
    response.delete_cookie(
        key="kabai_token",
        path="/",
        samesite="lax",
        secure=settings.is_production,
    )
    return response


@router.get("/me")
def get_me(current_user=Depends(get_current_user)):
    return {"authenticated": True}


@router.post("/register", response_model=UserOut)
def register(
    user_in: UserCreate,
    db: Session = Depends(get_db),
    _current=Depends(get_current_super_admin),
):
    existing = get_user_by_email(db, user_in.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user(db, user_in)
