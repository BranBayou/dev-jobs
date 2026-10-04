<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import PageHero from '@/components/PageHero.vue';
import SectionHeading from '@/components/SectionHeading.vue';
import BlogSection from '@/components/BlogSection.vue';
import teamImg from '@/assets/img/figma/about-team.png';
import videoImg from '@/assets/img/figma/video.png';
import playIcon from '@/assets/img/figma/play.svg';
import plusCircle from '@/assets/img/figma/plus-circle.svg';
import plusCircleActive from '@/assets/img/figma/plus-circle-active.svg';
import info1 from '@/assets/img/figma/info-1.png';
import info2 from '@/assets/img/figma/info-2.png';
import info3 from '@/assets/img/figma/info-3.png';

const steps = [
  { icon: 'pi-user-plus', title: 'Create Account', text: 'Nunc sed a nisl purus. Nibh dis faucibus proin lacus' },
  { icon: 'pi-file', title: 'Upload Resume', text: 'Felis eu ultrices a sed massa. Commodo fringilla sed tempor' },
  { icon: 'pi-briefcase', title: 'Find Jobs', text: 'Commodo fringilla sed tempor risus laoreet ultricies ipsum' },
  { icon: 'pi-check-circle', title: 'Apply Job', text: 'Nisi enim feugiat enim volutpat. Sem quis viverra' },
];

const videoPoints = [
  'Elit gravida lorem amet porta risus vitae at',
  'Volutpat dui lacus mattis urna platea consequat sagittis',
  'Elementum faucibus netus gravida lacus lorem',
];

const faqs = [
  { q: 'Can I upload a CV?', a: 'Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in. Felis eu ultrices a sed massa. Commodo fringilla sed tempor risus laoreet ultricies ipsum. Habitasse morbi faucibus in iaculis lectus.' },
  { q: 'How long will the recruitment process take?', a: 'Nisi enim feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc. Et nunc ut tempus duis nisl sed massa.' },
  { q: 'What does the recruitment and selection process involve?', a: 'Ornare varius faucibus nisi vitae vitae cras ornare. Cras facilisis dignissim augue lorem amet adipiscing cursus fames mauris.' },
  { q: 'Do you recruit for Graduates, Apprentices and Students?', a: 'Tortor amet porta proin in. Orci imperdiet nisi dignissim pellentesque morbi vitae. Quisque tincidunt metus lectus porta eget blandit.' },
  { q: 'Can I receive notifications for any future jobs that may interest me?', a: 'Quisque tincidunt metus lectus porta eget blandit euismod sem nunc. Tortor gravida amet amet sapien mauris massa.' },
];
const openFaq = ref(0);
const toggleFaq = (i) => (openFaq.value = openFaq.value === i ? -1 : i);

const features = [
  { icon: 'pi-verified', label: 'Quality Job' },
  { icon: 'pi-file-edit', label: 'Resume builder' },
  { icon: 'pi-building', label: 'Top Companies' },
  { icon: 'pi-star', label: 'Top Talents' },
];
</script>

