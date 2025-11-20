// ===============================
// 7) Контроллеры в приложении
// -------------------------------
// Абстракция: UserController, ProductController
// Реализация: MemoryDB, MySQLDriver, PostgresDriver
// ЗАДАЧА: Контроллеры должны работать с любой базой без изменения кода контроллера.

interface DBDriver {
    connect(): void;
    disconnect(): void;
    query(sql: string): any[];
}

class MemoryDB implements DBDriver {
    connect() {
        console.log("Connected to MemoryDB");
    }
    disconnect() {
        console.log("Disconnected from MemoryDB");
    }
    query(sql: string) {
        console.log(`Querying MemoryDB with SQL: ${sql}`);
        return [];
    }
}
class MySQLDriver implements DBDriver {
    connect() {
        console.log("Connected to MySQL");
    }
    disconnect() {
        console.log("Disconnected from MySQL");
    }
    query(sql: string) {
        console.log(`Querying MySQL with SQL: ${sql}`);
        return [];
    }
}
class PostgresDriver implements DBDriver {
    connect() {
        console.log("Connected to Postgres");
    }
    disconnect() {
        console.log("Disconnected from Postgres");
    }
    query(sql: string) {
        console.log(`Querying Postgres with SQL: ${sql}`);
        return [];
    }
}

abstract class Controller {
    protected dbDriver: DBDriver;

    constructor(dbDriver: DBDriver) {
        this.dbDriver = dbDriver;
    }

    abstract getAll(): any[];
}

class UserController extends Controller {
    getAll(): any[] {
        this.dbDriver.connect();
        const users = this.dbDriver.query("SELECT * FROM users");
        this.dbDriver.disconnect();
        return users;
    }
}

class ProductController extends Controller {
    getAll(): any[] {
        this.dbDriver.connect();
        const products = this.dbDriver.query("SELECT * FROM products");
        this.dbDriver.disconnect();
        return products;
    }
}

const mysqlDriver = new MySQLDriver();
const userController = new UserController(mysqlDriver);
userController.getAll();
const postgresDriver = new PostgresDriver();
const productController = new ProductController(postgresDriver);
productController.getAll();
const memoryDBDriver = new MemoryDB();
const anotherUserController = new UserController(memoryDBDriver);
anotherUserController.getAll();
