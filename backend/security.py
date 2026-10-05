import os
from datetime import datetime, timedelta, timezone

import jwt
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from pwdlib import PasswordHash


load_dotenv()


# ==========================================
# CONFIGURAÇÕES
# ==========================================

SECRET_KEY = os.getenv("SECRET_KEY")
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD_HASH")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


# ==========================================
# CONFIGURAÇÃO DE SENHA
# ==========================================

password_hash = PasswordHash.recommended()


# ==========================================
# CONFIGURAÇÃO DO TOKEN
# ==========================================

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/auth/login"
)


# ==========================================
# VERIFICAR SENHA
# ==========================================

def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:
    return password_hash.verify(
        plain_password,
        hashed_password
    )


# ==========================================
# CRIAR TOKEN
# ==========================================

def create_access_token(
    username: str,
    expires_delta: timedelta | None = None
) -> str:

    if not SECRET_KEY:
        raise RuntimeError(
            "SECRET_KEY não configurada."
        )

    if expires_delta:
        expire = (
            datetime.now(timezone.utc)
            + expires_delta
        )
    else:
        expire = (
            datetime.now(timezone.utc)
            + timedelta(
                minutes=ACCESS_TOKEN_EXPIRE_MINUTES
            )
        )

    payload = {
        "sub": username,
        "role": "admin",
        "exp": expire
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


# ==========================================
# AUTENTICAR ADMINISTRADOR
# ==========================================

def authenticate_admin(
    username: str,
    password: str
) -> bool:

    if not ADMIN_USERNAME:
        return False

    if not ADMIN_PASSWORD_HASH:
        return False

    if username != ADMIN_USERNAME:
        return False

    return verify_password(
        password,
        ADMIN_PASSWORD_HASH
    )


# ==========================================
# VALIDAR ADMINISTRADOR LOGADO
# ==========================================

def get_current_admin(
    token: str = Depends(oauth2_scheme)
) -> str:

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais.",
        headers={
            "WWW-Authenticate": "Bearer"
        }
    )

    if not SECRET_KEY:
        raise RuntimeError(
            "SECRET_KEY não configurada."
        )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        username = payload.get("sub")
        role = payload.get("role")

        if (
            not username
            or role != "admin"
            or username != ADMIN_USERNAME
        ):
            raise credentials_exception

        return username

    except InvalidTokenError:
        raise credentials_exception