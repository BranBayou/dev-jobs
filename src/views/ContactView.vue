<script setup>
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';
import PageHero from '@/components/PageHero.vue';
import mapImg from '@/assets/img/figma/map.png';

const toast = useToast();

const details = [
  { icon: 'pi-phone', title: 'Call for inquiry', value: '+257 388-6895' },
  { icon: 'pi-envelope', title: 'Send us email', value: 'kramulous@sbcglobal.net' },
  { icon: 'pi-clock', title: 'Opening hours', value: 'Mon - Fri: 10AM - 10PM' },
  { icon: 'pi-map-marker', title: 'Office', value: '19 North Road Piscataway, NY 08854' },
];

const brands = ['zoom', 'tinder', 'dribbble', 'asana'];

const emptyForm = () => ({ firstName: '', lastName: '', email: '', message: '' });
const form = reactive(emptyForm());

const submit = () => {
  toast.success(`Thanks ${form.firstName}, your message has been sent!`);
  Object.assign(form, emptyForm());
};
</script>

<template>
  <PageHero title="Contact Us" />

  <!-- Info + form -->
  <section class="py-[60px] md:py-[100px]">
    <div class="container-page grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_520px] lg:gap-[86px]">
      <div class="flex flex-col gap-[60px]">
        <div class="flex flex-col gap-6">
          <h2 class="text-3xl md:text-[40px] font-bold leading-tight">You Will Grow, You Will Succeed. We Promise That</h2>
          <p class="max-w-[600px] leading-6 text-black/60">
            Pellentesque arcu facilisis nunc mi proin. Dignissim mattis in lectus tincidunt tincidunt ultrices. Diam convallis morbi
            pellentesque adipiscing
          </p>
        </div>

        <dl class="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div v-for="item in details" :key="item.title" class="flex flex-col gap-4">
            <i :class="['pi', item.icon, 'text-2xl text-primary']"></i>
            <dt class="text-xl font-semibold">{{ item.title }}</dt>
            <dd class="text-black/60">{{ item.value }}</dd>
          </div>
        </dl>
      </div>

      <form class="flex flex-col gap-6 rounded-[20px] bg-primary-light p-6 md:p-10" @submit.prevent="submit">
        <div class="flex flex-col items-center gap-3 text-center">
          <h3 class="text-[28px] font-semibold">Contact Info</h3>
          <p class="text-black/60">Nibh dis faucibus proin lacus tristique</p>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <label class="flex flex-col gap-3">
            <span class="font-semibold">First Name</span>
            <input v-model="form.firstName" required type="text" placeholder="Your name" class="h-[50px] rounded-lg bg-white px-4 focus:outline-none focus:ring-2 focus:ring-primary" />
          </label>
          <label class="flex flex-col gap-3">
            <span class="font-semibold">Last Name</span>
            <input v-model="form.lastName" type="text" placeholder="Your last name" class="h-[50px] rounded-lg bg-white px-4 focus:outline-none focus:ring-2 focus:ring-primary" />
          </label>
        </div>

        <label class="flex flex-col gap-3">
          <span class="font-semibold">Email Address</span>
          <input v-model="form.email" required type="email" placeholder="Your E-mail address" class="h-[50px] rounded-lg bg-white px-4 focus:outline-none focus:ring-2 focus:ring-primary" />
        </label>

        <label class="flex flex-col gap-3">
          <span class="font-semibold">Message</span>
          <textarea v-model="form.message" required rows="6" placeholder="Your message..." class="resize-none rounded-lg bg-white p-4 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
        </label>

        <button type="submit" class="btn-primary h-[50px] w-full">Send Message</button>
      </form>
    </div>
  </section>

  <!-- Map -->
  <section class="container-page">
    <img :src="mapImg" alt="Map showing our office location" class="h-[300px] w-full rounded-[20px] object-cover md:h-[560px]" />
  </section>

  <!-- Brands -->
  <section class="py-[60px] md:py-[100px]">
    <div class="container-page flex flex-wrap items-center justify-center gap-10 md:justify-between">
      <span v-for="brand in brands" :key="brand" class="text-3xl md:text-[40px] font-bold lowercase text-black/30">{{ brand }}</span>
    </div>
  </section>
</template>
