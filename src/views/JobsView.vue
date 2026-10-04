<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import PageHero from '@/components/PageHero.vue';
import JobCard from '@/components/JobCard.vue';
import SectionHeading from '@/components/SectionHeading.vue';
import hiringImg from '@/assets/img/figma/info-2.png';
import { jobs, categories, jobTypes, experienceLevels, locations, companies } from '@/data/jobs';

const PAGE_SIZE = 6;
const MAX_SALARY = 100000;

const route = useRoute();

const filters = reactive({
  q: route.query.q || '',
  location: route.query.location || '',
  categories: route.query.category ? [route.query.category] : [],
  types: [],
  experience: [],
  datePosted: 'all',
  maxSalary: MAX_SALARY,
  tag: '',
});
const appliedMaxSalary = ref(MAX_SALARY);
const sortBy = ref('latest');
const page = ref(1);

const datePostedOptions = [
  { value: 'all', label: 'All', minutes: Infinity },
  { value: 'hour', label: 'Last Hour', minutes: 60 },
  { value: 'day', label: 'Last 24 Hours', minutes: 60 * 24 },
  { value: 'week', label: 'Last 7 Days', minutes: 60 * 24 * 7 },
  { value: 'month', label: 'Last 30 Days', minutes: 60 * 24 * 30 },
];

const tags = ['engineering', 'design', 'ui/ux', 'marketing', 'management', 'soft', 'construction'];

const ageInMinutes = (job) => (Date.now() - new Date(job.postedAt).getTime()) / 60000;
const countBy = (key, value) => jobs.filter((job) => job[key] === value).length;
const countByDate = (minutes) => jobs.filter((job) => ageInMinutes(job) <= minutes).length;

const filteredJobs = computed(() => {
  const q = filters.q.trim().toLowerCase();
  const maxAge = datePostedOptions.find((o) => o.value === filters.datePosted).minutes;

  const result = jobs.filter((job) =>
    (!q || job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q)) &&
    (!filters.location || job.location === filters.location) &&
    (!filters.categories.length || filters.categories.includes(job.category)) &&
    (!filters.types.length || filters.types.includes(job.type)) &&
    (!filters.experience.length || filters.experience.includes(job.experience)) &&
    ageInMinutes(job) <= maxAge &&
    job.salaryMin <= appliedMaxSalary.value &&
    (!filters.tag || job.tags.includes(filters.tag)),
  );

  const sorters = {
    latest: (a, b) => new Date(b.postedAt) - new Date(a.postedAt),
    oldest: (a, b) => new Date(a.postedAt) - new Date(b.postedAt),
    salary: (a, b) => b.salaryMax - a.salaryMax,
  };
  return result.sort(sorters[sortBy.value]);
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredJobs.value.length / PAGE_SIZE)));
const pagedJobs = computed(() => filteredJobs.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE));
const rangeStart = computed(() => (filteredJobs.value.length ? (page.value - 1) * PAGE_SIZE + 1 : 0));
const rangeEnd = computed(() => Math.min(page.value * PAGE_SIZE, filteredJobs.value.length));

// Reset to the first page whenever the result set changes.
watch([filters, appliedMaxSalary, sortBy], () => (page.value = 1), { deep: true });

// Keep filters in sync when arriving from the home page search or category links.
watch(
  () => route.query,
  (query) => {
    filters.q = query.q || '';
    filters.location = query.location || '';
    filters.categories = query.category ? [query.category] : [];
  },
);

const goToPage = (n) => {
  page.value = n;
  window.scrollTo({ top: 300, behavior: 'smooth' });
};

const toggleTag = (tag) => (filters.tag = filters.tag === tag ? '' : tag);
</script>

