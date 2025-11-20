export default function notificationBuilder() {
  type TNotificationType = "success" | "error" | "warning" | "info";
  type TNotificationPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";
  interface TNotificationAction {
    label: string;
    callbackName: string;
  }
  interface TNotification {
    message: string;
    type: TNotificationType;
    duration: number;
    closable: boolean;
    position: TNotificationPosition;
    actions: TNotificationAction[];
  }

  interface INotificationBuilder {
    setMessage(text: string): this;
    setType(type: TNotificationType): this;
    setDuration(ms: number): this;
    setClosable(value: boolean): this;
    setPosition(pos: TNotificationPosition): this;
    addAction(label: string, callbackName: string): this;
    build(): TNotification;
  }

  class NotificationBuilder implements INotificationBuilder {
    private notification: TNotification;

    constructor() {
      this.notification = {
        message: "",
        type: "info",
        duration: 0,
        closable: false,
        position: "top-right",
        actions: [],
      };
    }
    setMessage(text: string): this {
      this.notification.message = text;
      return this;
    }
    setType(type: TNotificationType): this {
      this.notification.type = type;
      return this;
    }
    setDuration(ms: number): this {
      this.notification.duration = ms;
      return this;
    }
    setClosable(value: boolean): this {
      this.notification.closable = value;
      return this;
    }
    setPosition(pos: TNotificationPosition): this {
      this.notification.position = pos;
      return this;
    }
    addAction(label: string, callbackName: string): this {
      this.notification.actions.push({ label, callbackName });
      return this;
    }
    build(): TNotification {
      return this.notification;
    }
  }

  const notification_builder = new NotificationBuilder();
  const notification = notification_builder
    .setMessage("Saved successfully")
    .setType("success")
    .setDuration(3000)
    .setPosition("top-right")
    .setClosable(true)
    .addAction("Undo", "onUndo")
    .build();
  console.log(notification);
}
