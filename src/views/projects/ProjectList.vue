<template>
  <section>
    <router-link to="/projects/new" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span> Novo Projeto </span>
    </router-link>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td>
            <router-link :to="`/projects/${project.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button
              class="button ml-2 is-danger"
              @click="deleteProject(project.id)"
            >
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { DEL_PROJECT, GET_PROJECTS } from "@/store/actions-type";

export default defineComponent({
  name: "projects-list-page",
  methods: {
    deleteProject(id: string): void {
      this.store.dispatch(DEL_PROJECT, id).then(() => this.getProjects());
    },
    getProjects(): void {
      this.store.dispatch(GET_PROJECTS);
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(GET_PROJECTS);
    return {
      store,
      projects: computed(() => store.state.projects),
    };
  },
});
</script>

<style scoped></style>
