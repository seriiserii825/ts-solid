// Задача 1. Класс, который делает слишком много
// У тебя есть класс:
//
// ❗ Проблема: Класс нарушает SRP.
//
// 🔧 Твоя задача:
// Разбей этот класс на более мелкие, чтобы каждый отвечал за свою область.
// Напиши только структуру новых классов и их обязанности.
// class UserService {
//   createUser(data: any) { /* ... */ }
//   validateUser(data: any) { /* ... */ }
//   saveToDatabase(user: any) { /* ... */ }
//   sendWelcomeEmail(email: string) { /* ... */ }
// }

class User {
  name: string;
  email: string;
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

class UserRepository {
  createUser(data: any): User {
    return new User(data.name, data.email);
  }
  saveToDb(user: User): void {
    console.log(`User ${user.name} saved to database.`);
  }
}

class UserValidator {
  validateUser(data: any): boolean {
    // Простая валидация для примера
    return data.name && data.email;
  }
}

class EmailService {
  sendWelcomeEmail(email: string): void {
    console.log(`Welcome email sent to ${email}.`);
  }
}

class UserService {
  private userRepository: UserRepository;
  private userValidator: UserValidator;
  private emailService: EmailService;

  constructor() {
    this.userRepository = new UserRepository();
    this.userValidator = new UserValidator();
    this.emailService = new EmailService();
  }

  registerUser(data: any): void {
    if (this.userValidator.validateUser(data)) {
      const user = this.userRepository.createUser(data);
      this.userRepository.saveToDb(user);
      this.emailService.sendWelcomeEmail(user.email);
    } else {
      console.log("Invalid user data.");
    }
  }
}

const userService = new UserService();
userService.registerUser({ name: "John Doe", email: "test@gmail.com" });

