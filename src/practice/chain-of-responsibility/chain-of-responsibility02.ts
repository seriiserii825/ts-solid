// =============================
// ЗАДАЧА 2 — Авторизация в API
// =============================
// Сделать цепочку middleware:
//   1) Проверка наличия токена
//   2) Проверка формата токена (JWT-like)
//   3) Проверка роли пользователя
// Если одна проверка не прошла — цепочка должна остановиться.


class Handler {
    private nextHandler: Handler | null = null;

    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    handle(request: any): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}

class HasTokenHandler extends Handler {
handle(request: any): string | null {
        if (!request.token || request.token.trim() === '') {
            return 'Token is missing.';
        }
        return super.handle(request);
    }
}

class TokenFormatHandler extends Handler {
    handle(request: any): string | null {
        const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
        if (!jwtPattern.test(request.token)) {
            return 'Token format is invalid.';
        }
        return super.handle(request);
    }
}

class UserRoleHandler extends Handler {
    private allowedRoles: string[] = ['admin', 'user'];
    handle(request: any): string | null {
        if (!this.allowedRoles.includes(request.role)) {
            return 'User role is not authorized.';
        }
        return super.handle(request);
    }
}

function authorize(request: any): string {
    const hasTokenHandler = new HasTokenHandler();
    const tokenFormatHandler = new TokenFormatHandler();
    const userRoleHandler = new UserRoleHandler();

    hasTokenHandler.setNext(tokenFormatHandler).setNext(userRoleHandler);

    const error = hasTokenHandler.handle(request);
    return error ? error : 'Authorization successful.';
}
