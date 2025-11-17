// 5) Экспорт данных
// Система экспортирует данные в JSON.
//
// Требование: добавь экспорт в CSV, XML так, чтобы код экспортера был закрыт для изменения, но открыт для добавления новых форматов.

interface Exporter {
    export(data: unknown): string;
}

class Json implements Exporter {
  export(data: unknown): string {
    return JSON.stringify(data, null, 2);
  }
}

class Csv implements Exporter {
  export(data: unknown): string {
    if (!Array.isArray(data) || data.length === 0) {
      return '';
    }
    const keys = Object.keys(data[0]);
    const csvRows = data.map((row: any) =>
      keys.map(key => row[key]).join(',')
    );
    return [keys.join(','), ...csvRows].join('\n');
  }
}

class Xml implements Exporter {
  export(data: unknown): string {
    if (!Array.isArray(data)) {
      return '';
    }
    let xml = '<items>\n';
    data.forEach((item: any) => {
      xml += '  <item>\n';
      for (const key in item) {
        xml += `    <${key}>${item[key]}</${key}>\n`;
      }
      xml += '  </item>\n';
    });
    xml += '</items>';
    return xml;
  }
}

const data = [
  { id: 1, name: 'Item 1', value: 100 },
  { id: 2, name: 'Item 2', value: 200 },
]

const jsonExporter = new Json();
console.log('JSON Export:\n', jsonExporter.export(data));

const csvExporter = new Csv();
console.log('CSV Export:\n', csvExporter.export(data));

const xmlExporter = new Xml();
console.log('XML Export:\n', xmlExporter.export(data));
