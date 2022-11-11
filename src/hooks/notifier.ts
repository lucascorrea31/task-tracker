import { NotificationType } from "@/interfaces/INotification";
import { store } from "@/store";
import { NOTIFY } from "@/store/mutations-type";

type Notifier = {
  notify: (message: string, type: NotificationType, title?: string) => void;
}

export default() : Notifier => {
  const notify = (message: string, type: NotificationType, title?: string) : void => {
    store.commit(NOTIFY, { message, type, title });
  }

  return {
    notify
  };
};