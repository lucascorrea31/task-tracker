import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TasksPage from "@/views/Tasks.vue";
import ProjectsPage from "@/views/Projects.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Tasks",
    component: TasksPage,
  },
  {
    path: "/projects",
    name: "Projects",
    component: ProjectsPage,
  },
];

const baseRouter = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default baseRouter;