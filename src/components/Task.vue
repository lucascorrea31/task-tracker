<template>
  <BoxVue>
    <div class="columns">
      <div class="column is-">
        <p>{{ task.description || "Tarefa sem descrição" }}</p>
      </div>
      <div class="column">
        <Cronometer :time="task.time" />
      </div>
    </div>
  </BoxVue>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Cronometer from "@/components/Cronometer.vue";
import ITask from "@/interfaces/ITask";
import BoxVue from "./Box.vue";

export default defineComponent({
  name: "form-task",
  components: {
    Cronometer,
    BoxVue,
  },
  props: {
    task: {
      type: Object as PropType<ITask>,
      default: {} as ITask,
      require: true,
    },
  },
});
</script>

<style scoped></style>
