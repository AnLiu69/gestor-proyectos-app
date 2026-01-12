<script setup>
import { computed, onMounted, reactive, ref, watch, watchEffect} from 'vue';
import { useTaskStore } from '../stores/task';
import TableComponent from '../components/TableComponent.vue';
import FilterComponent from '../components/FilterComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import FormComponent from '../components/FormComponent.vue';
import { useTaskForm } from '../composibles/useTaskForm';
import ArrowComponent from '../components/ArrowComponent.vue';

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
        taskStore.submitError = null;
    }

    const activePagination = (direction) => {
        if(direction === 'left' && taskStore.currentPage > 1){
            taskStore.currentPage--;
            taskStore.getTasks();
        } else if(direction === 'right'){
            taskStore.currentPage++;
            taskStore.getTasks();
        }
    }
    

</script>

<template>
    <h2 class="view-title">Vista de Tareas</h2>
    <h3 v-if="taskStore.isLoadingList">Cargando...</h3>
    <h3 v-else-if="taskStore.loadError">{{ taskStore.loadError }}</h3>
    <div class="container-tasks" v-else>
        <div class="header-view">
            <FilterComponent :configFilter="{typeInput: 'select', name: 'filtro-estado'}" :arregloContenidos="estadosFilter" v-model="filterOptions.status" class="header-view__filtro"/>
            <FilterComponent :configFilter="{typeInput: 'select', name: 'filtro-prioridad'}" :arregloContenidos="prioridadFilter" v-model="filterOptions.priority" class="header-view__filtro"/>
            <ButtonComponent tipoCreacion="Tarea" @clickBtn="statusModal = true" class="header-view__button"/>
        </div>
        
        <TableComponent :objetos="tareasVista" @sendObject="openModal"/> 
    
        <FormComponent v-if="statusModal" @close="closeModal">
            <template #header>
                <div class="modal-header">
                    <h3 v-if="!isEdit">Crea una nueva Tarea</h3>
                    <h3 v-else>Edita la Tarea</h3>
                </div>
            </template>
    
            <template #body>
                <form class="modal-form" @submit.prevent="isEdit ? actualizarTarea() : guardaTarea()"> 
                    <label for="titulo" class="modal-form__label">Título de la tarea</label>
                    <input type="text" name="titulo" id="titulo" v-model="task.title" @input="checkLength" class="modal-form__input">
                    <p v-if="validacionTitulo" class="modal-form__error">{{ validacionTitulo }}</p>
    
                    <label for="status" class="modal-form__label">Estado de la tarea</label>
                    <select name="status" id="status" v-model="task.status" class="modal-form__select">
                        <option value="">Selecciona el estado</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="en progreso">En progreso</option>
                        <option value="hecho">Hecho</option>
                    </select>
    
                    <label for="prioridad" class="modal-form__label">Prioridad de la tarea</label>
                    <select name="prioridad" id="prioridad" v-model="task.priority" class="modal-form__select">
                        <option value="">Selecciona la prioridad</option>
                        <option value="alta">Alta</option>
                        <option value="media">Media</option>
                        <option value="baja">Baja</option>
                    </select>
                    
                    <div class="modal-form__footer">
                        <button type="submit" v-if="!isEdit" :disabled="taskStore.isSubmiting || validacionCompletitud || validacionTitulo.length != 0" class="modal-form__btn">{{taskStore.isSubmiting ? 'Creando...' : 'Crear'}}</button>
                        <button type="submit" v-else :disabled="taskStore.isSubmiting || validacionCompletitud || validacionTitulo.length != 0" class="modal-form__btn">{{taskStore.isSubmiting ? 'Editando...' : 'Editar'}}</button>
                        <p v-if="taskStore.submitError">Error inesperado, intentelo de nuevo: {{ taskStore.submitError }}</p>
                        <button type="button" @click="closeModal" class="modal-form__btn modal-form__btn--exit" >Salir</button>
                    </div>
                </form>
            </template>
        </FormComponent>
    </div>
    <div class="pagination-controls">
        <ArrowComponent direction="left" :active="taskStore.currentPage > 1" @click="activePagination"/>
        <ArrowComponent direction="right" :active="!taskStore.isLastPage" @click="activePagination"/>    
    </div>
</template>

<style scoped>
</style>