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
    background-color: var(--brand-color);
    color:  var(--text-secondary);
    border: none;
    height: 36px;
    border-radius: 10px;
    font-size: 14px;
    margin-left: auto;

    &:hover{
        background-color:var(--btn-hover);
    }
}

@media (max-width: 576px) {
    .btn-crear{
        width: 100%;
        margin-left: 0px;
    }
}

</style>