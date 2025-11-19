// ==========
// Задача 5
// ----------
// Создай класс SCSSModuleTemplate:
// content: string.
// clone(): возвращает копию.
// На основе baseModule создай 3 копии с разными именами классов:
// .services, .contacts, .faq (подставь через replace).

interface ScssClone {
  content: string;
  clone(): ScssClone;
}

class SCSSModuleTemplate implements ScssClone {
  content: string;

  constructor(content: string) {
    this.content = content;
  }

  clone(): SCSSModuleTemplate {
    return new SCSSModuleTemplate(this.content);
  }
}

const baseModule = new SCSSModuleTemplate(`
.component {
  display: block;
  margin: 10px;
}
`);

const servicesModule = baseModule.clone();
servicesModule.content = servicesModule.content.replace(
  '.component',
  '.services'
);
const contactsModule = baseModule.clone();
contactsModule.content = contactsModule.content.replace(
  '.component',
  '.contacts'
);
