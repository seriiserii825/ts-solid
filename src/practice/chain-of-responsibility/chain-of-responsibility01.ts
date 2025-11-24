// =============================
// ЗАДАЧА 1 — Валидация регистрации
// =============================
// Реализовать цепочку обработчиков:
//   1) Проверка email на пустоту
//   2) Проверка длины пароля (min 6)
//   3) Проверка, что email ещё не зарегистрирован (мок массив)
// Каждый обработчик должен вернуть свою ошибку или передать дальше.
// Функция register(user) должна запускать цепочку.


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

class EmailNotEmptyHandler extends Handler {
    handle(request: any): string | null {
        if (!request.email || request.email.trim() === '') {
            return 'Email cannot be empty.';
        }
        return super.handle(request);
    }
}
class PasswordLengthHandler extends Handler {
    handle(request: any): string | null {
        if (!request.password || request.password.length < 6) {
            return 'Password must be at least 6 characters long.';
        }
        return super.handle(request);
    }
}
class EmailUniqueHandler extends Handler {
    private registeredEmails: string[] = ['test@mail.com', 'some@mail.com'];
    handle(request: any): string | null {
        if (this.registeredEmails.includes(request.email)) {
            return 'Email is already registered.';
        }
        return super.handle(request);
    }
}

function register(user: any): string {
    const emailHandler = new EmailNotEmptyHandler();
    const passwordHandler = new PasswordLengthHandler();
    const uniqueEmailHandler = new EmailUniqueHandler();

    emailHandler.setNext(passwordHandler).setNext(uniqueEmailHandler);

    const error = emailHandler.handle(user);
    if (error) {
        return `Registration failed: ${error}`;
    }
    return 'Registration successful!';
}

const user1 = { email: 'some@mail.com', password: '123' };
console.log(register(user1)); // Registration failed: Email is already registered.

