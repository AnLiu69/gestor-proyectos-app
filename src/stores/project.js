import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectStore = defineStore("project", () => {
    const projects = ref([]);
    const projectsFilter = ref([]);

    const API_URL = "https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/projects"

    const getProyects = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();

        projects.value = data;

        projectsFilter.value = projects.value.filter((project) => {
            return (project.status === "activo") || (project.status ===  "inactivo")
        });
    }

    return{
        projects,
        getProyects,
        projectsFilter
    }
});