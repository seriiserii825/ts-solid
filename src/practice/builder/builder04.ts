export default function buttonBuilder() {
  type TSize = "small" | "medium" | "large";
  interface IButton {
    text: string;
    color: string;
    size: TSize;
    rounded: boolean;
  }
  interface IButtonBuilder {
    setText(text: string): this;
    setColor(color: string): this;
    setSize(size: TSize): this;
    setRounded(value: boolean): this;
    build(): IButton;
  }
  class ButtonBuilder implements IButtonBuilder {
    private button: IButton = {
      text: "",
      color: "",
      size: "medium",
      rounded: false,
    };
    setText(text: string): this {
      this.button.text = text;
      return this;
    }
    setColor(color: string): this {
      this.button.color = color;
      return this;
    }
    setSize(size: TSize): this {
      this.button.size = size;
      return this;
    }
    setRounded(value: boolean): this {
      this.button.rounded = value;
      return this;
    }
    build(): IButton {
      return this.button;
    }
  }
  const button_builder = new ButtonBuilder();
  const btn = button_builder
    .setText("Buy")
    .setColor("green")
    .setSize("medium")
    .setRounded(true)
    .build();
  console.log(btn);
}
