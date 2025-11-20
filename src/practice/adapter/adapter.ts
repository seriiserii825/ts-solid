// =========================
// Задача 10 — Конвертер единиц измерения
// -------------------------
// Клиент ожидает интерфейс:
interface DistanceProvider {
  getDistanceInKm(): number;
}

// А есть разные источники:
// 1) Источник A: возвращает метры
class MetersSource {
  getMeters(): number {
    return 1000;
  }
}
interface IMetersSource {
  getMeters(): number;
}

// 2) Источник B: возвращает мили
class MilesSource {
  getMiles(): number {
    return 1;
  }
}
interface MilesSource {
  getMiles(): number;
}

// ❗ ЗАДАЧА:
// Сделать два адаптера:
// - MetersSource → DistanceProvider
// - MilesSource → DistanceProvider
// с корректным пересчётом в километры.
// =========================

class MetersSourceAdapter implements DistanceProvider {
  private metersSource: IMetersSource;

  constructor(metersSource: IMetersSource) {
    this.metersSource = metersSource;
  }

  getDistanceInKm(): number {
    return this.metersSource.getMeters() / 1000;
  }
}

class MilesSourceAdapter implements DistanceProvider {
  private milesSource: MilesSource;

  constructor(milesSource: MilesSource) {
    this.milesSource = milesSource;
  }

  getDistanceInKm(): number {
    return this.milesSource.getMiles() * 1.60934;
  }
}

const metersSource: IMetersSource = new MetersSource();
const metersAdapter: DistanceProvider = new MetersSourceAdapter(metersSource);
console.log(`Distance in km (from meters): ${metersAdapter.getDistanceInKm()}`);
const milesSource: MilesSource = new MilesSource();
const milesAdapter: DistanceProvider = new MilesSourceAdapter(milesSource);
console.log(`Distance in km (from miles): ${milesAdapter.getDistanceInKm()}`);

