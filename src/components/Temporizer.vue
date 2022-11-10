<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometer :time="time" />
    <button class="button" @click="handlePlay" :disabled="isRunning">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>Play</span>
    </button>
    <button class="button" @click="handleStop" :disabled="!isRunning">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>Stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometer from "@/components/Cronometer.vue";

export default defineComponent({
  name: "cron-temporizer",
  components: {
    Cronometer,
  },
  data() {
    return {
      time: 0,
      interval: 0,
      isRunning: false,
    };
  },
  methods: {
    handlePlay() {
      this.isRunning = true;
      this.interval = setInterval(() => {
        this.time++;
      }, 1000);
    },
    handleStop() {
      this.isRunning = false;
      clearInterval(this.interval);
    },
  },
});
</script>

<style scoped></style>
