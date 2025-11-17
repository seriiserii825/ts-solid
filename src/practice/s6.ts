// class UserController {
//   async handleRegisterRequest(req: any, res: any) {
//     // валидация
//     if (!req.body.email || !req.body.password) {
//       res.status(400).send("Missing fields");
//       return;
//     }
//
//     // бизнес-логика
//     const user = {
//       id: Date.now(),
//       email: req.body.email,
//       password: "hashed-" + req.body.password,
//     };
//
//     // сохранение
//     console.log("Saving user to DB:", user);
//
//     // ответ
//     res.status(201).json(user);
//   }
// }

class UserController {
  private validator: UserValidator;
  private service: UserService;
  private responseHandler: HttpResponseHandler;

  constructor() {
    this.validator = new UserValidator();
    this.service = new UserService();
    this.responseHandler = new HttpResponseHandler();
  }

  async handleRegisterRequest(req: any, res: any) {
    try {
      this.validator.validateUserData(req.body);
      const user = this.service.createUser(req.body);
      this.responseHandler.sendResponse(res, 201, user);
    } catch (error) {
      this.responseHandler.sendResponse(res, 400, { error: error.message });
    }
  }
}

class UserValidator {
  validateUserData(data: any) {
    if (!data.email || !data.password) {
      throw new Error("Missing fields");
    }
  }
}
class UserService {
  createUser(data: any) {
    return {
      id: Date.now(),
      email: data.email,
      password: "hashed-" + data.password,
    };
  }
}
class HttpResponseHandler {
  sendResponse(res: any, status: number, data: any) {
    res.status(status).json(data);
  }
}
// Твоя задача:
// Опиши, на какие отдельные классы/слои это стоит разбить, и за что каждый будет отвечать (валидация, бизнес-логика, сохранение, HTTP-ответ и т.п.).

