import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStore = defineStore("task", () => {
    const tasks = ref([]);
    const tasksFilter = ref([]);

    const API_URL = "https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/tasks"

    const getTasks = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();

        tasks.value = data;

        tasksFilter.value = tasks.value.filter((task) => {
            return task.project_id ? true : false
        });
    }

    return{
        tasks,
        getTasks,
        tasksFilter
    }
});