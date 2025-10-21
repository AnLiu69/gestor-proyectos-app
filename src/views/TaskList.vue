<script setup>
import { computed, onMounted, reactive, ref, watch} from 'vue';
import { useTaskStore } from '../stores/task';
import TableComponent from '../components/TableComponent.vue';
import FilterComponent from '../components/FilterComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import FormComponent from '../components/FormComponent.vue';

    const taskStore = useTaskStore();
    const statusModal = ref(false);
    const isEdit = ref(false);
    const idTask = ref("");

    const task = reactive({
        title: "",
        status: "",
        priority: ""
    })

    onMounted(() => {
        taskStore.getTasks();
    })

    const filterOptions = reactive({
        status: "",
        priority: ""
    })

    const tareasVista = computed(() => { //Aquí manejamos la lógica del filtrado
        let tareasFiltradas = taskStore.tasksFilter;

        if(filterOptions.status != ""){
            tareasFiltradas = tareasFiltradas.filter((task) => task.status === filterOptions.status);
        }
        if(filterOptions.priority != ""){
            tareasFiltradas = tareasFiltradas.filter((task) => task.priority === filterOptions.priority);
        }

        return tareasFiltradas;
    });

    const estadosFilter = computed(() => [...new Set(taskStore.tasksFilter.map((task) => task.status))]);

    
    const prioridadFilter = computed(() =>{
        if(filterOptions.status != ""){
            return [...new Set(tareasVista.value.map((task) => task.priority))]
        }
    });
    
    watch(() => filterOptions.status, () => {
        filterOptions.priority = "";
    })

    const guardaTarea = async () => {
        await taskStore.saveTask(task);
        await taskStore.getTasks();
    }


    const mostrarTarea = (objeto) => {
        isEdit.value = true;
        task.title = objeto.title;
        task.status = objeto.status;
        task.priority = objeto.priority;
        idTask.value = objeto.id;
        statusModal.value = true;
    }

    const actualizarTarea = async () =>{
        await taskStore.updateTask(task, idTask.value);
        await taskStore.getTasks();
    }


</script>

<template>
    <h2>Vista de Tareas</h2>
    <FilterComponent :configFilter="{typeInput: 'select', name: 'filtro-estado'}" :arregloContenidos="estadosFilter" v-model="filterOptions.status"/>
    <FilterComponent :configFilter="{typeInput: 'select', name: 'filtro-prioridad'}" :arregloContenidos="prioridadFilter" v-model="filterOptions.priority"/>
    <TableComponent :objetos="tareasVista" @sendObject="mostrarTarea"/>

    <ButtonComponent tipoCreacion="Tarea" @clickBtn="statusModal = true"/>

    <FormComponent v-if="statusModal">
        <template #header>
            <div class="header-modal">
                <h3 v-if="!isEdit">Crea una nueva Tarea</h3>
                <h3 v-else>Edita la Tarea</h3>
            </div>
        </template>

        <template #body>
            <form class="form-proyect" @submit.prevent="isEdit ? actualizarTarea() : guardaTarea()"> 
                <label for="titulo">Título de la tarea</label>
                <input type="text" name="titulo" id="titulo" v-model="task.title">

                <label for="status">Estado de la tarea</label>
                <select name="status" id="status" v-model="task.status">
                    <option value="">Selecciona el estado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En progreso</option>
                    <option value="hecho">Hecho</option>
                </select>

                <label for="prioridad">Prioridad de la tarea</label>
                <select name="prioridad" id="prioridad" v-model="task.priority">
                    <option value="">Selecciona la prioridad</option>
                    <option value="alta">Alta</option>
                    <option value="media">Media</option>
                    <option value="baja">Baja</option>
                </select>

                <button type="submit" v-if="!isEdit">Crear</button>
                <button type="submit" v-else>Editar</button>
            </form>
        </template>

        <template #footer class="footer-modal">
            <div class="footer-modal">
                <button type="button" @click="statusModal = false; isEdit = false; Object.assign(task, {title: '', status: '', priority: ''}); idTask = ''">Salir</button>
            </div>
        </template>
    </FormComponent>
</template>

<style scoped>
    .form-proyect{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
    button{
        width: 80px;
        height: 60px;
        background-color: yellow;
    }
    .footer-modal{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
        margin-top: 30px;
    }
    .header-modal{
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
    }
</style>