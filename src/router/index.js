import { createRouter, createWebHistory} from "vue-router";
import ProjectList from "../views/ProjectList.vue"
import TaskList from "../views/TaskList.vue"

const routes = [
    {
        path: "/",
        name: "projectList",
        component: ProjectList
    },
    {
        path: "/tasks",
        name: "taskList",
        component: TaskList
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;