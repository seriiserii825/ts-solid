export default function formBuilderPractice() {
  // 👉 Представь, что ты на фронте собираешь конфиг формы, например
  // для React, Vue или просто для рендера через JS.

  type FieldType = "text" | "email" | "password" | "checkbox";

  type FormFieldConfig = {
    name: string;
    label: string;
    type: FieldType;
    required: boolean;
    placeholder?: string;
    defaultValue?: string | boolean;
  };

  type FormConfig = {
    formName: string;
    fields: FormFieldConfig[];
  };

  // ============================================
  // 🔧 ЗАДАЧА: Сделать FormBuilder с fluent-методами
  // ============================================

  interface IFormBuilder {
    setFormName(name: string): this;

    addField(
      name: string,
      label: string,
      type: FieldType
    ): this;

    // Сделать поле обязательным
    makeRequired(name: string): this;

    // Задать placeholder
    setPlaceholder(name: string, placeholder: string): this;

    // Задать defaultValue
    setDefaultValue(name: string, value: string | boolean): this;

    // Собрать финальный конфиг
    build(): FormConfig;
  }

  class FormBuilder implements IFormBuilder {
    private formName: string = "unnamed-form";
    private fields: FormFieldConfig[] = [];

    setFormName(name: string): this {
      this.formName = name;
      return this;
    }

    addField(
      name: string,
      label: string,
      type: FieldType
    ): this {
      const field = {
        name,
        label,
        type,
        required: false,
      }
      this.fields.push(field);
      return this;
    }

    private findField(name: string): FormFieldConfig | undefined {
      // Вспомогательный метод — найти поле по name
      return this.fields.find((f) => f.name === name);
    }

    makeRequired(name: string): this {
      // Найти поле по name и поставить required = true
      const field = this.findField(name);
      if (field) {
        field.required = true;
      }
      return this;
    }

    setPlaceholder(name: string, placeholder: string): this {
      const field = this.findField(name);
      if (field) {
        field.placeholder = placeholder;
      }
      return this;
    }

    setDefaultValue(name: string, value: string | boolean): this {
      // Найти поле и задать поле defaultValue
      const field = this.findField(name);
      if (field) {
        field.defaultValue = value;
      }
      return this;
    }

    build(): FormConfig {
      // Вернуть объект:
      // {
      //   formName: this.formName,
      //   fields: this.fields
      // }
      //
      // Можно сделать shallow-копию массива fields, чтобы снаружи его не мутировали.
      return {
        formName: this.formName,
        fields: this.fields,
      };
    }
  }

  // ============================================
  // ✅ Пример использования, который ДОЛЖЕН работать
  // (ориентир для тебя)
  // ============================================

  const form = new FormBuilder()
    .setFormName("login-form")
    .addField("email", "Email", "email")
    .addField("phone", "Telefon", "text")
    .addField("password", "Password", "password")
    .makeRequired("email")
    .makeRequired("password")
    .makeRequired("phone")
    .setPlaceholder("email", "you@example.com")
    .build();

  console.log("FORM CONFIG:", form);

  // Ожидаемо примерно так:
  // {
  //   formName: "login-form",
  //   fields: [
  //     {
  //       name: "email",
  //       label: "Email",
  //       type: "email",
  //       required: true,
  //       placeholder: "you@example.com"
  //     },
  //     {
  //       name: "password",
  //       label: "Password",
  //       type: "password",
  //       required: true
  //     }
  //   ]
  // }
}
