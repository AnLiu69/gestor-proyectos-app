<script setup>
import { computed, onMounted, reactive, ref, watch} from 'vue';
import { useTaskStore } from '../stores/task';
import TableComponent from '../components/TableComponent.vue';
import FilterComponent from '../components/FilterComponent.vue';

    const taskStore = useTaskStore();

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

</script>

<template>
    <h2>Vista de Tareas</h2>
    <FilterComponent :configFilter="{typeInput: 'select', name: 'filtro-estado'}" :arregloContenidos="estadosFilter" v-model="filterOptions.status"/>
    <FilterComponent :configFilter="{typeInput: 'select', name: 'filtro-prioridad'}" :arregloContenidos="prioridadFilter" v-model="filterOptions.priority"/>
    <TableComponent :objetos="tareasVista"/>
</template>

<style scoped></style>