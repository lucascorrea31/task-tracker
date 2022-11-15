<template>
  <BoxVue>
    <div class="columns clickable" @click="onClick">
      <div class="column is-4">
        <p>{{ task.description || "Tarefa sem descrição" }}</p>
      </div>
      <div class="column is-3">
        {{ task.project?.name || "Projeto não definido" }}
      </div>
      <div class="column">
        <Cronometer :time="task.time" />
      </div>
    </div>
  </BoxVue>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import Cronometer from "@/components/Cronometer.vue";
import ITask from "@/interfaces/ITask";
import BoxVue from "./Box.vue";

export default defineComponent({
  name: "form-task",
  emits: ["onClicked"],
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
  setup(props, { emit }) {
    const onClick = (): void => {
      emit("onClicked", props.task);
    };

    return {
      onClick,
    };
  },
});
</script>

<style scoped></style>
