// =============================
// Задача 3 — DocumentGenerator (разные типы документов)
// -----------------------------
// Сейчас генерируется только один тип документа — invoice.
// ЗАДАЧА: спроектировать решение, где можно добавлять новые типы
// документов: "contract", "offer", "serviceAct" и т.п.
// при этом НЕ менять существующий код DocumentGenerator.
// Подумать про общий интерфейс "документа" или "рендерера документа".

type InvoiceData = {
  invoiceNumber: string;
  total: number;
};

interface DocumentRenderer {
  render(data: any): string;
}

class InvoiceDocument implements DocumentRenderer {
  render(data: InvoiceData): string {
    return `Invoice #${data.invoiceNumber}, total: ${data.total}`;
  }
}

class ContractDocument implements DocumentRenderer {
  render(data: { contractNumber: string; partyA: string; partyB: string }): string {
    return `Contract #${data.contractNumber} between ${data.partyA} and ${data.partyB}`;
  }
}

class OfferDocument implements DocumentRenderer {
  render(data: { offerNumber: string; validUntil: string }): string {
    return `Offer #${data.offerNumber}, valid until ${data.validUntil}`;
  }
}

class DocumentGenerator {
  private renderer: DocumentRenderer;

  constructor(renderer: DocumentRenderer) {
    this.renderer = renderer;
  }

  generate(data: any): string {
    return this.renderer.render(data);
  }
}

const invoiceGenerator = new DocumentGenerator(new InvoiceDocument());
console.log(invoiceGenerator.generate({ invoiceNumber: "123", total: 1000 }));

const contractGenerator = new DocumentGenerator(new ContractDocument());
console.log(contractGenerator.generate({ contractNumber: "456", partyA: "Alice", partyB: "Bob" }));

const offerGenerator = new DocumentGenerator(new OfferDocument());
console.log(offerGenerator.generate({ offerNumber: "789", validUntil: "2024-12-31" }));


