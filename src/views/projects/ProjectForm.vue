<template>
  <section>
    <form action="" @submit.prevent="saveProject">
      <div class="field">
        <label for="project-name" class="label"></label>
        <input
          type="text"
          name="project-name"
          id="project-name"
          class="input"
          placeholder="Nome do projeto"
          v-model="projectName"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { POST_PROJECT, PUT_PROJECT } from "@/store/actions-type";
import { NotificationType } from "@/interfaces/INotification";
import useNotifier from "@/hooks/notifier";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "projects-form-page",
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const { notify } = useNotifier();
    const store = useStore();
    const router = useRouter();
    const projectName = ref("");

    if (props.id) {
      const project = store.state.project.projects.find(
        (proj) => proj.id == props.id
      );
      projectName.value = project?.name || "";
    }

    const saveProject = () => {
      if (props.id) {
        store
          .dispatch(PUT_PROJECT, {
            id: props.id,
            name: projectName.value,
          })
          .then(() => reset());
      } else {
        store.dispatch(POST_PROJECT, projectName.value).then(() => reset());
      }
    };

    const reset = () => {
      projectName.value = "";
      notify("Projeto salvo com sucesso!", NotificationType.SUCCESS);
      router.push("/projects");
    };

    return {
      projectName,
      saveProject,
    };
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
