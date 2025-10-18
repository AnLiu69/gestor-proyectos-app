<script setup>
import { ref } from 'vue';

defineProps({
    configFilter: {
        type: Object,
        default: () => ({
            typeInput: "text",
            name: "default-name"
        })
    },
    arregloContenidos: Array
})

const option = ref("");

const emit = defineEmits(["sendOption"]);

const recojoOpcion = () => { emit("sendOption", option.value) };

</script>

<template>
    <div v-if="configFilter != null" class="contenedor-filter">
        <input :name="configFilter.name" type="text" v-if="configFilter.typeInput === 'text'">
        <select :name="configFilter.name" :id="configFilter.name" v-else-if="configFilter.typeInput === 'select'"
            @change="recojoOpcion" v-model="option">
            <option value="">Selecciona una opción</option>
            <option v-for="(contenido, index) in arregloContenidos" :key="index">{{ contenido }}</option>
        </select>
    </div>
</template>

<style scoped>
.contenedor-filter {
    background-color: wheat;
}
</style>