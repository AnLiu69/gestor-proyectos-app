import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectStore = defineStore("project", () => {
    const projects = ref([]);
    const projectsFilter = ref([]);

    const API_URL = "https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/projects"

    const getProyects = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();

        projects.value = data.filter((project) => (project.status === "activo") || (project.status ===  "inactivo"));

        projectsFilter.value = projects.value.map((project) => ({id: project.id, name: project.name, description: project.description, status: project.status}));
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

    const updateProject = async (project, id) => {
        let API_UPDATE = API_URL + "/" + id;
        const response = await fetch(API_UPDATE, {
            method: 'PUT',
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(project)
        })

        if(response.ok){
            console.log("Proyecto actualizado");
        }
        else{
            console.log("Algo salió mal");
        }
    }

    return{
        projects,
        getProyects,
        projectsFilter,
        saveProject,
        updateProject
    }
});