<template>
  <PageHero title="Jobs" />

  <section class="py-[60px]">
    <div class="container-page grid grid-cols-1 gap-6 lg:grid-cols-[314px_1fr]">
      <!-- Sidebar -->
      <aside class="flex flex-col gap-6">
        <div class="flex flex-col gap-6 rounded-[20px] bg-primary-light px-5 py-10">
          <div class="flex flex-col gap-5">
            <label for="job-search" class="text-lg font-semibold">Search by Job Title</label>
            <div class="flex h-10 items-center gap-3 rounded-lg border border-black/10 bg-white px-3">
              <i class="pi pi-search text-muted"></i>
              <input id="job-search" v-model="filters.q" type="text" placeholder="Job title or company" class="w-full bg-transparent text-sm focus:outline-none" />
            </div>
          </div>

          <div class="flex flex-col gap-5">
            <label for="job-location" class="text-lg font-semibold">Location</label>
            <div class="flex h-10 items-center gap-3 rounded-lg border border-black/10 bg-white px-3">
              <i class="pi pi-map-marker text-muted"></i>
              <select id="job-location" v-model="filters.location" class="w-full bg-transparent text-sm text-muted focus:outline-none">
                <option value="">Choose city</option>
                <option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
              </select>
            </div>
          </div>

          <fieldset class="flex flex-col gap-3">
            <legend class="mb-5 text-lg font-semibold">Category</legend>
            <label v-for="category in categories" :key="category.name" class="flex items-center justify-between gap-3">
              <span class="flex items-center gap-2">
                <input v-model="filters.categories" type="checkbox" :value="category.name" class="h-4 w-4 accent-primary" />
                {{ category.name }}
              </span>
              <span class="rounded bg-white px-2 text-sm text-muted">{{ countBy('category', category.name) }}</span>
            </label>
          </fieldset>

          <fieldset class="flex flex-col gap-3">
            <legend class="mb-5 text-lg font-semibold">Job Type</legend>
            <label v-for="type in jobTypes" :key="type" class="flex items-center justify-between gap-3">
              <span class="flex items-center gap-2">
                <input v-model="filters.types" type="checkbox" :value="type" class="h-4 w-4 accent-primary" />
                {{ type }}
              </span>
              <span class="rounded bg-white px-2 text-sm text-muted">{{ countBy('type', type) }}</span>
            </label>
          </fieldset>

          <fieldset class="flex flex-col gap-3">
            <legend class="mb-5 text-lg font-semibold">Experience Level</legend>
            <label v-for="level in experienceLevels" :key="level" class="flex items-center justify-between gap-3">
              <span class="flex items-center gap-2">
                <input v-model="filters.experience" type="checkbox" :value="level" class="h-4 w-4 accent-primary" />
                {{ level }}
              </span>
              <span class="rounded bg-white px-2 text-sm text-muted">{{ countBy('experience', level) }}</span>
            </label>
          </fieldset>

          <fieldset class="flex flex-col gap-3">
            <legend class="mb-5 text-lg font-semibold">Date Posted</legend>
            <label v-for="option in datePostedOptions" :key="option.value" class="flex items-center justify-between gap-3">
              <span class="flex items-center gap-2">
                <input v-model="filters.datePosted" type="radio" name="date-posted" :value="option.value" class="h-4 w-4 accent-primary" />
                {{ option.label }}
              </span>
              <span class="rounded bg-white px-2 text-sm text-muted">{{ countByDate(option.minutes) }}</span>
            </label>
          </fieldset>

          <div class="flex flex-col gap-5">
            <label for="salary" class="text-lg font-semibold">Salary</label>
            <input id="salary" v-model.number="filters.maxSalary" type="range" min="0" :max="MAX_SALARY" step="1000" class="accent-primary" />
            <div class="flex items-center justify-between">
              <span>Salary: $0 - ${{ filters.maxSalary.toLocaleString() }}</span>
              <button type="button" class="rounded-lg bg-primary px-4 py-1 text-sm font-semibold text-white" @click="appliedMaxSalary = filters.maxSalary">Apply</button>
            </div>
          </div>

          <div class="flex flex-col gap-5">
            <h3 class="text-lg font-semibold">Tags</h3>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="tag in tags"
                :key="tag"
                type="button"
                :class="[filters.tag === tag ? 'bg-primary text-white' : 'bg-primary-soft text-primary', 'rounded-lg px-2 py-1.5 text-sm']"
                @click="toggleTag(tag)"
              >{{ tag }}</button>
            </div>
          </div>
        </div>

        <!-- We are hiring -->
        <div class="relative h-[460px] overflow-hidden rounded-[20px]">
          <img :src="hiringImg" alt="" class="absolute inset-0 h-full w-full object-cover" />
          <div class="absolute inset-0 bg-black/50"></div>
          <div class="relative flex flex-col gap-4 p-7 text-white">
            <p class="text-3xl font-semibold">WE ARE HIRING</p>
            <p class="text-xl">Apply Today!</p>
          </div>
        </div>
      </aside>

      <!-- Job cards -->
      <div class="flex flex-col gap-10">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <p class="text-base text-muted">Showing {{ rangeStart }}-{{ rangeEnd }} of {{ filteredJobs.length }} results</p>
          <select v-model="sortBy" class="h-10 rounded-lg border border-black/10 bg-white px-3 text-base focus:outline-none" aria-label="Sort jobs">
            <option value="latest">Sort by latest</option>
            <option value="oldest">Sort by oldest</option>
            <option value="salary">Sort by salary</option>
          </select>
        </div>

        <div v-if="pagedJobs.length" class="flex flex-col gap-6">
          <JobCard v-for="job in pagedJobs" :key="job.id" :job="job" />
        </div>
        <p v-else class="rounded-[20px] bg-primary-light p-10 text-center text-muted">No jobs match your filters.</p>

        <nav v-if="totalPages > 1" class="flex items-center justify-center gap-6" aria-label="Pagination">
          <button
            v-for="n in totalPages"
            :key="n"
            type="button"
            :class="[n === page ? 'bg-primary text-white' : 'border border-primary text-primary', 'h-10 w-10 rounded-lg font-semibold']"
            @click="goToPage(n)"
          >{{ n }}</button>
          <button
            v-if="page < totalPages"
            type="button"
            class="flex h-10 items-center gap-1 rounded-lg border border-primary px-4 font-semibold text-primary"
            @click="goToPage(page + 1)"
          >Next <i class="pi pi-chevron-right text-sm"></i></button>
        </nav>
      </div>
    </div>
  </section>

  <!-- Top Company -->
  <section class="bg-primary-light py-[60px]">
    <div class="container-page flex flex-col gap-[60px]">
      <SectionHeading center title="Top Company" subtitle="At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum" />
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="company in companies" :key="company.name" class="flex h-[360px] flex-col items-center justify-center gap-6 rounded-[20px] bg-white px-8 text-center shadow-card">
          <img :src="company.logo" alt="" class="h-[60px] w-[60px]" />
          <h3 class="text-2xl font-semibold">{{ company.name }}</h3>
          <p class="text-base text-muted">{{ company.description }}</p>
          <span class="rounded-lg bg-primary-soft px-3 py-2 text-primary">{{ company.openJobs }} open jobs</span>
        </div>
      </div>
    </div>
  </section>
</template>
