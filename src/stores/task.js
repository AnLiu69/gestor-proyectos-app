import { defineStore } from "pinia";
import { ref } from "vue";
import { cleanDataTasks } from "../utils/dataTasksCleaners";
import { axiosInstance } from "../api/axios";   
import { handleHttpError } from "../utils/httpErrorHandler";

export const useTaskStore = defineStore("task", () => {
    const tasks = ref([]);
    const isLoadingList = ref(false);
    const loadError = ref(null);
    const isSubmiting = ref(false);
    const submitError = ref(null);


    const getTasks = async () => {
        loadError.value = null;
        isLoadingList.value = true;
        try {
            const response = await axiosInstance.get("/tasks");
            const data = response.data;
            tasks.value = cleanDataTasks(data);
        } catch (e) {
            loadError.value = handleHttpError(e);
        }
        finally{
            isLoadingList.value = false;
        }

    }

    const saveTask = async (task) => {
        isSubmiting.value = true;
        submitError.value = null;
        try {
            await axiosInstance.post("/tasks", task);
        } 
        catch (e) {
            submitError.value = handleHttpError(e);
        }
        finally{
            isSubmiting.value = false;
        }

    }

    const updateTask = async (task, id) => {
        isSubmiting.value = true;
        submitError.value = null;

        try {
            await fetch(`/tasks/${id}`, task);
        } 
        catch (e) {
            submitError.value = handleHttpError(e);
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