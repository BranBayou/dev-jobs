<script setup>
import { reactive, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import PageHero from '@/components/PageHero.vue';
import { useAuthStore, safeRedirect } from '@/stores/auth';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const form = reactive({ email: '', password: '', remember: true });
const showPassword = ref(false);
const error = ref('');
const isSubmitting = ref(false);

const submit = async () => {
  error.value = '';
  isSubmitting.value = true;
  try {
    await auth.login(form);
    toast.success(`Welcome back, ${auth.user.name}!`);
    router.push(safeRedirect(route.query.redirect));
  } catch (e) {
    error.value = e.message;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <PageHero title="Login" />

  <section class="py-[60px] md:py-[100px]">
    <div class="container-page flex justify-center">
      <form class="flex w-full max-w-[520px] flex-col gap-6 rounded-[20px] bg-primary-light p-6 md:p-10" novalidate @submit.prevent="submit">
        <div class="flex flex-col items-center gap-3 text-center">
          <h2 class="text-[28px] font-semibold">Welcome Back</h2>
          <p class="text-black/60">Log in to apply for jobs and post new openings</p>
        </div>

        <p v-if="error" role="alert" class="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{{ error }}</p>

        <label class="flex flex-col gap-3">
          <span class="font-semibold">Email Address</span>
          <input
            v-model="form.email"
            type="email"
            autocomplete="email"
            required
            placeholder="Your E-mail address"
            class="h-[50px] rounded-lg bg-white px-4 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </label>

        <label class="flex flex-col gap-3">
          <span class="font-semibold">Password</span>
          <span class="flex h-[50px] items-center rounded-lg bg-white px-4 focus-within:ring-2 focus-within:ring-primary">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              required
              placeholder="Your password"
              class="w-full bg-transparent focus:outline-none"
            />
            <button type="button" class="text-muted hover:text-primary" :aria-label="showPassword ? 'Hide password' : 'Show password'" @click="showPassword = !showPassword">
              <i :class="['pi', showPassword ? 'pi-eye-slash' : 'pi-eye']"></i>
            </button>
          </span>
        </label>

        <label class="flex items-center gap-2">
          <input v-model="form.remember" type="checkbox" class="h-4 w-4 accent-primary" />
          Remember me
        </label>

        <button type="submit" class="btn-primary h-[50px] w-full disabled:opacity-60" :disabled="isSubmitting || !form.email || !form.password">
          {{ isSubmitting ? 'Logging in…' : 'Login' }}
        </button>

        <p class="text-center text-black/60">
          Don't have an account?
          <RouterLink :to="{ path: '/register', query: route.query }" class="font-semibold text-primary underline">Register</RouterLink>
        </p>
      </form>
    </div>
  </section>
</template>
