<template>
  <FormNewTask @on-end-task="addTask" />
  <div class="list">
    <Task v-for="(task, index) in tasks" :key="index" :task="task" />
    <BoxVue v-if="isTasksEmpty"> Você não está muito produtivo hoje :( </BoxVue>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormNewTask from "@/components/FormNewTask.vue";
import Task from "@/components/Task.vue";
import ITask from "@/interfaces/ITask";
import BoxVue from "@/components/Box.vue";

export default defineComponent({
  name: "tasks-page",
  components: {
    FormNewTask,
    Task,
    BoxVue,
  },
  data() {
    return {
      tasks: [] as ITask[],
    };
  },
  computed: {
    isTasksEmpty(): boolean {
      return this.tasks.length === 0;
    },
  },
  methods: {
    addTask(task: ITask): void {
      this.tasks.push(task);
    },
  },
});
</script>
