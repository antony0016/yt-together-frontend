import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Songs from '../components/Songs.vue'
import Player from '../components/Player.vue'

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
]

const router = createRouter({
    routes: routes,
    history: createWebHistory(""),
})

export default router;
