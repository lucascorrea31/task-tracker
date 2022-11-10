<template>
  <section>
    <strong>{{ timeFormatted }}</strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "cron-timer",
  props: {
    time: {
      type: Number,
      default: 0,
      require: true,
    },
  },
  computed: {
    timeFormatted(): string {
      return new Date(this.time * 1000).toISOString().substring(11, 19);
    },
  },
});
</script>

<style scoped></style>
