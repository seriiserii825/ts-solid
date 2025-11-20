export default function cardBuilder() {
  interface IButton {
    label: string;
    url: string;
  }
  interface ICard {
    title: string;
    description: string;
    imageUrl: string;
    badge?: string;
    actions: IButton[];
    theme: "dark" | "light";
  }
  interface ICardBuilder {
    setTitle(text: string): this;
    setDescription(text: string): this;
    setImage(url: string): this;
    setBadge(text: string): this;
    addAction(label: string, url: string): this;
    setTheme(theme: string): this;
    build(): ICard;
  }
  class CardBuilder implements ICardBuilder {
    private title: string = "";
    private description: string = "";
    private imageUrl: string = "";
    private badge?: string = "";
    private actions: IButton[] = [];
    private theme: "dark" | "light" = "light";
    setTitle(text: string): this {
      this.title = text;
      return this;
    }
    setDescription(text: string): this {
      this.description = text;
      return this;
    }
    setImage(url: string): this {
      this.imageUrl = url;
      return this;
    }
    setBadge(text: string): this {
      this.badge = text;
      return this;
    }
    addAction(label: string, url: string): this {
      this.actions.push({ label, url });
      return this;
    }
    setTheme(theme: string): this {
      if (theme === "dark" || theme === "light") {
        this.theme = theme;
      }
      return this;
    }
    build(): ICard {
      return {
        title: this.title,
        description: this.description,
        imageUrl: this.imageUrl,
        badge: this.badge,
        actions: this.actions,
        theme: this.theme,
      };
    }
  }
  const card_builder = new CardBuilder();
  const card = card_builder
    .setTitle("Amazing Product")
    .setDescription("This product will change your life!")
    .setImage("https://example.com/image.jpg")
    .setBadge("Sale")
    .addAction("Buy now", "https://example.com/buy")
    .addAction("More info", "https://example.com/info")
    .setTheme("dark")
    .build();
  console.log(card);
}
