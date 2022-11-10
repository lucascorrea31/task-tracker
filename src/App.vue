<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <SideBar />
    </div>
    <div class="column is-three-quarter">
      <FormNewTask @on-end-task="addTask" />
      <div class="list">
        <Task v-for="(task, index) in tasks" :key="index" :task="task" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "@/components/SideBar.vue";
import FormNewTask from "@/components/FormNewTask.vue";
import Task from "@/components/Task.vue";
import ITask from "@/interfaces/ITask";

export default defineComponent({
  name: "App",
  components: {
    SideBar,
    FormNewTask,
    Task,
  },
  data() {
    return {
      tasks: [] as ITask[],
    };
  },
  methods: {
    addTask(task: ITask): void {
      this.tasks.push(task);
    },
  },
});
</script>

<style>
.list {
  padding: 1.25rem;
}
</style>
