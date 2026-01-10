import { defineStore } from "pinia";
import { ref } from "vue";
import { cleanDataProjects } from "../utils/dataProjectsCleaners";
import { axiosInstance } from "../api/axios";   
import { handleHttpError } from "../utils/httpErrorHandler";

export const useProjectStore = defineStore("project", () => {
    const projects = ref([]);
    const isLoadingList = ref(false);
    const loadError = ref(null);
    const isSubmiting = ref(false);
    const submitError = ref(null);
    const pageSize = 10;
    const currentPage = ref(1);
    const isLastPage = ref(false);
    let url;

    const getProyects = async () => { /* 74 registros en proyectos 08/01/2025 */
        isLastPage.value = false;
        isLoadingList.value = true;
        loadError.value = null;
        const params = new URLSearchParams();
        params.append("page", currentPage.value);
        params.append("limit", pageSize);

        try {
            const response = await axiosInstance.get("/projects", {params});
            const data = response.data;
            if (data.length === pageSize) {
                isLastPage.value = false;
            }
            else{
                isLastPage.value = true;
            }
            projects.value = cleanDataProjects(data);
        } 
        catch (e) {
            loadError.value = handleHttpError(e);
        }
        finally{
            isLoadingList.value = false;
        }
    }

    const saveProject = async (proyecto) => {
        isSubmiting.value = true;
        submitError.value = null;

        try {
            await axiosInstance.post("/projects", proyecto);
        }
        catch (e) {
            submitError.value = handleHttpError(e);
        }
        finally{
            isSubmiting.value = false;
        }

    }

    const updateProject = async (project, id) => {
        isSubmiting.value = true;
        submitError.value = null;

        try {
            await axiosInstance.put(`/projects/${id}`, project)
        } 
        catch (e) {
            submitError.value = handleHttpError(e);
        }
        finally{
            isSubmiting.value = false;
        }
    }

    return{
        projects,
        isLoadingList,
        loadError,
        isSubmiting,
        submitError,
        currentPage,
        isLastPage,
        getProyects,
        saveProject,
        updateProject
    }
});