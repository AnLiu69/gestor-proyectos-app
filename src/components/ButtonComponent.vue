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
    width: 150px;
    background-color: #0266FF;
    color: white;
    border: none;
    height: 36px;
    border-radius: 10px;
    font-size: 14px;

    &:hover{
        background-color: #408bfc;
    }
}

</style>