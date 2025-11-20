// ===============================
// 9) Отчёты аналитики
// -------------------------------
// Абстракция: Report (generate())
// Реализация: JsonExporter, CsvExporter, XmlExporter
// ЗАДАЧА: Один и тот же отчёт должен экспортироваться в разные форматы.

interface Exporter {
    export(data: any): string;
}

class JsonExporter implements Exporter {
    export(data: any): string {
        return JSON.stringify(data, null, 2);
    }
}

class CsvExporter implements Exporter {
    export(data: any): string {
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map((row: any) => Object.values(row).join(',')).join('\n');
        return `${headers}\n${rows}`;
    }
}

class XmlExporter implements Exporter {
    export(data: any): string {
        let xml = '<report>\n';
        data.forEach((item: any) => {
            xml += '  <item>\n';
            for (const key in item) {
                xml += `    <${key}>${item[key]}</${key}>\n`;
            }
            xml += '  </item>\n';
        });
        xml += '</report>';
        return xml;
    }
}

abstract class Report {
    protected exporter: Exporter;

    constructor(exporter: Exporter) {
        this.exporter = exporter;
    }

    abstract generate(): string;
}

class SalesReport extends Report {
    private data: any[];

    constructor(exporter: Exporter, data: any[]) {
        super(exporter);
        this.data = data;
    }

    generate(): string {
        return this.exporter.export(this.data);
    }
}

// Пример использования:
const salesData = [
    { product: 'Laptop', quantity: 10, price: 999.99 },
    { product: 'Smartphone', quantity: 25, price: 499.99 },
    { product: 'Tablet', quantity: 15, price: 299.99 },
];
const jsonReport = new SalesReport(new JsonExporter(), salesData);
console.log('JSON Report:\n', jsonReport.generate());
const csvReport = new SalesReport(new CsvExporter(), salesData);
console.log('CSV Report:\n', csvReport.generate());
const xmlReport = new SalesReport(new XmlExporter(), salesData);
console.log('XML Report:\n', xmlReport.generate());
