import { defineStore } from "pinia";
import { ref } from "vue";
import TaskList from "../views/TaskList.vue";

export const useTaskStore = defineStore("task", () => {
    const tasks = ref([]);
    const tasksFilter = ref([]);

    const API_URL = "https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/tasks"

    const getTasks = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();

        tasks.value = data;

        tasksFilter.value = tasks.value.filter((task) => {
            return task.projectId? true : false
        });
    }

    const saveTask = async (task) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(task),
            headers:{
                "Content-type": "application/json"
            }
        })

        if(response.ok){
            console.log("Guardado correctamente");
        }
        else{
            console.log("Algo ha fallado");
        }
    }

    return{
        tasks,
        getTasks,
        tasksFilter,
        saveTask
    }
});