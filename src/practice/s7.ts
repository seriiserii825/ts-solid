// 🧩 Задача 7 — Класс, который и парсит, и пишет файл
// ts
// Копировать код
// class ConfigManager {
//   loadConfig(path: string) {
//     const file = Deno.readTextFileSync(path);
//     return JSON.parse(file);
//   }
//
//   saveConfig(path: string, data: any) {
//     const json = JSON.stringify(data, null, 2);
//     Deno.writeTextFileSync(path, json);
//   }
//
//   getDatabaseUrl(config: any) {
//     return `${config.db.host}:${config.db.port}`;
//   }
// }
// Твоя задача:
// Найди здесь разные ответственности и предложи, какие классы/модули можно выделить (например, работа с файлами, парсинг/форматирование, доменная логика).
//

class ConfigLoader {
  loadConfig(path: string) {
    const file = Deno.readTextFileSync(path);
    return JSON.parse(file);
  }
}

class ConfigSaver {
  saveConfig(path: string, data: any) {
    const json = JSON.stringify(data, null, 2);
    Deno.writeTextFileSync(path, json);
  }
}

class ConfigDomain {
  getDatabaseUrl(config: any) {
    return `${config.db.host}:${config.db.port}`;
  }
}

class ConfigManager {
  private loader: ConfigLoader;
  private saver: ConfigSaver;
  private domain: ConfigDomain;
  constructor() {
    this.loader = new ConfigLoader();
    this.saver = new ConfigSaver();
    this.domain = new ConfigDomain();
  }
  loadConfig(path: string) {
    return this.loader.loadConfig(path);
  }
  saveConfig(path: string, data: any) {
    this.saver.saveConfig(path, data);
  }
  getDatabaseUrl(config: any) {
    return this.domain.getDatabaseUrl(config);
  }
}

