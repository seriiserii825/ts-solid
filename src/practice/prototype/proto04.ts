// ==========
// Задача 4
// ----------
// Сделай класс ACFBlock:
// name, fields (object).
// clone() должен глубоко копировать fields.
// Создай homeIntro → клонируй его в aboutIntro,
// измени поля title и image.

interface ACFBlockClone {
  clone(): ACFBlock
}

class ACFBlock implements ACFBlockClone {
  name: string
  fields: { [key: string]: any }

  constructor(name: string, fields: { [key: string]: any }) {
    this.name = name
    this.fields = fields
  }

  clone(): ACFBlock {
    // Глубокое копирование объекта fields
    const fieldsCopy = JSON.parse(JSON.stringify(this.fields))
    return new ACFBlock(this.name, fieldsCopy)
  }
}

const homeIntro = new ACFBlock('home_intro', {
  title: 'Welcome to Our Website',
  image: 'home.jpg',
  description: 'This is the introduction section for the homepage.'
})
const aboutIntro = homeIntro.clone()
aboutIntro.fields.title = 'About Us'
aboutIntro.fields.image = 'about.jpg'

