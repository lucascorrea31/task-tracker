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
import { useStore } from "@/store";
import { notificationMixin } from "@/mixins/NotificationMixin";
import { NotificationType } from "@/interfaces/INotification";

export default defineComponent({
  name: "tasks-page",
  components: {
    FormNewTask,
    Task,
    BoxVue,
  },
  mixins: [notificationMixin],
  computed: {
    isTasksEmpty(): boolean {
      return this.tasks.length === 0;
    },
  },
  methods: {
    addTask(task: ITask): void {
      this.store.commit("ADD_TASK", task);
      this.notify("Tarefa adicionada com sucesso!", NotificationType.SUCCESS);
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
      tasks: store.state.tasks,
    };
  },
});
</script>
