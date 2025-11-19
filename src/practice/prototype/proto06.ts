// ==========
// Задача 6
// ----------
// Создай класс RequestConfig:
// method, headers (object), timeout.
// clone().
// Создай configGET и configGETAuth (клон, добавь header Authorization).

interface RequestClone {
  method: string;
  headers: { [key: string]: string };
  timeout: number;

  clone(): RequestClone;
}

class RequestConfig implements RequestClone {
  method: string;
  headers: { [key: string]: string };
  timeout: number;

  constructor(
    method: string,
    headers: { [key: string]: string },
    timeout: number
  ) {
    this.method = method;
    this.headers = headers;
    this.timeout = timeout;
  }

  clone(): RequestClone {
    return new RequestConfig(
      this.method,
      { ...this.headers },
      this.timeout
    );
  }
}

const configGET = new RequestConfig('GET', { 'Content-Type': 'application/json' }, 5000);
const configGETAuth = configGET.clone();
configGETAuth.headers['Authorization'] = 'Bearer token 123';
