<script setup>
import { computed, onMounted, reactive, ref, watch, watchEffect} from 'vue';
import { useTaskStore } from '../stores/task';
import TableComponent from '../components/TableComponent.vue';
import FilterComponent from '../components/FilterComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import FormComponent from '../components/FormComponent.vue';
import { useTaskForm } from '../composibles/useTaskForm';

    const taskStore = useTaskStore();
    const statusModal = ref(false);
    const {
        task, 
        isEdit, 
        validacionTitulo, 
        validacionCompletitud, 
        mostrarTarea, 
        guardaTarea, 
        actualizarTarea,
        checkLength,
        resetForm} = useTaskForm();

    onMounted(() => {
        taskStore.getTasks();
    })

    const filterOptions = reactive({
        status: "",
        priority: ""
    })

    const tareasVista = computed(() => { //Aquí manejamos la lógica del filtrado
        let tareasFiltradas = taskStore.tasks;

        if(filterOptions.status != ""){
            tareasFiltradas = tareasFiltradas.filter((task) => task.status === filterOptions.status);
        }
        if(filterOptions.priority != ""){
            tareasFiltradas = tareasFiltradas.filter((task) => task.priority === filterOptions.priority);
        }

        return tareasFiltradas;
    });

    const estadosFilter = computed(() => [...new Set(taskStore.tasks.map((task) => task.status))]);

    
    const prioridadFilter = computed(() =>{
        if(filterOptions.status != ""){
            return [...new Set(tareasVista.value.map((task) => task.priority))]
        }
    });
    
    watch(() => filterOptions.status, () => {
        filterOptions.priority = "";
    })


    const openModal = (objeto) => {
        mostrarTarea(objeto);
        statusModal.value = true;
    }

    const closeModal = () => {
        resetForm();
        statusModal.value = false;
        projectStore.submitError = null
    }

</script>

<template>
    <h2>Vista de Tareas</h2>
    <h3 v-if="taskStore.isLoadingList">Cargando...</h3>
    <h3 v-else-if="taskStore.loadError">{{ taskStore.loadError }}</h3>
    <div class="container-tasks" v-else>
        <div class="header">
            <FilterComponent :configFilter="{typeInput: 'select', name: 'filtro-estado'}" :arregloContenidos="estadosFilter" v-model="filterOptions.status" class="header__filtro"/>
            <FilterComponent :configFilter="{typeInput: 'select', name: 'filtro-prioridad'}" :arregloContenidos="prioridadFilter" v-model="filterOptions.priority" class="header__filtro"/>
            <ButtonComponent tipoCreacion="Tarea" @clickBtn="statusModal = true" class="header__button"/>
        </div>
        
        <TableComponent :objetos="tareasVista" @sendObject="openModal"/> 
    
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
                    <input type="text" name="titulo" id="titulo" v-model="task.title" @input="checkLength">
                    <p v-if="validacionTitulo" class="error-validation">{{ validacionTitulo }}</p>
    
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
    
                    <button type="submit" v-if="!isEdit" :disabled="taskStore.isSubmiting || validacionCompletitud || validacionTitulo.length != 0">{{taskStore.isSubmiting ? 'Creando...' : 'Crear'}}</button>
                    <button type="submit" v-else :disabled="taskStore.isSubmiting || validacionCompletitud || validacionTitulo.length != 0">{{taskStore.isSubmiting ? 'Editando...' : 'Editar'}}</button>
                    <p v-if="taskStore.submitError">Error inesperado, intentelo de nuevo: {{ taskStore.submitError }}</p>
                </form>
            </template>
    
            <template #footer class="footer-modal">
                <div class="footer-modal">
                    <button type="button" @click="closeModal">Salir</button>
                </div>
            </template>
        </FormComponent>
    </div>
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
    .error-validation{
        margin-top: 0px;
        margin-bottom: 0px;
        color: red;    
        font-weight: bold;   
    }
    .header {
        display: flex;
        justify-content: start;
        align-items: center;
        margin: 20px 0px;
        gap: 20px;
    }
    .header__button {
        margin-left: auto;
    }
</style>