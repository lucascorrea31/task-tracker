import http from "@/http";
import IProject from "@/interfaces/IProject";
import { State } from "@/store";
import { GET_PROJECTS, POST_PROJECT, PUT_PROJECT, DEL_PROJECT } from "@/store/actions-type";
import { ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT, DEFINE_PROJECTS } from "@/store/mutations-type";
import { Module } from "vuex";

export interface ProjectState {
  projects: IProject[];
}

export const project: Module<ProjectState, State> = {
  mutations: {
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
  },
  actions: {
    [GET_PROJECTS]({ commit }) {
      http.get('/projects').then((response) => {
        commit(DEFINE_PROJECTS, response.data);
      });
    },
    [POST_PROJECT](context, projectName: string) {
      return http.post('/projects', { "name": projectName });
    },
    [PUT_PROJECT](context, project: IProject) {
      return http.put(`/projects/${project.id}`, project);
    },
    [DEL_PROJECT](context, id: string) {
      return http.delete(`/projects/${id}`);
    },
  }
}