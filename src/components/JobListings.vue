<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import JobCard from './JobCard.vue';
import { jobs } from '@/data/jobs';

const props = defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
});

const recentJobs = computed(() =>
  [...jobs]
    .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))
    .slice(0, props.limit || jobs.length),
);
</script>

<template>
  <section class="py-[60px]">
    <div class="container-page flex flex-col gap-[60px]">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div class="flex flex-col gap-6">
          <h2 class="text-3xl md:text-[50px] font-bold leading-tight">Recent Jobs Available</h2>
          <p class="text-base">At eu lobortis pretium tincidunt amet lacus ut aenean aliquet</p>
        </div>
        <RouterLink v-if="showButton" to="/jobs" class="text-base font-semibold text-primary underline">View all</RouterLink>
      </div>

      <div class="flex flex-col gap-6">
        <JobCard v-for="job in recentJobs" :key="job.id" :job="job" />
      </div>
    </div>
  </section>
</template>
