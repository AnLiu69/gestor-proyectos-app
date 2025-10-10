<script setup>
import { onBeforeMount, onMounted} from 'vue';
import TableComponent from '../components/TableComponent.vue';
import { useProjectStore } from '../stores/project';

    const projectStore = useProjectStore();

    onBeforeMount(() => { //Luego añadir loaders y manejo de errores y volver a mounted
        projectStore.getProyects();
    })
</script>

<template>
    <h2>Vista de proyectos</h2>
    <TableComponent :objetos="projectStore.projectsFilter"/>

</template>

<style scoped></style>