<script setup>
import blog1 from '@/assets/img/figma/blog-1.png';
import blog2 from '@/assets/img/figma/blog-2.png';
import arrowRight from '@/assets/img/figma/arrow-right.svg';

defineProps({
  center: { type: Boolean, default: false },
});

const posts = [
  { badge: 'News', image: blog1, date: '30 March 2024', title: 'Revitalizing Workplace Morale: Innovative Tactics for Boosting Employee Engagement in 2024' },
  { badge: 'Blog', image: blog2, date: '30 March 2024', title: 'How to avoid the top six most common job interview mistakes' },
];
</script>

<template>
  <section class="py-[60px]">
    <div class="container-page flex flex-col gap-[60px]">
      <div :class="['flex flex-col gap-6', center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between']">
        <div :class="['flex flex-col gap-6', center && 'items-center']">
          <h2 class="text-3xl md:text-[50px] font-bold leading-tight">News and Blog</h2>
          <p class="text-base">Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed tristique in dolor</p>
        </div>
        <a v-if="!center" href="#" class="text-base font-semibold text-primary underline">View all</a>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <article v-for="post in posts" :key="post.title" class="flex flex-col gap-6">
          <div class="relative h-[260px] overflow-hidden rounded-[20px] md:h-[400px]">
            <img :src="post.image" alt="" class="h-full w-full object-cover" />
            <span class="absolute left-[29px] top-[18px] rounded-xl bg-primary px-5 py-2 font-semibold text-white">{{ post.badge }}</span>
          </div>
          <div class="flex flex-col gap-5">
            <p class="text-base">{{ post.date }}</p>
            <h3 class="text-2xl font-semibold capitalize leading-8">{{ post.title }}</h3>
          </div>
          <a href="#" class="flex items-center gap-3 font-semibold text-primary">
            Read more <img :src="arrowRight" alt="" class="h-5 w-5" />
          </a>
        </article>
      </div>
    </div>
  </section>
</template>
