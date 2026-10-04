<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
  value: { type: Number, required: true },
  duration: { type: Number, default: 2000 },
});

const current = ref(0);
const formatted = computed(() => Math.round(current.value).toLocaleString('en-US'));

let frame = null;

// Fast start, gentle finish.
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

onMounted(() => {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    current.value = props.value;
    return;
  }
  // Start the clock on the first painted frame, not at mount: frames are paused in background tabs,
  // so a page opened in the background still animates from 0 when the visitor switches to it.
  let start = null;
  const tick = (now) => {
    start ??= now;
    const progress = Math.min((now - start) / props.duration, 1);
    current.value = props.value * easeOutCubic(progress);
    if (progress < 1) frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
});

onBeforeUnmount(() => cancelAnimationFrame(frame));
</script>

<template>
  <!-- Screen readers get the final number right away instead of every intermediate value. -->
  <span :aria-label="value.toLocaleString('en-US')" class="tabular-nums">{{ formatted }}</span>
</template>