<template>
  <PageHero title="About Us" />

  <!-- Info block -->
  <section class="py-[60px]">
    <div class="container-page flex flex-col gap-10">
      <div class="grid grid-cols-1 gap-10 py-10 md:grid-cols-2">
        <h2 class="text-3xl md:text-[40px] font-semibold leading-tight">Et nunc ut tempus duis nisl sed massa</h2>
        <p class="leading-6">
          Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in. Felis eu ultrices a sed
          massa. Commodo fringilla sed tempor risus laoreet ultricies ipsum. Habitasse morbi faucibus in iaculis lectus. Nisi enim
          feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc.
        </p>
      </div>
      <img :src="teamImg" alt="" class="h-[300px] w-full rounded-[20px] object-cover md:h-[582px]" />
    </div>
  </section>

  <!-- How it works -->
  <section class="pt-[60px] pb-[120px]">
    <div class="container-page flex flex-col gap-[60px]">
      <SectionHeading
        center
        title="How it works"
        subtitle="At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id scelerisque rhoncus."
      />
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="step in steps" :key="step.title" class="flex h-[280px] flex-col items-center justify-center gap-6 rounded-[20px] bg-white shadow-card">
          <span class="flex h-[60px] w-[60px] items-center justify-center rounded-lg">
            <i :class="['pi', step.icon, 'text-[40px] text-primary']"></i>
          </span>
          <div class="flex flex-col items-center gap-5 text-center">
            <h3 class="text-xl font-bold">{{ step.title }}</h3>
            <p class="w-[240px] leading-6 text-black/60">{{ step.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Video -->
  <section class="container-page">
    <div class="relative flex min-h-[760px] flex-col overflow-hidden rounded-[20px]">
      <img :src="videoImg" alt="" class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative flex flex-1 flex-col items-center justify-center gap-[60px] px-6 py-16 text-center">
        <button type="button" aria-label="Play video"><img :src="playIcon" alt="" class="h-20 w-20" /></button>
        <h2 class="max-w-[952px] text-3xl md:text-[50px] font-bold leading-tight text-white">Good Life Begins With A Good Company</h2>
      </div>
      <div class="relative grid grid-cols-1 gap-8 bg-black/80 px-6 py-10 md:grid-cols-3 md:px-[68px] md:py-[46px]">
        <div v-for="(point, i) in videoPoints" :key="point" class="flex items-start gap-4">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-2xl font-semibold text-white">{{ i + 1 }}</span>
          <div class="flex flex-col gap-3">
            <p class="text-xl font-semibold text-white">{{ point }}</p>
            <RouterLink to="/jobs" class="font-semibold text-primary">Learn more</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="pt-[120px] pb-[60px]">
    <div class="container-page flex flex-col gap-[60px]">
      <SectionHeading center title="Frequently Asked Questions" subtitle="At eu lobortis pretium tincidunt amet lacus ut aenean aliquet" />
      <div class="flex flex-col">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.q"
          :class="[openFaq === i ? 'rounded-[20px] bg-primary-light' : 'border-b-2 border-primary/20', 'flex gap-5 p-6 md:p-10']"
        >
          <span :class="[openFaq === i ? 'text-primary' : 'text-muted', 'text-[28px] font-semibold leading-none']">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="flex flex-1 flex-col gap-5">
            <button type="button" class="text-left text-xl md:text-2xl font-semibold" :aria-expanded="openFaq === i" @click="toggleFaq(i)">{{ faq.q }}</button>
            <p v-if="openFaq === i" class="leading-6 text-black/60">{{ faq.a }}</p>
          </div>
          <button type="button" class="shrink-0 self-start" :aria-label="openFaq === i ? 'Collapse' : 'Expand'" @click="toggleFaq(i)">
            <img :src="openFaq === i ? plusCircleActive : plusCircle" alt="" class="h-10 w-10" />
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Info block 2 -->
  <section class="py-[60px]">
    <div class="container-page grid grid-cols-1 items-center gap-16 lg:grid-cols-[636px_1fr]">
      <div class="grid grid-cols-2 gap-6">
        <img :src="info1" alt="" class="h-[560px] w-full rounded-[20px] object-cover" />
        <div class="flex flex-col gap-6">
          <img :src="info2" alt="" class="h-[338px] w-full rounded-[20px] object-cover" />
          <img :src="info3" alt="" class="h-[200px] w-full rounded-[20px] object-cover" />
        </div>
      </div>
      <div class="flex flex-col gap-10">
        <h2 class="text-3xl md:text-[50px] font-bold leading-tight">We’re Only Working With The Best</h2>
        <p class="max-w-[600px] leading-6 text-black/80">
          Ultricies purus dolor viverra mi laoreet at cursus justo. Ultrices purus diam egestas amet faucibus tempor blandit.
        </p>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div v-for="feature in features" :key="feature.label" class="flex items-center gap-4">
            <span class="flex h-[60px] w-[60px] items-center justify-center rounded-lg bg-white shadow-card">
              <i :class="['pi', feature.icon, 'text-3xl text-primary']"></i>
            </span>
            <span class="text-xl font-semibold">{{ feature.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <BlogSection center />
</template>
