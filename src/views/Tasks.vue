<template>
  <FormNewTask @on-end-task="addTask" />
  <div class="list">
    <!-- Empty message -->
    <BoxVue v-if="isTasksEmpty">
      Você não está muito produtivo hoje
      <span class="has-text-weigth-bold"> :( </span>
    </BoxVue>

    <!-- Filter  -->
    <div class="field" v-if="!isTasksEmpty">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Digite para filtrar"
          v-model="taskFilter"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>

    <!-- Tasks list  -->
    <Task
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      @on-clicked="showModal"
    />
  </div>

  <!-- Edit Modal -->
  <ModalActionVue :is-active="taskSelected != null" v-if="taskSelected">
    <template v-slot:header>
      <p class="modal-card-title">Editar tarefa</p>
      <button @click="closeModal" class="delete" aria-label="close"></button>
    </template>
    <template v-slot:body>
      <div class="field">
        <label for="task-description" class="label"></label>
        <input
          type="text"
          name="task-description"
          id="task-description"
          class="input"
          placeholder="Descrição da tarefa"
          v-model="taskSelected.description"
        />
      </div>
      <div class="field">
        <div class="select">
          <select name="project" id="project" v-model="projectIdSelected">
            <option value="" disabled>Selecione o projeto</option>
            <option
              v-for="project in projects"
              :key="project.id"
              :value="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <button @click="updateTask" class="button is-success">Salvar</button>
      <button @click="closeModal" class="button">Cancelar</button>
    </template>
  </ModalActionVue>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import FormNewTask from "@/components/FormNewTask.vue";
import Task from "@/components/Task.vue";
import ITask from "@/interfaces/ITask";
import BoxVue from "@/components/Box.vue";
import { useStore } from "@/store";
import { NotificationType } from "@/interfaces/INotification";
import { computed } from "@vue/reactivity";
import { GET_PROJECTS, GET_TASKS } from "@/store/actions-type";
import IProject from "@/interfaces/IProject";
import useNotifier from "@/hooks/notifier";
import ModalActionVue from "@/components/Modal.vue";

export default defineComponent({
  name: "tasks-page",
  components: {
    FormNewTask,
    Task,
    BoxVue,
    ModalActionVue,
  },
  setup() {
    const store = useStore();
    const { notify } = useNotifier();
    const taskFilter = ref("");

    // Props
    const tasks = computed(() => store.state.task.tasks);
    const projects = computed(() => store.state.project.projects);

    const taskSelected = ref<ITask | null>(null);
    const projectIdSelected = ref("");

    store.dispatch(GET_TASKS);
    store.dispatch(GET_PROJECTS);

    // Computed
    const isTasksEmpty = computed(
      () => tasks.value.length === 0 && !taskFilter.value
    );

    // Functions
    const addTask = (task: ITask): void => {
      task.id = new Date().toISOString();
      store.dispatch("POST_TASK", task).then(() => {
        notify("Tarefa adicionada com sucesso!", NotificationType.SUCCESS);
        store.dispatch(GET_TASKS);
      });
    };
    const showModal = (task: ITask): void => {
      taskSelected.value = task;
    };
    const closeModal = (): void => {
      taskSelected.value = null;
    };
    const updateTask = (): void => {
      if (taskSelected.value) {
        taskSelected.value.project = projects.value.find(
          (p) => p.id == projectIdSelected.value
        ) as IProject;
      }
      store.dispatch("PUT_TASK", taskSelected.value).then(() => {
        notify("Tarefa atualizada com sucesso!", NotificationType.SUCCESS);
        store.dispatch(GET_TASKS);
      });
      closeModal();
    };

    watchEffect(() => {
      store.dispatch(GET_TASKS, taskFilter.value);
    });

    return {
      taskSelected,
      projectIdSelected,
      taskFilter,
      tasks,
      projects,
      isTasksEmpty,
      addTask,
      updateTask,
      showModal,
      closeModal,
    };
  },
});
</script>
