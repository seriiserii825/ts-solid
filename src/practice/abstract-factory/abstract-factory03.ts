// Задача: Abstract Factory — ACF Blocks для WordPress

interface TitleBlock {
  render(): void;
}

interface ImageBlock {
  render(): void;
}

interface ContentBlock {
  render(): void;
}

interface BlocksFactory {
  createTitle(): TitleBlock;
  createImage(): ImageBlock;
  createContent(): ContentBlock;
}

class LandingTitleBlock implements TitleBlock {
  render() {
    console.log("Rendering Landing Page Title Block");
  }
}
class LandingImageBlock implements ImageBlock {
  render() {
    console.log("Rendering Landing Page Image Block");
  }
}
class LandingContentBlock implements ContentBlock {
  render() {
    console.log("Rendering Landing Page Content Block");
  }
}

class BlogTitleBlock implements TitleBlock {
  render() {
    console.log("Rendering Blog Title Block");
  }
}
class BlogImageBlock implements ImageBlock {
  render() {
    console.log("Rendering Blog Image Block");
  }
}
class BlogContentBlock implements ContentBlock {
  render() {
    console.log("Rendering Blog Content Block");
  }
}

class LandingBlocksFactory implements BlocksFactory {
  createTitle(): TitleBlock {
    return new LandingTitleBlock();
  }
  createImage(): ImageBlock {
    return new LandingImageBlock();
  }
  createContent(): ContentBlock {
    return new LandingContentBlock();
  }
}

class BlogBlocksFactory implements BlocksFactory {
  createTitle(): TitleBlock {
    return new BlogTitleBlock();
  }
  createImage(): ImageBlock {
    return new BlogImageBlock();
  }
  createContent(): ContentBlock {
    return new BlogContentBlock()
  }
}

function buildPage(factory: BlocksFactory) {
  const title = factory.createTitle()
  const image = factory.createImage()
  const content = factory.createContent()

  title.render()
  image.render()
  content.render()
}


buildPage(new LandingBlocksFactory())
buildPage(new BlogBlocksFactory())
