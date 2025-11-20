// =========================
// Задача 3 — Парсер данных
// -------------------------
// Клиент ожидает интерфейс JSON-парсера:
interface IJsonParser {
  parse(json: string): object;
}

// Но библиотека, которую нельзя менять, даёт только XML-парсер:
class XmlParser {
  parseXml(xml: string): object {
    // Концептуальная реализация парсинга XML
    return { parsed: "xml data" };
  }
}

// ❗ ЗАДАЧА:
// Реализовать адаптер XmlParser → IJsonParser,
// который внутри будет как-то конвертировать JSON → XML (хотя бы концептуально).

interface IxmLParser {
  parseXml(xml: string): object;
}

class XmlToJsonAdapter implements IJsonParser {
  private xmlParser: IxmLParser;

  constructor(xmlParser: IxmLParser) {
    this.xmlParser = xmlParser;
  }

  parse(json: string): object {
    const xml = this.convertJsonToXml(json);
    return this.xmlParser.parseXml(xml);
  }

  private convertJsonToXml(json: string): string {
    // Концептуальная реализация конвертации JSON в XML
    // В реальной ситуации здесь будет полноценная логика конвертации
    return `<data>${json}</data>`;
  }
}

const xmlParser = new XmlParser();
const jsonParser: IJsonParser = new XmlToJsonAdapter(xmlParser);
const jsonData = '{"name": "John", "age": 30}';
const parsedData = jsonParser.parse(jsonData);
console.log(parsedData);
