// =========================
// Задача 4 — Пользователь из разных API
// -------------------------
// Твой код ожидает единый интерфейс пользователя:
interface IUser {
  id: number;
  fullName: string;
  email: string;
}

// А у тебя 2 разных источника:
// 1) API A:
type ApiAUser = {
  id: number;
  name: string;
  mail: string;
};

// 2) API B:
type ApiBUser = {
  userId: number;
  first_name: string;
  last_name: string;
  email_address: string;
};

// ❗ ЗАДАЧА:
// Сделать два адаптера:
// - ApiAUser → IUser
// - ApiBUser → IUser
// чтобы остальной код всегда работал только с IUser.

// Адаптер для ApiAUser
function adaptApiAUser(apiAUser: ApiAUser): IUser {
  return {
    id: apiAUser.id,
    fullName: apiAUser.name,
    email: apiAUser.mail,
  };
}
// Адаптер для ApiBUser
function adaptApiBUser(apiBUser: ApiBUser): IUser {
  return {
    id: apiBUser.userId,
    fullName: `${apiBUser.first_name} ${apiBUser.last_name}`,
    email: apiBUser.email_address,
  };
}
// Пример использования:
const apiAUser: ApiAUser = {
  id: 1,
  name: "John Doe",
  mail: "some@mail.com",
};

const apiBUser: ApiBUser = {
  userId: 2,
  first_name: "Jane",
  last_name: "Smith",
  email_address: "some@mail.com",
};
const userFromA: IUser = adaptApiAUser(apiAUser);
const userFromB: IUser = adaptApiBUser(apiBUser);
console.log(userFromA); // { id: 1, fullName: "John Doe", email: "
console.log(userFromB); // { id: 2, fullName: "Jane Smith", email: "
