<template>
  <div class="notification">
    <article
      class="message"
      :class="notificationClass[notification.type]"
      v-for="notification in notifications"
      :key="notification.id"
    >
      <div class="message-header">
        {{ notification.title || titleDefault[notification.type] }}
      </div>
      <div class="message-body">{{ notification.message }}</div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import { computed } from "@vue/reactivity";
import { NotificationType } from "@/interfaces/INotification";

export default defineComponent({
  name: "notification-widget",
  data() {
    return {
      notificationClass: {
        [NotificationType.SUCCESS]: "is-success",
        [NotificationType.ERROR]: "is-danger",
        [NotificationType.WARNING]: "is-warning",
      },
      titleDefault: {
        [NotificationType.SUCCESS]: "Sucesso",
        [NotificationType.ERROR]: "Erro",
        [NotificationType.WARNING]: "Atenção",
      },
    };
  },
  setup() {
    const store = useStore();
    return {
      notifications: computed(() => store.state.notifications),
    };
  },
});
</script>

<style scoped>
.notification {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9999;
  width: 300px;
  padding: 8px;
  background-color: transparent;
}
</style>
