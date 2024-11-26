<script setup>
import { defineProps } from 'vue';

// defineProps({
//   title: {
//     type: String,
//     default: 'Become a Vue Dev',
//   },
//   subtitle: {
//     type: String,
//     default: 'Find the Vue job that fits your skills and needs',
//   }
// })
import { ref } from 'vue';

const slides = ref([
  'First',
  'Second',
  'Third',
  'Fourth',
  'Fifth',
]);
</script>

<template>
    <v-carousel height="400" progress="primary" show-arrows="hover" cycle hide-delimiter-background>
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet height="100%">
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">
            {{ slide }} Slide
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<style scoped>

</style>