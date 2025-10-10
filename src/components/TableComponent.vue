<script setup>
defineProps({
    objetos: Array
})
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
            </tr>
        </tbody>
    </table>
</template>

<style scoped></style>