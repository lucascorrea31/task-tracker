<template>
  <div class="box formNewTask">
    <div class="columns">
      <div
        class="column is-8"
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
      <div class="column">
        <Temporizer @onStop="endTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Temporizer from "@/components/Temporizer.vue";

export default defineComponent({
  name: "form-new-task",
  emits: ["onEndTask"],
  components: {
    Temporizer,
  },
  data() {
    return {
      task: "",
    };
  },
  methods: {
    endTask(time: number): void {
      this.$emit("onEndTask", {
        description: this.task,
        time: time,
      });
      this.task = "";
    },
  },
});
</script>

<style>
.formNewTask {
  background-color: var(--bg-primary);
  color: var(--textcolor-primary);
}
</style>
