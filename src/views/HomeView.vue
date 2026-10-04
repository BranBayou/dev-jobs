<template>
  <Hero />
  <JobListings :limit="5" :showButton="true" />
  <CategorySection />
  <InfoSection />
  <BannerSection />
  <TestimonialsSection />
  <BlogSection />
</template>

<script setup>
import Hero from '@/components/Hero.vue'
import JobListings from '@/components/JobListings.vue'
import CategorySection from '@/components/home/CategorySection.vue'
import InfoSection from '@/components/home/InfoSection.vue'
import BannerSection from '@/components/home/BannerSection.vue'
import TestimonialsSection from '@/components/home/TestimonialsSection.vue'
import BlogSection from '@/components/BlogSection.vue'
</script>
