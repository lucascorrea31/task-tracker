<template>
  <header>
    <h1>
      <img src="@/assets/logo.png" alt="Logo Task Tracker" />
    </h1>
    <button class="button" @click="handleClick">{{ btnLabel }}</button>
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
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}
@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
