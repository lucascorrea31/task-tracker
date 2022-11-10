<template>
  <div class="box formNewTask">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="task"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select name="project" id="project" v-model="projectId">
            <option value="" disabled>Selecione o projeto</option>
            <option
              v-for="project in projects"
              :key="project.id"
              value="{{ project.id }}"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizer @onStop="endTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Temporizer from "@/components/Temporizer.vue";
import { useStore } from "@/store";
import { computed } from "@vue/reactivity";

export default defineComponent({
  name: "form-new-task",
  emits: ["onEndTask"],
  components: {
    Temporizer,
  },
  data() {
    return {
      task: "",
      projectId: "",
    };
  },
  methods: {
    endTask(time: number): void {
      this.$emit("onEndTask", {
        description: this.task,
        time: time,
        project: this.projects.find((proj) => proj.id == this.projectId),
      });
      this.task = "";
      this.projectId = "";
    },
  },
  setup() {
    const store = useStore();
    return {
      projects: computed(() => store.state.projects),
    };
  },
});
</script>

<style>
.formNewTask {
  background-color: var(--bg-primary);
  color: var(--textcolor-primary);
}
</style>
