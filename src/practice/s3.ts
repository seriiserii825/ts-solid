// Задача 3. Хранение и рендеринг
// Есть класс:
//
// ts
// Копировать код
// class Report {
//   constructor(private data: any) {}
//
//   prepareData() { /* ... */ }
//   saveToFile() { /* ... */ }
//   renderHtml() { /* ... */ }
// }
// Это три разных обязанности.
//
// 🔧 Твоя задача:
// Разбей на 2–3 класса, каждому назначь единственную ответственность.

class DataPreparer {
  prepareData(data: any) {
    console.log(`Preparing data:`, data);
  }
}

class FileSaver {
  saveToFile(data: any, file_path: string) {
    console.log(`Saving data to file: ${file_path}`);
  }
}

class HtmlRender {
  renderHtml(file_path: string, data: any) {
    console.log(`Rendering HTML from file: ${file_path}`);
  }
}

class Report {
  private dataPreparer: DataPreparer;
  private fileSaver: FileSaver;
  private htmlRender: HtmlRender;
  private data: any;
  constructor(data: any, dataPreparer: DataPreparer, fileSaver: FileSaver, htmlRender: HtmlRender) {
    this.data = data;
    this.dataPreparer = dataPreparer;
    this.fileSaver = fileSaver;
    this.htmlRender = htmlRender;
  }

  prepareData() {
    this.dataPreparer.prepareData(this.data);
  }
  saveToFile() {
    this.fileSaver.saveToFile(this.data, "some/file/path.css");
  }
  renderHtml() {
    this.htmlRender.renderHtml("some/file/path.css", this.data);
  }
}

const report = new Report(
  { title: "Annual Report" },
  new DataPreparer(),
  new FileSaver(),
  new HtmlRender()
);

