
// Общий интерфейс
interface MenuComponent {
  render(indent?: number): void;
}

// Лист — обычный пункт меню
class MenuItem implements MenuComponent {
  constructor(private label: string, private link: string) {}

  render(indent: number = 0): void {
    const prefix = " ".repeat(indent);
    console.log(`${prefix}- ${this.label} (${this.link})`);
  }
}

// Composite — меню, которое может содержать пункты и подменю
class MenuGroup implements MenuComponent {
  private children: MenuComponent[] = [];

  constructor(private label: string) {}

  add(child: MenuComponent): void {
    this.children.push(child);
  }

  remove(child: MenuComponent): void {
    this.children = this.children.filter((c) => c !== child);
  }

  render(indent: number = 0): void {
    const prefix = " ".repeat(indent);
    console.log(`${prefix}${this.label}:`);

    for (const child of this.children) {
      child.render(indent + 2);
    }
  }
}

// Использование
const mainMenu = new MenuGroup("Main menu");

const home = new MenuItem("Home", "/");
const about = new MenuItem("About", "/about");

const services = new MenuGroup("Services");
services.add(new MenuItem("Web Development", "/services/web"));
services.add(new MenuItem("SEO", "/services/seo"));

const contact = new MenuItem("Contact", "/contact");

mainMenu.add(home);
mainMenu.add(about);
mainMenu.add(services);
mainMenu.add(contact);

// Клиенту не важно, item это или group
mainMenu.render();
