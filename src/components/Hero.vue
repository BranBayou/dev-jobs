<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import heroImg from '@/assets/img/figma/hero.jpg';
import { categories, locations } from '@/data/jobs';

const router = useRouter();

const search = reactive({
  q: '',
  location: '',
  category: '',
});

const stats = [
  { icon: 'pi-briefcase', value: '25,850', label: 'Jobs' },
  { icon: 'pi-users', value: '10,250', label: 'Candidates' },
  { icon: 'pi-building', value: '18,400', label: 'Companies' },
];

const brands = ['Spotify', 'Slack', 'Adobe', 'Asana', 'Linear'];

const submit = () => {
  const query = Object.fromEntries(Object.entries(search).filter(([, v]) => v));
  router.push({ path: '/jobs', query });
};
</script>

<template>
  <section class="relative overflow-hidden bg-black pt-[160px] md:pt-[200px]">
    <img :src="heroImg" alt="" class="absolute inset-0 h-full w-full object-cover opacity-30" aria-hidden="true" />

    <div class="container-page relative flex flex-col items-center gap-10 text-center">
      <h1 class="text-4xl md:text-[60px] font-bold leading-tight text-white">Find Your Dream Job Today!</h1>
      <p class="max-w-xl text-lg text-white">
        Connecting Talent with Opportunity: Your Gateway to Career Success
      </p>

      <!-- Search -->
      <form
        class="grid w-full max-w-[1000px] grid-cols-1 overflow-hidden rounded-xl bg-white text-left md:grid-cols-[1fr_1fr_1fr_auto]"
        @submit.prevent="submit"
      >
        <input
          v-model="search.q"
          type="text"
          placeholder="Job Title or Company"
          class="h-[60px] border-b border-gray-200 px-5 text-base focus:outline-none md:border-b-0 md:border-r"
        />
        <select v-model="search.location" class="h-[60px] border-b border-gray-200 bg-white px-5 text-base text-muted focus:outline-none md:border-b-0 md:border-r">
          <option value="">Select Location</option>
          <option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
        </select>
        <select v-model="search.category" class="h-[60px] bg-white px-5 text-base text-muted focus:outline-none">
          <option value="">Select Category</option>
          <option v-for="category in categories" :key="category.name" :value="category.name">{{ category.name }}</option>
        </select>
        <button type="submit" class="flex h-[60px] items-center justify-center gap-2 bg-primary px-8 font-semibold text-white hover:bg-primary-dark">
          <i class="pi pi-search"></i> Search Job
        </button>
      </form>

      <!-- Stats -->
      <div class="flex flex-wrap justify-center gap-10 md:gap-24">
        <div v-for="stat in stats" :key="stat.label" class="flex items-center gap-5">
          <span class="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-primary">
            <i :class="['pi', stat.icon, 'text-2xl text-white']"></i>
          </span>
          <div class="text-left text-white">
            <p class="text-xl font-semibold">{{ stat.value }}</p>
            <p class="text-base opacity-80">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Brands -->
    <div class="relative mt-[100px] bg-black py-12">
      <div class="container-page flex flex-wrap items-center justify-center gap-10 md:justify-between">
        <span v-for="brand in brands" :key="brand" class="text-2xl md:text-3xl font-bold text-white/80">{{ brand }}</span>
      </div>
    </div>
  </section>
</template>
