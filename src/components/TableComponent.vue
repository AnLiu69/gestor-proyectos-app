<script setup>
import { onMounted } from 'vue';
import { useProjectStore } from '../stores/project';

    const projectStore = useProjectStore();

    onMounted(() => {
        projectStore.getProyects();
    })
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>DESCRIPCIÓN</th>
                <th>STATUS</th>
                <th>PRIORIDAD</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="project in projectStore.projects" :key="project.id">
                <td>{{ project.id }}</td>
                <td>{{ project.name }}</td>
                <td>{{ project.description }}</td>
                <td>{{ project.status }}</td>
                <td>{{ project.priority }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped></style>