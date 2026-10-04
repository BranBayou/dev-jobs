<script setup>
import SectionHeading from '@/components/SectionHeading.vue';

const testimonials = [
  {
    title: 'Amazing services',
    quote: 'Metus faucibus sed turpis lectus feugiat tincidunt. Rhoncus sed tristique in dolor. Mus etiam et vestibulum venenatis',
    name: 'Marco Kihn',
    role: 'Happy Client',
  },
  {
    title: 'Everything simple',
    quote: 'Mus etiam et vestibulum venenatis viverra ut. Elit morbi bibendum ullamcorper augue faucibus',
    name: 'Kristin Hester',
    role: 'Happy Client',
  },
  {
    title: 'Awesome, thank you!',
    quote: 'Rhoncus sed tristique in dolor. Mus etiam et vestibulum venenatis viverra ut. Elit morbi bibendum ullamcorper augue faucibus. Nulla et tempor montes',
    name: 'Zion Cisneros',
    role: 'Happy Client',
  },
];

const initials = (name) => name.split(' ').map((part) => part[0]).join('');
</script>

<template>
  <section class="bg-primary-light py-[60px] md:py-[120px]">
    <div class="container-page flex flex-col gap-[60px]">
      <SectionHeading
        center
        title="Testimonials from Our Customers"
        subtitle="At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id"
      />
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <figure v-for="item in testimonials" :key="item.name" class="flex flex-col gap-6 rounded-[20px] bg-white p-8">
          <div class="flex gap-1 text-[#feb836]">
            <i v-for="n in 5" :key="n" class="pi pi-star-fill"></i>
          </div>
          <h3 class="text-xl font-semibold">{{ item.title }}</h3>
          <blockquote class="flex-1 text-base italic leading-6">{{ item.quote }}</blockquote>
          <figcaption class="flex items-center gap-4">
            <span class="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-primary text-base font-semibold text-white">{{ initials(item.name) }}</span>
            <div class="flex-1">
              <p class="text-lg font-semibold">{{ item.name }}</p>
              <p class="text-sm text-muted">{{ item.role }}</p>
            </div>
            <i class="pi pi-comments text-3xl text-primary/40"></i>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
