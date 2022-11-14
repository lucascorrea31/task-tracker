import IProject from "@/interfaces/IProject";
import ITask from "@/interfaces/ITask";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT, ADD_TASK, DELETE_TASK, EDIT_TASK, NOTIFY, DEFINE_PROJECTS, DEFINE_TASKS } from "./mutations-type";
import { INotification } from "@/interfaces/INotification";
import { DEL_PROJECT, DEL_TASK, GET_PROJECTS, GET_TASKS, POST_PROJECT, POST_TASK, PUT_PROJECT, PUT_TASK } from "./actions-type";
import http from "@/http";

interface State {
  projects: IProject[];
  tasks: ITask[];
  notifications: INotification[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projects: [],
    tasks: [],
    notifications: [],
  },
  mutations: {
    // PROJECTS
    [ADD_PROJECT](state, projectName: string) {
      const project: IProject = {
        id: new Date().toISOString(),
        name: projectName
      };
      state.projects.push(project);
    },
    [EDIT_PROJECT](state, project: IProject) {
      const index = state.projects.findIndex((p: IProject) => p.id === project.id);
      state.projects[index] = project;
    },
    [DELETE_PROJECT](state, id: string) {
      state.projects = state.projects.filter((p: IProject) => p.id !== id);
    },
    [DEFINE_PROJECTS](state, projects: IProject[]) {
      state.projects = projects;
    },

    // TASKS
    [ADD_TASK](state, task: ITask) {
      task.id = new Date().toISOString();
      state.tasks.push(task);
    },
    [EDIT_TASK](state, task: ITask) {
      const index = state.tasks.findIndex((t: ITask) => t.id === task.id);
      state.tasks[index] = task;
    },
    [DELETE_TASK](state, id: string) {
      state.tasks = state.tasks.filter((t: ITask) => t.id !== id);
    },
    [DEFINE_TASKS](state, tasks: ITask[]) {
      state.tasks = tasks;
    },

    // NOTIFICATIONS
    [NOTIFY](state, notification: INotification) {
      notification.id = new Date().getTime();
      state.notifications.push(notification);

      setTimeout(() => {
        state.notifications = state.notifications.filter((n: INotification) => n.id !== notification.id);
      }, 3000);
    }
  },
  actions: {
    // PROJECTS
    [GET_PROJECTS]({ commit }) {
      http.get('/projects').then((response) => {
        commit(DEFINE_PROJECTS, response.data);
      });
    },
    [POST_PROJECT](context, projectName: string) {
      return http.post('/projects', { "name": projectName});
    },
    [PUT_PROJECT](context, project: IProject) {
      return http.put(`/projects/${project.id}`, project);
    },
    [DEL_PROJECT](context, id: string) {
      return http.delete(`/projects/${id}`);
    },

    // TASKS
    [GET_TASKS]({ commit }) {
      http.get('/tasks').then((response) => {
        commit(DEFINE_TASKS, response.data);
      });
    },
    [POST_TASK](context, task: ITask) {
      return http.post('/tasks', task);
    },
    [PUT_TASK](context, task: ITask) {
      return http.put(`/tasks/${task.id}`, task);
    },
    [DEL_TASK](context, id: string) {
      return http.delete(`/tasks/${id}`);
    },
  }
});

export function useStore() : Store<State> {
  return vuexUseStore(key);
}
