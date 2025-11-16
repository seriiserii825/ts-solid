// Задача 4. API + кеширование
// Дан класс:
//
// ts
// Копировать код
// class WeatherApi {
//   fetchWeather(city: string) { /* fetch */ }
//   cacheWeather(data: any) { /* localStorage */ }
//   getCachedWeather() { /* ... */ }
// }
// 🔧 Твоя задача:
// Сделать архитектуру, где:
//
// один класс делает запросы
//
// другой работает с кешем
//
// Опиши, какие классы должны быть и какие методы.

class WeatherFetcher {
  fetchWeather(city: string) {
    console.log(`Fetching weather for city: ${city}`);
  }
}

class WeatherCaching {
  cacheWeather(data: any) {
    localStorage.setItem("weatherData", JSON.stringify(data));
  }
  getCachedWeather() {
    const data = localStorage.getItem("weatherData");
    return data ? JSON.parse(data) : null;
  }
}

class WeatherApi {
  private fetcher: WeatherFetcher;
  private caching: WeatherCaching;
  constructor(fetcher: WeatherFetcher, caching: WeatherCaching) {
    this.fetcher = fetcher;
    this.caching = caching;
  }
  fetchWeather(city: string) {
    this.fetcher.fetchWeather(city);
  }
  cacheWeather(data: any) {
    this.caching.cacheWeather(data);
  }
  getCachedWeather() {
    return this.caching.getCachedWeather();
  }
}

const weatherApi = new WeatherApi(new WeatherFetcher(), new WeatherCaching());
weatherApi.fetchWeather("New York");
weatherApi.cacheWeather({ temp: 25, condition: "Sunny" });
console.log(weatherApi.getCachedWeather());
