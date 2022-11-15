<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'dark-mode': isDarkMode }"
  >
    <div class="column is-one-quarter">
      <SideBar @clicked="changeTheme" />
    </div>
    <div class="column is-three-quarter content">
      <NotificationsVue />
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "@/components/SideBar.vue";
import NotificationsVue from "@/components/Notifications.vue";

export default defineComponent({
  name: "App",
  components: {
    SideBar,
    NotificationsVue,
  },
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    changeTheme(darkMode: boolean): void {
      this.isDarkMode = darkMode;
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

.clickable {
  cursor: pointer;
}
</style>
