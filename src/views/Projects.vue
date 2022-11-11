<template>
  <section class="projects">
    <h1 class="title">Projetos</h1>
    <router-view />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "projects-page",
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
