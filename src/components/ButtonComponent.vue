<script setup>
    defineProps({
        tipoCreacion: String
    })

    const emit = defineEmits(['clickBtn']);

    const changeValue = () => {
        emit('clickBtn')
    }
</script>

<template>
    <button type="button" class="btn-crear" @click="changeValue">Crear {{ tipoCreacion }}</button>
</template>

<style scoped>
.btn-crear{
    width: 100px;
    height: 50px;
    background-color: aqua;
    border: none;
    border-radius: 10%;
    font-weight: bold;

    &:hover{
        background-color: rgb(18, 211, 147);
    }
}

</style>