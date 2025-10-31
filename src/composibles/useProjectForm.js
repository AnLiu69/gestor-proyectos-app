import { reactive, ref, watch, watchEffect } from "vue";
import { useProjectStore } from "../stores/project";

export const useProjectForm = () => {

    const projectStore = useProjectStore();
    const isEdit = ref(false);
    const idProject = ref("")
    const validacionNombre = ref("");
    const disableButton = ref(false);

    const proyectoNuevo = reactive({
        name: "",
        description: "",
        status: ""
    })

    watch(() => proyectoNuevo.name, (newValue) => {
        if(newValue.length >= 21){
            validacionNombre.value = "No puede exceder los 20 caractéres"
        }
        else{
            validacionNombre.value = "";
        }
    })

    watchEffect(() => {
        if(!proyectoNuevo.name || !proyectoNuevo.description || !proyectoNuevo.status){
            disableButton.value = true;
        }
        else{
            disableButton.value = false;
        }
    })

    const mostrarObjeto = (objeto) => {
        isEdit.value = true;
        proyectoNuevo.name = objeto.name;
        proyectoNuevo.description = objeto.description;
        proyectoNuevo.status = objeto.status;
        idProject.value = objeto.id;
    }

    const resetearForm = () => {
        isEdit.value = false;
        Object.assign(proyectoNuevo, {name: '', description: '', status: ''});
        idProject.value= '';

    }

    const guardaProyecto = async () => {
        await projectStore.saveProject(proyectoNuevo);
        Object.assign(proyectoNuevo, {name: '', description: '', status: ''});
        await projectStore.getProyects();
    };

    const modificarProyecto = async () => {
        await projectStore.updateProject(proyectoNuevo, idProject.value);
        await projectStore.getProyects();
    }

    return {
        proyectoNuevo,
        isEdit,
        idProject,
        validacionNombre,
        disableButton,
        resetearForm,
        modificarProyecto,
        guardaProyecto,
        mostrarObjeto
    };
};