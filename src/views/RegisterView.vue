<script setup>
import { computed, reactive, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import PageHero from '@/components/PageHero.vue';
import { useAuthStore, safeRedirect } from '@/stores/auth';

const MIN_PASSWORD_LENGTH = 8;

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const form = reactive({ name: '', email: '', password: '', confirmPassword: '', terms: false });
const showPassword = ref(false);
const error = ref('');
const isSubmitting = ref(false);
const touched = ref(false);

const fieldErrors = computed(() => {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'Please enter a valid email address.';
  if (form.password.length < MIN_PASSWORD_LENGTH) errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  if (form.confirmPassword !== form.password) errors.confirmPassword = 'Passwords do not match.';
  if (!form.terms) errors.terms = 'Please accept the terms to continue.';
  return errors;
});

const submit = async () => {
  touched.value = true;
  error.value = '';
  if (Object.keys(fieldErrors.value).length) return;

  isSubmitting.value = true;
  try {
    await auth.register(form);
    toast.success(`Welcome to Job Portal, ${auth.user.name}!`);
    router.push(safeRedirect(route.query.redirect));
  } catch (e) {
    error.value = e.message;
  } finally {
    isSubmitting.value = false;
  }
};

const inputClass = 'h-[50px] rounded-lg bg-white px-4 focus:outline-none focus:ring-2 focus:ring-primary';
</script>

<template>
  <PageHero title="Register" />

  <section class="py-[60px] md:py-[100px]">
    <div class="container-page flex justify-center">
      <form class="flex w-full max-w-[520px] flex-col gap-6 rounded-[20px] bg-primary-light p-6 md:p-10" novalidate @submit.prevent="submit">
        <div class="flex flex-col items-center gap-3 text-center">
          <h2 class="text-[28px] font-semibold">Create an Account</h2>
          <p class="text-black/60">Join thousands of people finding their dream job</p>
        </div>

        <p v-if="error" role="alert" class="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {{ error }}
          <RouterLink v-if="error.includes('already exists')" to="/login" class="font-semibold underline">Log in instead</RouterLink>
        </p>

        <label class="flex flex-col gap-3">
          <span class="font-semibold">Full Name</span>
          <input v-model="form.name" type="text" autocomplete="name" placeholder="Your full name" :class="inputClass" />
          <span v-if="touched && fieldErrors.name" class="text-sm text-red-600">{{ fieldErrors.name }}</span>
        </label>

        <label class="flex flex-col gap-3">
          <span class="font-semibold">Email Address</span>
          <input v-model="form.email" type="email" autocomplete="email" placeholder="Your E-mail address" :class="inputClass" />
          <span v-if="touched && fieldErrors.email" class="text-sm text-red-600">{{ fieldErrors.email }}</span>
        </label>

        <label class="flex flex-col gap-3">
          <span class="font-semibold">Password</span>
          <span class="flex h-[50px] items-center rounded-lg bg-white px-4 focus-within:ring-2 focus-within:ring-primary">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
              :placeholder="`At least ${MIN_PASSWORD_LENGTH} characters`"
              class="w-full bg-transparent focus:outline-none"
            />
            <button type="button" class="text-muted hover:text-primary" :aria-label="showPassword ? 'Hide password' : 'Show password'" @click="showPassword = !showPassword">
              <i :class="['pi', showPassword ? 'pi-eye-slash' : 'pi-eye']"></i>
            </button>
          </span>
          <span v-if="touched && fieldErrors.password" class="text-sm text-red-600">{{ fieldErrors.password }}</span>
        </label>

        <label class="flex flex-col gap-3">
          <span class="font-semibold">Confirm Password</span>
          <input
            v-model="form.confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            placeholder="Repeat your password"
            :class="inputClass"
          />
          <span v-if="touched && fieldErrors.confirmPassword" class="text-sm text-red-600">{{ fieldErrors.confirmPassword }}</span>
        </label>

        <label class="flex flex-col gap-2">
          <span class="flex items-center gap-2">
            <input v-model="form.terms" type="checkbox" class="h-4 w-4 accent-primary" />
            I agree to the <a href="#" class="text-primary underline">Terms &amp; Conditions</a>
          </span>
          <span v-if="touched && fieldErrors.terms" class="text-sm text-red-600">{{ fieldErrors.terms }}</span>
        </label>

        <button type="submit" class="btn-primary h-[50px] w-full disabled:opacity-60" :disabled="isSubmitting">
          {{ isSubmitting ? 'Creating account…' : 'Register' }}
        </button>

        <p class="text-center text-black/60">
          Already have an account?
          <RouterLink :to="{ path: '/login', query: route.query }" class="font-semibold text-primary underline">Login</RouterLink>
        </p>
      </form>
    </div>
  </section>
</template>
