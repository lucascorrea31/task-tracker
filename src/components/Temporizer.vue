<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <section
      class="is-flex is-align-items-center is-justify-content-space-between"
    >
      <Cronometer :time="time" />
      <EventButton
        :label="btnPlayLabel"
        :icon="btnPlayIcon"
        :disabled="isRunning"
        @clicked="handlePlay"
      />
      <EventButton
        :label="btnStopLabel"
        :icon="btnStopIcon"
        :disabled="!isRunning"
        @clicked="handleStop"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometer from "@/components/Cronometer.vue";
import EventButton from "./EventButton.vue";

export default defineComponent({
  name: "cron-temporizer",
  emits: ["onStop"],
  components: {
    Cronometer,
    EventButton,
  },
  data() {
    return {
      time: 0,
      interval: 0,
      isRunning: false,
      btnPlayLabel: "Play",
      btnPlayIcon: "fas fa-play",
      btnStopLabel: "Stop",
      btnStopIcon: "fas fa-stop",
    };
  },
  methods: {
    handlePlay(): void {
      this.isRunning = true;
      this.interval = setInterval(() => {
        this.time++;
      }, 1000);
    },
    handleStop(): void {
      this.isRunning = false;
      clearInterval(this.interval);
      this.$emit("onStop", this.time);
      this.time = 0;
    },
  },
});
</script>

<style scoped></style>
