<template>
  <section class="projects">
    <h1 class="title">Projetos</h1>

    <form action="" @submit.prevent="saveProject">
      <div class="field">
        <label for="project-name" class="label"></label>
        <input
          type="text"
          name="project-name"
          id="project-name"
          class="input"
          placeholder="Nome do projeto"
          v-model="projectName"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "projects-page",
  data() {
    return {
      projectName: "",
    };
  },
  methods: {
    saveProject(): void {
      this.store.commit("ADD_PROJECT", this.projectName);
      this.projectName = "";
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
      projects: computed(() => store.state.projects),
    };
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
