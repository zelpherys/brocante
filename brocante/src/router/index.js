import { createRouter, createWebHistory } from "vue-router";
import Homepage from "@/pages/HomePage.vue";
import CreateUser from "@/pages/CreateUser.vue"

 const router = createRouter ({

    history : createWebHistory() ,
    routes : [
        {path: '/' , component:Homepage } ,
        {path: '/create', component:CreateUser}

    ]
 })


export default router;