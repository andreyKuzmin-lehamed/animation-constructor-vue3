import { createRouter, createWebHistory } from "vue-router";
import RigSelectView from "../views/RigSelectView.vue";
import RigEditView from "../views/RigEditView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/rigs",
      name: "RigSelect",
      component: RigSelectView,
    },
    {
      path: "/rig/:id",
      name: "RigEdit",
      component: RigEditView,
    },
  ],
});

export default router;
