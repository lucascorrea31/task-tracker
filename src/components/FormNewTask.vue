<template>
  <div class="box">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?">
      </div>
      <div class="column">
        <div class="is-flex is-align-items-center is-justify-content-space-between">
          <section>
            <strong>{{ timeFormatted }}</strong>
          </section>
          <button class="button" @click="handlePlay">
            <span class="icon">
              <i class="fas fa-play"></i>
            </span>
            <span>Play</span>
          </button>
          <button class="button" @click="handleStop">
            <span class="icon">
              <i class="fas fa-stop"></i>
            </span>
            <span>Stop</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'form-new-task',
  data() {
    return {
      time: 0,
      interval: 0
    }
  },
  computed: {
    timeFormatted() : string {
      return new Date(this.time * 1000).toISOString().substring(11, 19);
    }
  },
  methods: {
    handlePlay() {
      this.interval = setInterval(() => {
        this.time++;
      }, 1000);
    },
    handleStop() {
      clearInterval(this.interval);
    }
  }
})

</script>

<style scoped></style>