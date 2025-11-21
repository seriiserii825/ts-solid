interface IMenuItem {
  render(indent: number): void;
}

class MenuItem implements IMenuItem {
  constructor(
    private label: string,
    private url: string,
  ) {}
  render(indent: number = 0): void {
    const prefix = " ".repeat(indent);
    console.log(`${prefix} ${this.label} - ${this.url}`);
  }
}

class MenuGroup implements IMenuItem {
  private children: IMenuItem[] = [];
  constructor(private label: string) {}

  add(item: IMenuItem): void {
    this.children.push(item);
  }

  remove(item: IMenuItem): void {
    this.children = this.children.filter((elem: IMenuItem) => {
      return item !== elem;
    });
  }

  render(indent: number = 0): void {
    const prefix = " ".repeat(indent);
    console.log(`${prefix} ${this.label}`);

    if (this.children.length) {
      this.children.forEach((child: IMenuItem) => {
        child.render(indent + 2);
      });
    }
  }
}

const menu_group = new MenuGroup("Main menu");
const home = new MenuItem("Home", "/");
const about = new MenuItem("About", "/about");
const services = new MenuGroup("Services");
services.add(new MenuItem("Service 1", "/services-1"));
services.add(new MenuItem("Service 2", "/services-2"));
const contacts = new MenuItem("Contacts", "/contacts");
menu_group.add(home)
menu_group.add(about)
menu_group.add(services)
menu_group.add(contacts)

menu_group.render()
