<script setup>
import { RouterLink } from 'vue-router';
import infoImg from '@/assets/img/figma/info-1.png';

const counters = [
  { value: '12k+', label: 'Clients worldwide' },
  { value: '20k+', label: 'Active resume' },
  { value: '18k+', label: 'Companies' },
];
</script>

<template>
  <section class="py-[60px] md:pt-[120px]">
    <div class="container-page flex flex-col gap-[86px]">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-[550px_1fr] lg:gap-[86px]">
        <img :src="infoImg" alt="" class="h-[320px] w-full rounded-[20px] object-cover md:h-[514px]" />
        <div class="flex flex-col gap-[60px]">
          <div class="flex flex-col gap-10">
            <h2 class="text-3xl md:text-[50px] font-bold leading-tight">Good Life Begins With A Good Company</h2>
            <p class="text-base leading-6 text-black/80">
              Ultricies purus dolor viverra mi laoreet at cursus justo. Ultrices purus diam egestas amet faucibus tempor blandit.
              Elit velit mauris aliquam est diam. Leo sagittis consectetur diam morbi erat aenean. Vulputate praesent congue faucibus
              in euismod feugiat euismod volutpat. Adipiscing risus amet phasellus imperdiet eget vel pulvinar.
            </p>
          </div>
          <div class="flex items-center gap-6">
            <RouterLink to="/jobs" class="btn-primary h-10">Search Job</RouterLink>
            <RouterLink to="/about" class="font-semibold text-primary underline">Learn more</RouterLink>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-[189px]">
        <div v-for="counter in counters" :key="counter.label" class="flex flex-col gap-6">
          <p class="text-[50px] font-bold leading-none text-primary">{{ counter.value }}</p>
          <p class="text-2xl font-semibold">{{ counter.label }}</p>
          <p class="text-base text-black/80">
            Ultricies purus dolor viverra mi laoreet at cursus justo. Ultrices purus diam egestas amet faucibus tempor blandit.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
