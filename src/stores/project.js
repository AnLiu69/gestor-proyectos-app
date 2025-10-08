import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectStore = defineStore("project", () => {
    const projects = ref([]);

    const API_URL = "https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/projects"

    const getProyects = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();

        projects.value = data;
    }

    return{
        projects,
        getProyects
    }
});