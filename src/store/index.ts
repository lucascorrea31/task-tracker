import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { NOTIFY } from "./mutations-type";
import { INotification } from "@/interfaces/INotification";
import { project, ProjectState } from "./modules/project";
import { task, TaskState } from "./modules/task";

export interface State {
  notifications: INotification[];
  project: ProjectState,
  task: TaskState,
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    notifications: [],
    project: {
      projects: [],
    },
    task: {
      tasks: [],
    }
  },
  mutations: {
    // NOTIFICATIONS
    [NOTIFY](state, notification: INotification) {
      notification.id = new Date().getTime();
      state.notifications.push(notification);

      setTimeout(() => {
        state.notifications = state.notifications.filter((n: INotification) => n.id !== notification.id);
      }, 3000);
    }
  },
  modules: {
    project,
    task
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}
