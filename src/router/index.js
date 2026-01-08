import { createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: "/",
        name: "projectList",
        component: () => import("../views/ProjectList.vue")
    },
    {
        path: "/tasks",
        name: "taskList",
        component: () => import("../views/TaskList.vue")
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;