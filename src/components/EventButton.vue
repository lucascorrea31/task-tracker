<template>
  <button class="button" @click="handleClick" :disabled="disabled">
    <span class="icon">
      <i :class="icon"></i>
    </span>
    <span>{{ label }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "event-button",
  emits: ["clicked"],
  props: {
    label: {
      type: String,
      default: "",
      require: true,
    },
    icon: {
      type: String,
      default: "",
      require: true,
    },
    disabled: {
      type: Boolean,
      default: false,
      require: true,
    },
  },
  methods: {
    handleClick(): void {
      this.$emit("clicked");
    },
  },
});
</script>

<style scoped></style>
