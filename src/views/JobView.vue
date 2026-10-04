<script setup>
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import PageHero from '@/components/PageHero.vue';
import JobCard from '@/components/JobCard.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import { jobs, getJobById, timeAgo } from '@/data/jobs';
import briefcaseIcon from '@/assets/img/figma/briefcase.svg';
import clockIcon from '@/assets/img/figma/clock.svg';
import mapPinIcon from '@/assets/img/figma/map-pin.svg';
import checkIcon from '@/assets/img/figma/check.svg';
import userIcon from '@/assets/img/figma/user.svg';
import mailIcon from '@/assets/img/figma/mail.svg';
import phoneIcon from '@/assets/img/figma/phone.svg';
import messageIcon from '@/assets/img/figma/message.svg';
import facebookIcon from '@/assets/img/figma/facebook.svg';
import xIcon from '@/assets/img/figma/x.svg';
import linkedinIcon from '@/assets/img/figma/linkedin.svg';
import mapImg from '@/assets/img/figma/map.png';

const route = useRoute();
const toast = useToast();

const job = computed(() => getJobById(route.params.id));

const relatedJobs = computed(() => {
  if (!job.value) return [];
  return jobs
    .filter((j) => j.id !== job.value.id)
    .sort((a, b) => Number(b.category === job.value.category) - Number(a.category === job.value.category))
    .slice(0, 3);
});

const overview = computed(() => [
  { icon: 'pi-user', label: 'Job Title', value: job.value.title },
  { icon: 'pi-clock', label: 'Job Type', value: job.value.type },
  { icon: 'pi-briefcase', label: 'Category', value: job.value.category },
  { icon: 'pi-star', label: 'Experience', value: job.value.years },
  { icon: 'pi-graduation-cap', label: 'Degree', value: job.value.degree },
  { icon: 'pi-wallet', label: 'Offered Salary', value: job.value.salary },
  { icon: 'pi-map-marker', label: 'Location', value: job.value.location },
]);

const message = reactive({ name: '', email: '', phone: '', body: '' });

const sendMessage = () => {
  toast.success('Your message has been sent!');
  Object.assign(message, { name: '', email: '', phone: '', body: '' });
};

const applyJob = () => toast.success(`Application started for ${job.value.title}`);
</script>

