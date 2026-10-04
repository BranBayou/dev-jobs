<script setup>
import { ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import logo from '@/assets/img/figma/logo-check.svg';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const auth = useAuthStore();
const isOpen = ref(false);

const logout = () => {
  auth.logout();
  toast.info('You have been logged out.');
  if (route.meta.requiresAuth) router.push('/');
};

const links = [
  { to: '/', label: 'Home' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
];

const isActiveLink = (path) =>
  path === '/' ? route.path === '/' : route.path.startsWith(path);

watch(() => route.fullPath, () => (isOpen.value = false));
</script>

<template>
  <header class="absolute inset-x-0 top-0 z-20">
    <nav class="container-page flex items-center justify-between py-5">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2.5">
        <img :src="logo" alt="" class="h-7 w-7" />
        <span class="text-xl font-semibold text-white">Job Portal</span>
      </RouterLink>

      <!-- Desktop menu -->
      <div class="hidden md:flex items-center gap-5">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :class="[
            isActiveLink(link.to) ? 'font-semibold opacity-100' : 'font-medium opacity-60 hover:opacity-100',
            'px-3 py-2 text-base text-white transition-opacity',
          ]"
        >{{ link.label }}</RouterLink>
      </div>

      <div v-if="auth.isLoggedIn" class="hidden md:flex items-center gap-5">
        <span class="flex items-center gap-2 text-base text-white">
          <i class="pi pi-user"></i>{{ auth.user.name }}
        </span>
        <RouterLink to="/jobs/add" class="btn-primary h-10">Post a Job</RouterLink>
        <button type="button" class="text-base font-semibold text-white opacity-80 hover:opacity-100" @click="logout">Logout</button>
      </div>
      <div v-else class="hidden md:flex items-center gap-5">
        <RouterLink to="/login" class="text-base font-semibold text-white">Login</RouterLink>
        <RouterLink to="/register" class="btn-primary h-10">Register</RouterLink>
      </div>

      <!-- Mobile toggle -->
      <button
        type="button"
        class="md:hidden text-white"
        :aria-expanded="isOpen"
        aria-label="Toggle menu"
        @click="isOpen = !isOpen"
      >
        <i :class="['pi', isOpen ? 'pi-times' : 'pi-bars', 'text-xl']"></i>
      </button>
    </nav>

    <!-- Mobile menu -->
    <div v-if="isOpen" class="md:hidden bg-black/95 px-4 pb-6">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :class="[isActiveLink(link.to) ? 'font-semibold' : 'opacity-60', 'block py-3 text-white']"
      >{{ link.label }}</RouterLink>
      <div v-if="auth.isLoggedIn" class="mt-3 flex flex-wrap items-center gap-5">
        <span class="flex items-center gap-2 text-white"><i class="pi pi-user"></i>{{ auth.user.name }}</span>
        <RouterLink to="/jobs/add" class="btn-primary h-10">Post a Job</RouterLink>
        <button type="button" class="font-semibold text-white" @click="logout">Logout</button>
      </div>
      <div v-else class="mt-3 flex items-center gap-5">
        <RouterLink to="/login" class="font-semibold text-white">Login</RouterLink>
        <RouterLink to="/register" class="btn-primary h-10">Register</RouterLink>
      </div>
    </div>
  </header>
</template>
