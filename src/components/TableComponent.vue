<script setup>
defineProps({
    objetos: Array
})

const emit = defineEmits(['sendObject']);
</script>

<template>
    <table>
        <thead>
            <tr>
                <th 
                v-for="(value, key) in objetos[0]" :key="key">{{ key.toString().toUpperCase() }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(objeto, index) in objetos" :key="index">
                <td v-for="(value, key) in objeto">{{ value }}</td>
                <td><button type="button" @click="emit('sendObject', objeto)">Editar</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped></style>