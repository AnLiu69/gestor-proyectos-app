<script setup>
defineProps({
    objetos: Array
})

const emit = defineEmits(['sendObject']);
</script>

<template>
    <table class="table">
        <thead class="table__thead">
            <tr class="table__thead__tr">
                <th class="table__thead__tr__th" 
                v-for="(value, key) in objetos[0]" :key="key">{{ key.toString().toUpperCase() }}
                </th>
                <th class="table__thead__tr__th">ACCIÓN</th>
            </tr>
        </thead>
        <tbody class="table__tbody">
            <tr v-for="(objeto, index) in objetos" :key="index" class="table__tbody__tr">
                <td v-for="(value, key) in objeto" class="table__tbody__tr__td">{{ value }}</td>
                <td class="table__tbody__tr__td"><button type="button" @click="emit('sendObject', objeto)" class="table__tbody__tr__td__btn">Editar</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>

</style>