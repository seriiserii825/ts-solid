// =============================
// Задача 5 — Server + Middleware (расширяемая цепочка промежуточной логики)
// -----------------------------
// В сервере захардкожены шаги:
//  1) логирование
//  2) проверка авторизации
// ЗАДАЧА: спроектировать систему middleware так, чтобы можно было:
//   - легко добавлять новые шаги (rateLimit, auditLog, csrfProtection etc.)
//   - менять их порядок
//   - НЕ переписывать Server.handle при добавлении новых middleware.

type Request = { path: string; user?: { id: number } };
type Response = { send: (msg: string) => void };

class Server {
  handle(req: Request, res: Response) {
    console.log("log request:", req.path);

    if (!req.user) {
      res.send("Unauthorized");
      return;
    }

    console.log("User is authorized");
    res.send("OK");
  }
}

const server = new Server();
server.handle({ path: "/profile" }, { send: console.log });


