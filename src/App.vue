<template>
  <main class="columns is-gapless is-multiline dark-mode">
    <div class="column is-one-quarter">
      <SideBar />
    </div>
    <div class="column is-three-quarter content">
      <FormNewTask @on-end-task="addTask" />
      <div class="list">
        <Task v-for="(task, index) in tasks" :key="index" :task="task" />
        <BoxVue v-if="isTasksEmpty">
          Você não está muito produtivo hoje :(
        </BoxVue>
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
import BoxVue from "@/components/Box.vue";

export default defineComponent({
  name: "App",
  components: {
    SideBar,
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

<style>
.list {
  padding: 1.25rem;
}

main {
  --bg-primary: #fff;
  --textcolor-primary: #000;
}
main.dark-mode {
  --bg-primary: #2b2d42;
  --textcolor-primary: #ddd;
}
.content {
  background-color: var(--bg-primary);
  color: var(--textcolor-primary);
}
</style>
