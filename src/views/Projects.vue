<template>
  <section class="projects">
    <h1 class="title">Projetos</h1>

    <form action="" @submit.prevent="saveProject">
      <label for="project-name" class="label"></label>
      <input
        type="text"
        name="project-name"
        id="project-name"
        class="input"
        placeholder="Nome do projeto"
        v-model="projectName"
      />
      <div class="field">
        <button class="button" type="submit">Save</button>
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
import { defineComponent } from "vue";
import IProject from "@/interfaces/IProject";

export default defineComponent({
  name: "projects-page",
  data() {
    return {
      projectName: "",
      projects: [] as IProject[],
    };
  },
  methods: {
    saveProject(): void {
      console.log(this.projectName);
      const project: IProject = {
        id: new Date().toISOString(),
        name: this.projectName,
      };
      this.projects.push(project);
      this.projectName = "";
    },
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
