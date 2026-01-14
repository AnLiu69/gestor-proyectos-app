import { defineStore } from "pinia";
import { ref } from "vue";
import { cleanDataTasks, HEADERS } from "../utils/dataTasksCleaners";
import { axiosInstance } from "../api/axios";   
import { handleHttpError } from "../utils/httpErrorHandler";

export const useTaskStore = defineStore("task", () => {
    const tasks = ref([]);
    const isLoadingList = ref(false);
    const loadError = ref(null);
    const isSubmiting = ref(false);
    const submitError = ref(null);
    const pageSize = 10;
    const currentPage = ref(1);
    const isLastPage = ref(false);
    const headers = HEADERS;
    let url;


    const getTasks = async () => {
        isLastPage.value = false;
        loadError.value = null;
        isLoadingList.value = true;
        const params = new URLSearchParams();
        params.append("page", currentPage.value);
        params.append("limit", pageSize);
        
        try {
            const response = await axiosInstance.get("/tasks", {params});
            const data = response.data;
            if (data.length === pageSize) {
                isLastPage.value = false;
            }   
            else{
                isLastPage.value = true;
            }
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
            await axiosInstance.put(`/tasks/${id}`, task);
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
        currentPage,
        isLastPage,
        headers,
        getTasks,
        saveTask,
        updateTask
    }
});