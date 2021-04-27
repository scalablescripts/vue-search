import {createRouter, createWebHistory} from 'vue-router'
import Frontend from "../views/Frontend";
import Backend from "../views/Backend";

const routes = [
    {path: '/frontend', component: Frontend},
    {path: '/backend', component: Backend}
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
