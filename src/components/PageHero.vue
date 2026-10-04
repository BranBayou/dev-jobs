<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <section class="flex h-[322px] items-end justify-center bg-black px-4 pb-16">
    <h1 class="text-4xl md:text-[60px] font-bold leading-none text-white text-center">{{ title }}</h1>
  </section>
</template>
