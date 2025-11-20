// =========================
// Задача 7 — База данных
// -------------------------
// Есть абстрактный интерфейс репозитория:
interface IUserRepository {
  findById(id: number): Promise<{ id: number; name: string } | null>;
}

// И есть два "сырых" клиента:
// 1) MySQLClient:
class MySQLClient {
  query(sql: string): Promise<any[]> {
    return Promise.resolve(
      [
        { id: 1, name: 'Mysql client' },
      ]
    );
  }
}

interface IMySQLClient {
  query(sql: string): Promise<any[]>;
}

// 2) MongoClient:
class MongoClient {
  findOne(collection: string, filter: object): Promise<any | null> {
    return Promise.resolve({
      id: 1,
      name: 'Mongo client',
    })
  }
}
interface IMongoClient {
  findOne(collection: string, filter: object): Promise<any | null>;
}

// ❗ ЗАДАЧА:
// Сделать два адаптера:
// - MySQLClient → IUserRepository
// - MongoClient → IUserRepository
// чтобы сервисы работали только с IUserRepository.

class MongoClientAdapter implements IUserRepository {
  constructor(private mysql_client: IMySQLClient) {}

  async findById(id: number): Promise<{id: number; name: string;} | null> {
    const result = await this.mysql_client.query(`SELECT id, name FROM users WHERE id = ${id} LIMIT 1`);
    if (result.length === 0) {
      return null;
    }
    const user = result[0];
    return { id: user.id, name: user.name };
  }
}

class MySQLClientAdapter implements IUserRepository {
  constructor(private mongo_client: IMongoClient) {}

  async findById(id: number): Promise<{id: number; name: string;} | null> {
    const result = await this.mongo_client.findOne('users', { id });
    if (!result) {
      return null;
    }
    return { id: result.id, name: result.name };
  }
}

const mysqlClient = new MySQLClient();
const mongoClient = new MongoClient();
const mysqlAdapter = new MongoClientAdapter(mysqlClient);
const mongoAdapter = new MySQLClientAdapter(mongoClient);
// Теперь можно использовать адаптеры как IUserRepository
async function testAdapters() {
  const userFromMySQL = await mysqlAdapter.findById(1);
  console.log('User from MySQL:', userFromMySQL);

  const userFromMongo = await mongoAdapter.findById(1);
  console.log('User from MongoDB:', userFromMongo);
}
testAdapters();

