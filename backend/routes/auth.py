from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel

from security import (
    authenticate_admin,
    create_access_token
)


router = APIRouter(
    prefix="/api/auth",
    tags=["Autenticação"]
)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends()
):
    authenticated = authenticate_admin(
        form_data.username,
        form_data.password
    )

    if not authenticated:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário ou senha inválidos.",
            headers={
                "WWW-Authenticate": "Bearer"
            }
        )

    token = create_access_token(
        form_data.username
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }