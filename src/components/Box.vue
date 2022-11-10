<template>
  <div class="box has-text-weight-bold">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "main-box",
});
</script>

<style scoped>
.box {
  background-color: #faf0ca;
}
</style>
