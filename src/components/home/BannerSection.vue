<script setup>
import { RouterLink } from 'vue-router';
import img1 from '@/assets/img/figma/info-2.png';
import img2 from '@/assets/img/figma/info-3.png';
import img3 from '@/assets/img/figma/about-team.png';
import img4 from '@/assets/img/figma/blog-1.png';
import img5 from '@/assets/img/figma/blog-2.png';

// Collage positions taken from the Figma "Banner > Imgs" frame (808×420, right-aligned in the banner).
const collage = [
  { src: img1, style: 'left: 0; top: 60px; width: 335px; height: 360px; z-index: 1' },
  { src: img2, style: 'left: 79px; top: 17px; width: 413px; height: 403px; z-index: 2' },
  { src: img4, style: 'left: 471px; top: 22px; width: 262px; height: 398px; z-index: 2' },
  { src: img5, style: 'left: 571px; top: 61px; width: 237px; height: 358px; z-index: 1' },
  { src: img3, style: 'left: 228px; top: 0; width: 424px; height: 420px; z-index: 3' },
];
</script>

<template>
  <section class="pt-[60px] pb-[120px]">
    <div class="container-page">
      <div class="relative flex min-h-[420px] items-center overflow-hidden rounded-[20px] bg-black">
        <div class="relative z-10 flex max-w-[600px] flex-col gap-10 p-8 md:pl-[65px]">
          <h2 class="text-3xl md:text-[50px] font-bold leading-tight text-white">Create A Better Future For Yourself</h2>
          <p class="text-base text-white">
            At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum id scelerisque rhoncus.
          </p>
          <RouterLink to="/jobs" class="btn-primary h-10 self-start">Search Job</RouterLink>
        </div>

        <div class="pointer-events-none absolute right-0 top-0 hidden h-[420px] w-[808px] xl:block">
          <img
            v-for="(img, i) in collage"
            :key="i"
            :src="img.src"
            alt=""
            class="absolute rounded-t-[20px] object-cover"
            :style="img.style"
          />
        </div>
      </div>
    </div>
  </section>
</template>
