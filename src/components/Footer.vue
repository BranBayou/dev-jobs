<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import logo from '@/assets/img/figma/logo-check.svg';

const currentYear = new Date().getFullYear();
const email = ref('');
const toast = useToast();

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Team', to: '/about' },
  { label: 'Partners', to: '/about' },
  { label: 'For Candidates', to: '/jobs' },
  { label: 'For Employers', to: '/jobs/add' },
];

const categoryLinks = ['Telecomunications', 'Hotels & Tourism', 'Construction', 'Education', 'Financial Services'];

const subscribe = () => {
  if (!email.value) return;
  toast.success('Thanks for subscribing!');
  email.value = '';
};
</script>

<template>
  <footer class="bg-black pt-[100px] pb-[60px]">
    <div class="container-page flex flex-col gap-20">
      <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[377px_1fr_1fr_306px] xl:gap-16">
        <!-- Logo + text -->
        <div class="flex flex-col gap-10">
          <RouterLink to="/" class="flex items-center gap-2.5">
            <img :src="logo" alt="" class="h-7 w-7" />
            <span class="text-xl font-semibold text-white">Job</span>
          </RouterLink>
          <p class="text-xl font-semibold leading-8 text-white/80">
            Quis enim pellentesque viverra tellus eget malesuada facilisis. Congue nibh vivamus aliquet nunc mauris dui nullam et.
          </p>
        </div>

        <div class="flex flex-col gap-6 text-white lg:justify-self-center">
          <h3 class="text-xl font-semibold">Company</h3>
          <ul class="flex flex-col gap-4 text-base">
            <li v-for="link in companyLinks" :key="link.label">
              <RouterLink :to="link.to" class="hover:text-primary">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-6 text-white lg:justify-self-center">
          <h3 class="text-xl font-semibold">Job Categories</h3>
          <ul class="flex flex-col gap-4 text-base">
            <li v-for="category in categoryLinks" :key="category">
              <RouterLink :to="{ path: '/jobs', query: { category } }" class="hover:text-primary">{{ category }}</RouterLink>
            </li>
          </ul>
        </div>

        <form class="flex flex-col gap-4" @submit.prevent="subscribe">
          <h3 class="text-xl font-semibold text-white">Newsletter</h3>
          <p class="text-sm text-white/80">Eu nunc pretium vitae platea. Non netus elementum vulputate</p>
          <input
            v-model="email"
            type="email"
            required
            placeholder="Email Address"
            class="h-[50px] w-full rounded-xl border border-white/60 bg-transparent px-5 text-sm text-white placeholder:text-white/60 focus:border-primary focus:outline-none"
          />
          <button type="submit" class="h-[50px] w-full rounded-xl bg-primary font-bold text-white hover:bg-primary-dark">Subscribe now</button>
        </form>
      </div>

      <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <p class="text-sm text-white/50">&copy; Copyright Job Portal {{ currentYear }}. Designed by Figma.guru</p>
        <div class="flex gap-5 text-base text-white">
          <a href="#" class="underline">Privacy Policy</a>
          <a href="#" class="underline">Terms &amp; Conditions</a>
        </div>
      </div>
    </div>
  </footer>
</template>
