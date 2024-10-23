<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-blue-800 text-white py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Footer Top -->
      <div class="flex flex-col md:flex-row justify-between items-center md:items-start">
        <!-- Logo and Description -->
        <div class="mb-6 md:mb-0">
          <h2 class="text-2xl font-bold mb-2">VueJobs</h2>
          <p class="text-sm">
            Your one-stop destination for finding Vue.js opportunities and
            resources to boost your career.
          </p>
        </div>

        <!-- Navigation Links -->
        <div class="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <h3 class="font-semibold mb-2">Company</h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:underline">About</a></li>
              <li><a href="#" class="hover:underline">Careers</a></li>
              <li><a href="#" class="hover:underline">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-2">Resources</h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:underline">Docs</a></li>
              <li><a href="#" class="hover:underline">Support</a></li>
              <li><a href="#" class="hover:underline">Community</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-2">Legal</h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:underline">Privacy Policy</a></li>
              <li><a href="#" class="hover:underline">Terms of Service</a></li>
              <li><a href="#" class="hover:underline">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-2">Connect</h3>
            <ul class="space-y-2">
              <li><a href="#" class="hover:underline">Twitter</a></li>
              <li><a href="#" class="hover:underline">LinkedIn</a></li>
              <li><a href="#" class="hover:underline">GitHub</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div
        class="mt-8 pt-8 border-t border-blue-700 flex flex-col md:flex-row justify-between items-center text-sm"
      >
        <p>&copy; {{ currentYear }} VueJobs. All rights reserved.</p>
        <div class="flex space-x-4 mt-4 md:mt-0">
          <a href="#" class="hover:text-blue-300">
            <i class="fab fa-facebook"></i>
          </a>
          <a href="#" class="hover:text-blue-300">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" class="hover:text-blue-300">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" class="hover:text-blue-300">
            <i class="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
