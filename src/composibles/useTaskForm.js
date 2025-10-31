import { useTaskStore } from "../stores/task";
import { reactive, ref, watchEffect } from "vue";

export const useTaskForm = () => {
    const taskStore = useTaskStore();
    const isEdit = ref(false);
    const idTask = ref("");
    const validacionCompletitud = ref(false);
    const validacionTitulo = ref("");

    const task = reactive({
        title: "",
        status: "",
        priority: ""
    })

    watchEffect(() => {
        if(!task.title || !task.status || !task.priority){
            validacionCompletitud.value = true;
        }
        else{
            validacionCompletitud.value = false;
        }
    })

    const guardaTarea = async () => {
        await taskStore.saveTask(task);
        Object.assign(task, {title: "", status: "", priority: ""});
        await taskStore.getTasks();
    }

    const mostrarTarea = (objeto) => {
        isEdit.value = true;
        task.title = objeto.title;
        task.status = objeto.status;
        task.priority = objeto.priority;
        idTask.value = objeto.id;
    }

    const actualizarTarea = async () =>{
        await taskStore.updateTask(task, idTask.value);
        await taskStore.getTasks();
    }

    const checkLength = () =>{
        if(task.title.length > 20){
            validacionTitulo.value = "No superar los 20 caractéres";
            validacionCompletitud.value = false;
        }
        else{
            validacionTitulo.value = "";
        }
    }

    const resetForm = () => {{
        isEdit.value = false;
        Object.assign(task, {title: '', status: '', priority: ''});
        idTask.value = '';
    }}

    return {
        task,
        isEdit,
        validacionCompletitud,
        validacionTitulo,
        guardaTarea,
        mostrarTarea,
        actualizarTarea,
        checkLength,
        resetForm
    };
};