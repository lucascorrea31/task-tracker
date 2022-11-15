import http from "@/http";
import ITask from "@/interfaces/ITask";
import { State } from "@/store";
import { GET_TASKS, POST_TASK, PUT_TASK, DEL_TASK } from "@/store/actions-type";
import { ADD_TASK, EDIT_TASK, DELETE_TASK, DEFINE_TASKS } from "@/store/mutations-type";
import { Module } from "vuex";

export interface TaskState {
  tasks: ITask[];
}

export const task: Module<TaskState, State> = {
  mutations: {
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
  },
  actions: {
    [GET_TASKS]({ commit }, keyword: string) {
      let url = '/tasks';
      if (keyword) {
        url += `?description=${keyword}`;
      }
      http.get(url).then((response) => {
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
}