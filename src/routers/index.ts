import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TasksPage from "@/views/Tasks.vue";
import ProjectsPage from "@/views/Projects.vue";
import ProjectFormPage from "@/views/projects/ProjectForm.vue";
import ProjectListPage from "@/views/projects/ProjectList.vue";

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
    children: [
      {
        path: "",
        name: "Project List",
        component: ProjectListPage,
      },
      {
        path: "new",
        name: "New Project",
        component: ProjectFormPage,
      },
      {
        path: ":id",
        name: "Edit Project",
        component: ProjectFormPage,
        props: true,
      },
    ]
  }
];

const baseRouter = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default baseRouter;