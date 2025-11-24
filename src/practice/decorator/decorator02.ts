// 2) Есть класс MessageService.send(text).
//    Создай декоратор EmojiDecorator → добавляет 🙂 в конец сообщения.
interface IMessageService {
    send(text: string): void;
}

class MessageService {
    send(text: string): void {
        console.log(text);
    }
}

class EmojiDecorator implements IMessageService {
    private wrapped: IMessageService;

    constructor(wrapped: IMessageService) {
        this.wrapped = wrapped;
    }

    send(text: string): void {
        this.wrapped.send(text + " 🙂");
    }
}
const service = new MessageService();
const decoratedService = new EmojiDecorator(service);
service.send("Hello"); // Output: Hello
decoratedService.send("Hello"); // Output: Hello 🙂
