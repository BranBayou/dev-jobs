<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { timeAgo } from '@/data/jobs';
import briefcaseIcon from '@/assets/img/figma/briefcase.svg';
import clockIcon from '@/assets/img/figma/clock.svg';
import mapPinIcon from '@/assets/img/figma/map-pin.svg';

defineProps({
  job: {
    type: Object,
    required: true,
  },
});

const saved = ref(false);
</script>

<template>
  <article class="flex flex-col gap-7 rounded-[20px] bg-white p-6 md:p-10 shadow-card">
    <div class="flex flex-col gap-6">
      <div class="flex items-start justify-between">
        <span class="rounded-lg bg-primary-soft px-2 py-1 text-base text-primary">{{ timeAgo(job.postedAt) }}</span>
        <button
          type="button"
          :aria-label="saved ? 'Remove bookmark' : 'Bookmark job'"
          class="text-muted hover:text-primary"
          @click="saved = !saved"
        >
          <i :class="['pi', saved ? 'pi-bookmark-fill text-primary' : 'pi-bookmark', 'text-xl']"></i>
        </button>
      </div>

      <div class="flex items-start gap-5">
        <img :src="job.logo" alt="" class="h-10 w-10 shrink-0" />
        <div class="flex flex-col gap-3">
          <h3 class="text-xl md:text-[28px] font-semibold leading-tight">{{ job.title }}</h3>
          <p class="text-base">{{ job.company }}</p>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <ul class="flex flex-wrap items-center gap-x-6 gap-y-3 text-base font-semibold text-muted">
        <li class="flex items-center gap-3">
          <img :src="briefcaseIcon" alt="" class="h-6 w-6" />{{ job.category }}
        </li>
        <li class="flex items-center gap-3">
          <img :src="clockIcon" alt="" class="h-6 w-6" />{{ job.type }}
        </li>
        <li class="flex items-center gap-3">
          <i class="pi pi-wallet text-xl text-primary"></i>{{ job.salary }}
        </li>
        <li class="flex items-center gap-3">
          <img :src="mapPinIcon" alt="" class="h-6 w-6" />{{ job.location }}
        </li>
      </ul>
      <RouterLink :to="`/jobs/${job.id}`" class="btn-primary h-10 self-start lg:self-auto">Job Details</RouterLink>
    </div>
  </article>
</template>
