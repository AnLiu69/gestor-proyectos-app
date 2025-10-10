<script setup>
import { onBeforeMount, onMounted } from 'vue';
import { useTaskStore } from '../stores/task';
import TableComponent from '../components/TableComponent.vue';

const taskStore = useTaskStore();

onMounted(() => {
    taskStore.getTasks();
})
</script>

<template>
    <h2>Vista de Tareas</h2>
    <TableComponent :objetos="taskStore.tasksFilter"/>
</template>

<style scoped></style>