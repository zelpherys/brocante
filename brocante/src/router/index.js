import { createRouter, createWebHistory } from "vue-router";
import Homepage from "@/pages/HomePage.vue";
import CreateUser from "@/pages/CreateUser.vue";
import ConnexionUser from "@/pages/ConnexionUser.vue";
import BoardUser from "@/pages/BoardUser.vue";
import ArticleDetail from "@/pages/ArticleDetail.vue"; // Importez la page ArticleDetail

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Homepage },
    { path: "/create", component: CreateUser },
    { path: "/connexion", component: ConnexionUser },
    { path: "/board", component: BoardUser },
    { path: "/article/:id", component: ArticleDetail, name: "ArticleDetail" }, // Ajoutez cette route
  ],
});

export default router;
