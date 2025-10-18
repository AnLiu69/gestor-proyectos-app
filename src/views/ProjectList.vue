<script setup>
import { computed, onBeforeMount, ref} from 'vue';
import TableComponent from '../components/TableComponent.vue';
import { useProjectStore } from '../stores/project';
import FilterComponent from '../components/FilterComponent.vue';

    const projectStore = useProjectStore();


    onBeforeMount(() => { //Luego añadir loaders y manejo de errores y volver a mounted
        projectStore.getProyects();
    })

    const opcionSeleccionada = ref("");

    const projectosVista = computed(() => { //Aquí manejamos la lógica del filtrado
        if(opcionSeleccionada.value === ""){
            return projectStore.projectsFilter;
        }
        else if(opcionSeleccionada.value != ""){
            return projectStore.projectsFilter.filter((project) => project.status === opcionSeleccionada.value);
        }
    });

    const estadosFilter = computed(() => [...new Set(projectStore.projectsFilter.map((project) => project.status))]); //Aquí seleccionamos los estados para pasar al filtro

    const procesarOpcion = (option) => { //Aquí cambiamos el valor de la opción en base a la seleccionada
        opcionSeleccionada.value = option.value;
    };
</script>

<template>
    <h2>Vista de proyectos</h2>
    <FilterComponent :configFilter="{typeInput: 'select', name: 'estadoProyecto'}" :arregloContenidos="estadosFilter" @sendOption="procesarOpcion"/>
    <TableComponent :objetos="projectosVista"/>

</template>

<style scoped></style>