<template>
  <header>
    <h1>
      <img src="@/assets/logo.png" alt="Logo Task Tracker" />
    </h1>
    <div class="has-text-centered">
      <button class="button" @click="handleClick">{{ btnLabel }}</button>
    </div>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link to="/" class="link">
            <i class="fas fa-tasks"></i>
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link to="/projects" class="link">
            <i class="fas fa-project-diagram"></i>
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideBar",
  emits: ["clicked"],
  data() {
    return {
      isDarkMode: false,
    };
  },
  computed: {
    btnLabel(): string {
      return this.isDarkMode ? "Desativar modo escuro" : "Ativar modo escuro";
    },
  },
  methods: {
    handleClick(): void {
      this.isDarkMode = !this.isDarkMode;
      this.$emit("clicked", this.isDarkMode);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: center;
}
strong {
  color: #f95738;
}
header {
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  padding: 2rem;
}
@media only screen and (max-width: 768px) {
  header {
    height: auto;
  }
}

.panel li {
  margin: 8px 0;
}
.link {
  color: #fff;
}
.link:hover {
  color: #faf0ca;
}
.link.router-link-active {
  color: #faf0ca;
}
</style>
