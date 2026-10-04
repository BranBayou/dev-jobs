<script setup>
import { RouterLink } from 'vue-router';
import SectionHeading from '@/components/SectionHeading.vue';
import { categories, jobs } from '@/data/jobs';

// Pad dummy counts so the cards look realistic.
const countFor = (name) => jobs.filter((job) => job.category === name).length * 312 + 1254;
</script>

<template>
  <section class="bg-primary-light py-[60px]">
    <div class="container-page flex flex-col gap-[60px]">
      <SectionHeading
        center
        title="Browse by Category"
        subtitle="At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id scelerisque rhoncus."
      />
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <RouterLink
          v-for="category in categories"
          :key="category.name"
          :to="{ path: '/jobs', query: { category: category.name } }"
          class="flex h-[280px] flex-col items-center justify-center gap-10 rounded-[20px] bg-white shadow-card transition-transform hover:-translate-y-1"
        >
          <i :class="['pi', category.icon, 'text-[40px] text-primary']"></i>
          <h3 class="text-2xl font-semibold">{{ category.name }}</h3>
          <span class="rounded-lg bg-primary-soft px-3 py-2 text-base text-primary">{{ countFor(category.name) }} jobs</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
