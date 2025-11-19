// ==========
// Задача 10
// ----------
// Создай класс FilePreset:
// filename, content, meta(object).
// clone().
// Создай preset phpFile с basic шаблоном PHP.
// Создай phpFileContact.php клон, внутри content замени "ClassName" → "ContactPage".
// ==========================

interface FilePresetClone {
  filename: string;
  content: string;
  meta: { [key: string]: any };
  clone(): FilePreset;
}

class FilePreset implements FilePresetClone {
  filename: string;
  content: string;
  meta: { [key: string]: any };

  constructor(filename: string, content: string, meta: { [key: string]: any } = {}) {
    this.filename = filename;
    this.content = content;
    this.meta = meta;
  }

  clone(): FilePreset {
    const clonedMeta = { ...this.meta };
    return new FilePreset(this.filename, this.content, clonedMeta);
  }
}
