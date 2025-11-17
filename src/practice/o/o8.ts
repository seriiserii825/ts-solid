// 8) Валидация форм
// Есть класс FormValidator с методами validateEmail, validatePassword.
//
// Требование: добавь новую валидацию (имя, телефон, возраст)
// так, чтобы не нужно было изменять сам валидатор.

interface Validator {
  validate(value: string): boolean;
}

class EmailValidator implements Validator {
  validate(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }
}

class PasswordValidator implements Validator {
  validate(value: string): boolean {
    return value.length >= 8;
  }
}
class NameValidator implements Validator {
  validate(value: string): boolean {
    return /^[A-Za-z\s]+$/.test(value) && value.trim().length > 0;
  }
}
