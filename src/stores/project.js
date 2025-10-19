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

    const saveProject = async (proyecto) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(proyecto),
            headers:{
                "Content-type": "application/json"
            }
        });
        
        const res = response.ok;
        if(res){
            console.log("Envio corecto", res);
        }
        else{
            console.log("Algo pasó en el envío");
        }
        
    }

    return{
        projects,
        getProyects,
        projectsFilter,
        saveProject
    }
});