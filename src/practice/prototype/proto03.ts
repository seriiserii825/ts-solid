// ==========
// Задача 3
// ----------
// Создай класс ProductTemplate:
// title, price, meta (объект).
// Сделай clone().
// На основе baseProduct создай digitalProduct, но добавь meta.downloadUrl.

interface ProductClone {
  clone(): ProductTemplate
}

class ProductTemplate implements ProductClone {
  title: string
  price: number
  meta: { [key: string]: any }

  constructor(title: string, price: number, meta: { [key: string]: any }) {
    this.title = title
    this.price = price
    this.meta = meta
  }

  clone(): ProductTemplate {
    // Глубокое копирование объекта meta
    const metaCopy = JSON.parse(JSON.stringify(this.meta))
    return new ProductTemplate(this.title, this.price, metaCopy)
  }
}

const baseProduct = new ProductTemplate('Base Product', 100, { category: 'general' })
const digitalProduct = baseProduct.clone()
digitalProduct.meta.downloadUrl = 'http://example.com/download'
