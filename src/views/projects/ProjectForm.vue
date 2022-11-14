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
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { POST_PROJECT, PUT_PROJECT } from "@/store/actions-type";
import { NotificationType } from "@/interfaces/INotification";
import useNotifier from "@/hooks/notifier";

export default defineComponent({
  name: "projects-form-page",
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find(
        (proj) => proj.id == this.id
      );
      this.projectName = project?.name || "";
    }
  },
  data() {
    return {
      projectName: "",
    };
  },
  methods: {
    saveProject(): void {
      if (this.id) {
        this.store
          .dispatch(PUT_PROJECT, {
            id: this.id,
            name: this.projectName,
          })
          .then(() => this.reset());
      } else {
        this.store
          .dispatch(POST_PROJECT, this.projectName)
          .then(() => this.reset());
      }
    },
    reset(): void {
      this.projectName = "";
      this.notify("Projeto salvo com sucesso!", NotificationType.SUCCESS);
      this.$router.push("/projects");
    },
  },
  setup() {
    const store = useStore();
    const { notify } = useNotifier();
    return {
      store,
      notify,
    };
  },
});
</script>

<style scoped>
.projects {
  padding: 1.25rem;
}
</style>
