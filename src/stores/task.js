import { defineStore } from "pinia";
import { ref } from "vue";
import { cleanDataTasks } from "../utils/dataTasksCleaners";

export const useTaskStore = defineStore("task", () => {
    const tasks = ref([]);
    const isLoadingList = ref(false);
    const loadError = ref(null);
    const isSubmiting = ref(false);
    const submitError = ref(null);

    const API_URL = "https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/tasks"

    const getTasks = async () => {
        loadError.value = null;
        isLoadingList.value = true;
        try {
            const response = await fetch(API_URL);

            if(!response.ok){
                throw new Error (`Error: ${response.status}, no se pudieron traer las tareas`);
            }

            const data = await response.json();
            tasks.value = cleanDataTasks(data);
        } catch (e) {
            loadError.value = e.message;
            if(e instanceof SyntaxError){
                console.log("Error de sintaxis en JSON:", e);
            }
            else{
                console.log("Error inesperado: ", e);
            }
        }
        finally{
            isLoadingList.value = false;
        }

    }

    const saveTask = async (task) => {
        isSubmiting.value = true;
        submitError.value = null;
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(task),
                headers:{
                    "Content-type": "application/json"
                }
            })
    
            if(!response.ok){
                throw new Error(`Error: ${response.status}, no se pudieron guardar las tareas`);
            }
        } catch (e) {
            submitError.value = e.message;
            console.log("Error al guardar las tareas: ", e);
        }
        finally{
            isSubmiting.value = false;
        }

    }

    const updateTask = async (task, id) => {
        isSubmiting.value = true;
        submitError.value = null;

        const API_UPDATE = API_URL + "/" + id;

        try {
            const response = await fetch(API_UPDATE, {
                method: 'PUT',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            })
    
            if(!response.ok){
                throw new Error(`Error: ${response.status}, no se pudieron actualizar las tareas`);
            }
        } 
        catch (e) {
            submitError.value = e.message;
            console.log("Error en la actulización: ", e);
        }
        finally{
            isSubmiting.value = false;
        }
        
    }

    return{
        tasks,
        isLoadingList,
        loadError,
        isSubmiting,
        submitError,
        getTasks,
        saveTask,
        updateTask
    }
});