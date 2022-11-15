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
          v-model="description"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select name="project" id="project" v-model="projectId">
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
      <div class="column">
        <Temporizer @onStop="endTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Temporizer from "@/components/Temporizer.vue";
import { useStore } from "@/store";
import { computed } from "@vue/reactivity";
import useNotifier from "@/hooks/notifier";
import { NotificationType } from "@/interfaces/INotification";
import { GET_PROJECTS } from "@/store/actions-type";

export default defineComponent({
  name: "form-new-task",
  emits: ["onEndTask"],
  components: {
    Temporizer,
  },
  setup(props, { emit }) {
    const store = useStore();
    const { notify } = useNotifier();
    const description = ref("");
    const projectId = ref("");
    const projects = computed(() => store.state.project.projects);

    store.dispatch(GET_PROJECTS);

    const endTask = (time: number): void => {
      if (
        !description.value ||
        !projects.value.find((p) => p.id == projectId.value)
      ) {
        notify(
          "Você precisa preencher todos os campos",
          NotificationType.ERROR
        );
        return;
      }
      emit("onEndTask", {
        description: description.value,
        time: time,
        project: projects.value.find((proj) => proj.id == projectId.value),
      });
      description.value = "";
      projectId.value = "";
    };

    return {
      description,
      projectId,
      projects,
      endTask,
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
