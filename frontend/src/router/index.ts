import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/DefaultLayout.vue'),
      children: [
        { path: '', redirect: '/leaderboard' },
        { path: 'leaderboard', component: () => import('../views/LeaderboardView.vue') },
        { path: 'benchmarks', component: () => import('../views/BenchmarksView.vue') },
        { path: 'agents/:id', component: () => import('../views/AgentDetailView.vue') },
      ],
    },
  ],
})

export default router
