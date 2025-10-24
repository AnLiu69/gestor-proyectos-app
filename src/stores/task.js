import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStore = defineStore("task", () => {
    const tasks = ref([]);
    const tasksFilter = ref([]);

    const API_URL = "https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/tasks"

    const STATUS_VALUES = [
        "pendiente",
        "en progreso",
        "hecho"
    ];

    const PRIORITY_VALUES = [
        "alta",
        "media",
        "baja"
    ];

    const getTasks = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();

        tasks.value = data.filter((task) => {
            return task.projectId? true : false
        });

        tasksFilter.value = tasks.value.map((task) => ({
            id: task.id,
            title: task.title,
            priority: task.priority,
            status: task.status,
            id_project: task.projectId
        }));

        tasksFilter.value = tasksFilter.value.filter((task) => Object.values(task).every((value) => value != "")); //every verifica que todos los elementos del array cumplan una condicion

        tasksFilter.value = tasksFilter.value.filter((task) => STATUS_VALUES.includes(task.status)); //includes verifica que un caracter o un elemento pertenezca a una cadena o a un array

        tasksFilter.value = tasksFilter.value.filter((task) => PRIORITY_VALUES.includes(task.priority));
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

    const updateTask = async (task, id) => {
        const API_UPDATE = API_URL + "/" + id;
        
        const response = await fetch(API_UPDATE, {
            method: 'PUT',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })

        if(response.ok){
            console.log("Se actualizo correctamente la tarea con el id:", task.id)
        }
        else{
            console.log("Algo salió mal")
        }
    }

    return{
        tasks,
        getTasks,
        tasksFilter,
        saveTask,
        updateTask
    }
});