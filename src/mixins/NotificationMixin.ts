import { NotificationType } from "@/interfaces/INotification";
import { store } from "@/store";
import { NOTIFY } from "@/store/mutations-type";

export const notificationMixin = {
  methods: {
    notify(message: string, type: NotificationType, title?: string) : void {
      store.commit(NOTIFY, { message, type, title });
    }
  }
}