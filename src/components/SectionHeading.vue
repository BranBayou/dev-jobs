<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  center: { type: Boolean, default: false },
});
</script>

<template>
  <div :class="['flex flex-col gap-6', center ? 'items-center text-center' : 'items-start']">
    <h2 class="text-3xl md:text-[50px] font-bold leading-tight">{{ title }}</h2>
    <p v-if="subtitle" class="max-w-2xl text-base">{{ subtitle }}</p>
  </div>
</template>
