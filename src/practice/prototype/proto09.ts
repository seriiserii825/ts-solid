// ==========
// Задача 9
// ----------
// Создай класс MenuItem:
// title, link, children (array).
// clone(): глубокая копия children.
// Создай mainItem → cloneItem и измени title,
// убедись, что children не связаны.

interface MenuItemClone {
  title: string;
  link: string;
  children: MenuItemClone[];
  clone(): MenuItem;
}

class MenuItem implements MenuItemClone {
  title: string;
  link: string;
  children: MenuItem[];

  constructor(title: string, link: string, children: MenuItem[] = []) {
    this.title = title;
    this.link = link;
    this.children = children;
  }

  clone(): MenuItem {
    const clonedChildren = this.children.map(child => child.clone());
    return new MenuItem(this.title, this.link, clonedChildren);
  }
}

const mainItem = new MenuItem("Home", "/home", [
  new MenuItem("About", "/about"),
  new MenuItem("Services", "/services"),
]);
const cloneItem = mainItem.clone();
cloneItem.title = "Main";
cloneItem.children[0].title = "About Us";
console.log(mainItem);
