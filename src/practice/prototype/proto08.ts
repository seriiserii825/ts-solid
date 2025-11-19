// ==========
// Задача 8
// ----------
// Создай класс FormFieldTemplate:
// label, type, required, attrs(object).
// clone().
// Создай textField → emailField (клон: type='email', attrs.placeholder='Email').

interface FormFieldClone {
  label: string;
  type: string;
  required: boolean;
  attrs: { [key: string]: string };
}

class FormFieldTemplate implements FormFieldClone {
  label: string;
  type: string;
  required: boolean;
  attrs: { [key: string]: string };

  constructor(label: string, type: string, required: boolean, attrs: { [key: string]: string }) {
    this.label = label;
    this.type = type;
    this.required = required;
    this.attrs = attrs;
  }

  clone(): FormFieldTemplate {
    return new FormFieldTemplate(this.label, this.type, this.required, { ...this.attrs });
  }
}

const textField = new FormFieldTemplate("Username", "text", true, {
  placeholder: "Enter your username",
});
const emailField = textField.clone();
emailField.type = "email";
emailField.attrs.placeholder = "Email";
