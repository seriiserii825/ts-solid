// ===============================
// 5) Контент-рендеринг
// -------------------------------
// Абстракция: Article (show())
// Реализация: HtmlRenderer, PdfRenderer, MarkdownRenderer
// ЗАДАЧА: Одна и та же статья должна рендериться в разные форматы.

interface Renderer {
  render(title: string, content: string): void;
}

class HtmlRenderer implements Renderer {
  render(title: string, content: string) {
    console.log("<html>");
    console.log("<head><title>" + title + "</title></head>");
    console.log("<body>" + content + "</body>");
    console.log("</html>");
  }
}
class PdfRenderer implements Renderer {
  render(title: string, content: string) {
    console.log("PDF Document");
    console.log("Title: " + title);
    console.log("Content: " + content);
  }
}
class MarkdownRenderer implements Renderer {
  render(title: string, content: string) {
    console.log("# " + title);
    console.log(content);
  }
}

abstract class Article {
  constructor(protected renderer: Renderer, protected title: string, protected content: string) {}
  abstract show(): void;
}

class NewsArticle extends Article {
  show() {
    this.renderer.render(this.title, this.content);
  }
}
class BlogPost extends Article {
  show() {
    this.renderer.render(this.title, this.content);
  }
}

const htmlRenderer = new HtmlRenderer();
const pdfRenderer = new PdfRenderer();
const markdownRenderer = new MarkdownRenderer();
new NewsArticle(htmlRenderer, "Breaking News", "Some important content").show();
new BlogPost(pdfRenderer, "My Blog Post", "Blog content here").show();
new NewsArticle(markdownRenderer, "Markdown News", "Content in markdown").show();

