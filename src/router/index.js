import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Console from '../views/Console.vue';
import DeviceRegistration from '../views/DeviceRegistration.vue';
import WarningManagement from '../views/WarningManagement.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      // 默认子路由指向控制台（可选）
      { path: '', name: 'Console', component: Console },
      { path: 'console', name: 'Console', component: Console },
      { path: 'device-registration', name: 'DeviceRegistration', component: DeviceRegistration },
      { path: 'warning-management', name: 'WarningManagement', component: WarningManagement }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;