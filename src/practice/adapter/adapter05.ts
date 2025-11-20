// =========================
// Задача 5 — Хранилище файлов
// -------------------------
// Есть интерфейс абстрактного хранилища:
interface FileStorage {
  save(path: string, content: string): void;
  read(path: string): string;
}

// И 2 реализации, которые менять нельзя:
// 1) Локальная ФС:
class LocalFs {
  writeFile(filePath: string, data: string) {
    console.log("Writing to local file system...");
  }
  readFile(filePath: string): string {
    console.log("Reading from local file system...");
    return "";
  }
}

interface ILocalFs {
  writeFile(filePath: string, data: string): void;
  readFile(filePath: string): string;
}

// 2) Облачное хранилище:
class CloudStorageSDK {
  upload(key: string, body: string) {
    console.log("Uploading to cloud...");
  }
  download(key: string): string {
    console.log("Downloading from cloud...");
    return "";
  }
}

interface ICloudStorageSDK {
  upload(key: string, body: string): void;
  download(key: string): string;
}

// ❗ ЗАДАЧА:
// Написать два адаптера:
// - LocalFs → FileStorage
// - CloudStorageSDK → FileStorage
// чтобы в клиентском коде можно было легко подменять реализацию.

class LocalFsAdapter implements FileStorage {
  constructor(private f_storage: ILocalFs) {}
  save(path: string, content: string) {
    this.f_storage.writeFile(path, content);
  }
  read(path: string): string {
    return this.f_storage.readFile(path);
  }
}

class CloudStorageAdapter implements FileStorage {
  constructor(private cloud: ICloudStorageSDK) {}
  save(path: string, content: string) {
    this.cloud.upload(path, content);
  }
  read(path: string): string {
    return this.cloud.download(path);
  }
}

const localFsStorage: FileStorage = new LocalFsAdapter(new LocalFs());
const cloudStorage: FileStorage = new CloudStorageAdapter(
  new CloudStorageSDK()
);
localFsStorage.save("/path/to/local/file.txt", "Local file content");
cloudStorage.save("path/to/cloud/file.txt", "Cloud file content");
localFsStorage.read("/path/to/local/file.txt");
cloudStorage.read("path/to/cloud/file.txt");

