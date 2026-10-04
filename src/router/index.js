import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JobsView from "@/views/JobsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import JobView from "@/views/JobView.vue";
import EditJobView from "@/views/EditJobView.vue";
import AddJob from "@/views/AddJob.vue";
import AboutView from "@/views/AboutView.vue";
import ContactView from "@/views/ContactView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior: (to, from, savedPosition) => savedPosition || { top: 0 },
    routes: [
        {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/jobs',
        name: 'jobs',
        component: JobsView,
    },
    {
        path: '/jobs/add',
        name: 'add-job',
        component: AddJob,
        meta: { requiresAuth: true },
    },
    {
        path: '/jobs/:id',
        name: 'job',
        component: JobView,
    },
    {
        path: '/jobs/edit/:id',
        name: 'edit-job',
        component: EditJobView,
        meta: { requiresAuth: true },
    },
    {
        path: '/about',
        name: 'about',
        component: AboutView,
    },
    {
        path: '/contact',
        name: 'contact',
        component: ContactView,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { guestOnly: true },
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
        meta: { guestOnly: true },
    },
    {
        path: '/:catchAll(.*)',
        name: 'not-found',
        component: NotFoundView,
    },
    ],
});

router.beforeEach((to) => {
    const auth = useAuthStore();
    if (to.meta.requiresAuth && !auth.isLoggedIn) {
        return { path: '/login', query: { redirect: to.fullPath } };
    }
    if (to.meta.guestOnly && auth.isLoggedIn) {
        return '/';
    }
});

export default router;