<template>
  <NotFoundView v-if="!job" />
  <template v-else>
    <PageHero title="Job Details" />

    <!-- Header card -->
    <section class="container-page flex flex-col gap-7 pt-[60px]">
      <div class="flex flex-col gap-6">
        <div class="flex items-start justify-between">
          <span class="rounded-lg bg-primary-soft px-2 py-1 text-primary">{{ timeAgo(job.postedAt) }}</span>
          <i class="pi pi-bookmark text-xl text-muted"></i>
        </div>
        <div class="flex items-start gap-5">
          <img :src="job.logo" alt="" class="h-10 w-10 shrink-0" />
          <div class="flex flex-col gap-3">
            <h2 class="text-2xl md:text-[40px] font-semibold leading-tight">{{ job.title }}</h2>
            <p class="text-base">{{ job.company }}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <ul class="flex flex-wrap items-center gap-x-6 gap-y-3 font-semibold text-muted">
          <li class="flex items-center gap-3"><img :src="briefcaseIcon" alt="" class="h-6 w-6" />{{ job.category }}</li>
          <li class="flex items-center gap-3"><img :src="clockIcon" alt="" class="h-6 w-6" />{{ job.type }}</li>
          <li class="flex items-center gap-3"><i class="pi pi-wallet text-xl text-primary"></i>{{ job.salary }}</li>
          <li class="flex items-center gap-3"><img :src="mapPinIcon" alt="" class="h-6 w-6" />{{ job.location }}</li>
        </ul>
        <button type="button" class="btn-primary h-[50px] w-full lg:w-[301px]" @click="applyJob">Apply Job</button>
      </div>
    </section>

    <section class="container-page grid grid-cols-1 gap-6 py-[60px] lg:grid-cols-[1fr_306px]">
      <!-- Main content -->
      <div class="flex min-w-0 flex-col gap-[60px]">
        <div class="flex flex-col gap-10">
          <h3 class="text-2xl font-semibold">Job Description</h3>
          <div class="flex flex-col gap-2 leading-6">
            <p v-for="(paragraph, i) in job.description" :key="i">{{ paragraph }}</p>
          </div>
        </div>

        <div class="flex flex-col gap-10">
          <h3 class="text-2xl font-semibold">Key Responsibilities</h3>
          <ul class="flex flex-col gap-6">
            <li v-for="item in job.responsibilities" :key="item" class="flex items-start gap-3">
              <img :src="checkIcon" alt="" class="h-6 w-6 shrink-0" />{{ item }}
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-10">
          <h3 class="text-2xl font-semibold">Professional Skills</h3>
          <ul class="flex flex-col gap-6">
            <li v-for="item in job.skills" :key="item" class="flex items-start gap-3">
              <img :src="checkIcon" alt="" class="h-6 w-6 shrink-0" />{{ item }}
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-10">
          <h3 class="text-2xl font-semibold">Tags:</h3>
          <div class="flex flex-wrap gap-6">
            <span
              v-for="tag in [job.type, job.category, job.location, ...job.tags]"
              :key="tag"
              class="flex h-10 items-center rounded-xl bg-primary-soft px-3 text-primary"
            >{{ tag }}</span>
          </div>
        </div>

        <div class="flex items-center gap-6">
          <span class="text-xl font-semibold">Share Job:</span>
          <a href="#" aria-label="Share on Facebook"><img :src="facebookIcon" alt="" class="h-6 w-6" /></a>
          <a href="#" aria-label="Share on X"><img :src="xIcon" alt="" class="h-6 w-6" /></a>
          <a href="#" aria-label="Share on LinkedIn"><img :src="linkedinIcon" alt="" class="h-6 w-6" /></a>
        </div>

        <!-- Related jobs -->
        <div class="flex flex-col gap-10 py-[60px]">
          <div class="flex flex-col gap-6">
            <h3 class="text-3xl md:text-[50px] font-semibold leading-tight">Related Jobs</h3>
            <p>At eu lobortis pretium tincidunt amet lacus ut aenean aliquet</p>
          </div>
          <div class="flex flex-col gap-6">
            <JobCard v-for="related in relatedJobs" :key="related.id" :job="related" />
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="flex flex-col gap-10">
        <div class="flex flex-col gap-8 rounded-[20px] bg-primary-light px-5 pb-5 pt-7">
          <h3 class="text-lg font-bold">Job Overview</h3>
          <dl class="flex flex-col gap-6">
            <div v-for="item in overview" :key="item.label" class="flex items-start gap-3">
              <i :class="['pi', item.icon, 'mt-0.5 text-xl text-primary']"></i>
              <div class="flex flex-col gap-2">
                <dt class="font-semibold">{{ item.label }}</dt>
                <dd class="text-muted">{{ item.value }}</dd>
              </div>
            </div>
          </dl>
          <div class="relative h-[200px] overflow-hidden rounded-xl">
            <img :src="mapImg" alt="Map showing job location" class="h-full w-full object-cover object-bottom" />
          </div>
        </div>

        <form class="flex flex-col gap-6 rounded-[20px] bg-primary-light px-5 py-7" @submit.prevent="sendMessage">
          <h3 class="text-xl font-semibold">Send Us Message</h3>
          <label class="flex h-[50px] items-center gap-3 rounded-lg bg-white px-4">
            <img :src="userIcon" alt="" class="h-5 w-5" />
            <input v-model="message.name" required type="text" placeholder="Full name" class="w-full bg-transparent focus:outline-none" />
          </label>
          <label class="flex h-[50px] items-center gap-3 rounded-lg bg-white px-4">
            <img :src="mailIcon" alt="" class="h-5 w-5" />
            <input v-model="message.email" required type="email" placeholder="Email Address" class="w-full bg-transparent focus:outline-none" />
          </label>
          <label class="flex h-[50px] items-center gap-3 rounded-lg bg-white px-4">
            <img :src="phoneIcon" alt="" class="h-5 w-5" />
            <input v-model="message.phone" type="tel" placeholder="Phone Number" class="w-full bg-transparent focus:outline-none" />
          </label>
          <label class="flex items-start gap-3 rounded-lg bg-white px-4 py-4">
            <img :src="messageIcon" alt="" class="mt-0.5 h-5 w-5" />
            <textarea v-model="message.body" required rows="5" placeholder="Your Message" class="w-full resize-none bg-transparent focus:outline-none"></textarea>
          </label>
          <button type="submit" class="btn-primary h-10 self-start">Send Message</button>
        </form>
      </aside>
    </section>
  </template>
</template>
