import { defineStore } from "pinia";
import { ref } from "vue";
import { cleanDataProjects } from "../utils/dataProjectsCleaners";

export const useProjectStore = defineStore("project", () => {
    const projects = ref([]);
    const isLoadingList = ref(false);
    const loadError = ref(null);
    const isSubmiting = ref(false);
    const submitError = ref(null);

    const API_URL = "https://681507e7225ff1af162aeb7e.mockapi.io/api/v1/projects"

    const getProyects = async () => {
        isLoadingList.value = true;
        loadError.value = null;
        try {
            const response = await fetch(API_URL);

            if(!response.ok){
                throw new Error(`Error: ${response.status}, no se pudieron cargar las tareas`);
            }

            const data = await response.json();
            projects.value = cleanDataProjects(data);

        } 
        catch (e) {
            loadError.value = e.message;
            if(e instanceof SintaxError){
                console.log("Error de sintaxis en JSON:", e);
            }
            else{
                console.log("Error en peticion:", e);
            }
        }
        finally{
            isLoadingList.value = false;
        }
    }

    const saveProject = async (proyecto) => {
        isSubmiting.value = true;
        submitError.value = null;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(proyecto),
                headers:{
                    "Content-type": "application/json"
                }
            });
            
            if(!response.ok){
                throw new Error(`Error: ${response.status}, no guardaron el proyecto`);
            }
        }
        catch (e) {
            submitError.value = e.message;
            console.log("Error al guardar: ", e);
        }
        finally{
            isSubmiting.value = false;
        }

    }

    const updateProject = async (project, id) => {
        isSubmiting.value = true;
        submitError.value = null;

        let API_UPDATE = API_URL + "/" + id;

        try {
            const response = await fetch(API_UPDATE, {
                method: 'PUT',
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify(project)
            })
    
            if(!response.ok){
                throw new Error(`Error: ${response.status}, no se pudo actualizar la tarea`);
                
            }
        } 
        catch (e) {
            submitError.value = e.message;
            console.log("Error al editar: ", e)
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
        getProyects,
        saveProject,
        updateProject
    }
});