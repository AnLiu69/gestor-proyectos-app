<script setup>
    import { getStatusConfig } from '../utils/diccionaryStatus.js';
    defineProps({
        objetos: Array
    })

    const emit = defineEmits(['sendObject']);
</script>

<template>
    <table class="table">
        <thead class="table__header">
            <tr class="table__row--head">
                <th class="table__cell--head" 
                v-for="(value, key) in objetos[0]" :key="key">{{ key.toString().toUpperCase() }}
                </th>
                <th class="table__cell--head">ACTION</th>
            </tr>
        </thead>
        <tbody class="table__body">
            <tr v-for="(objeto, index) in objetos" :key="index" class="table__row">
                <td v-for="(value, key) in objeto" class="table__cell">
                    <span v-if="key === 'status' || key === 'priority'" class="table__detail" :class="[`table__detail--${getStatusConfig(value).class}`]">{{ value }}</span>
                    <span v-else>{{ value }}</span>
                </td>
                <td class="table__cell"><button type="button" @click="emit('sendObject', objeto)" class="table__btn">Editar</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
    .table{
        width: 100%;
        text-align: left;
        border-collapse: separate;
        border-spacing: 0px;
    }
    .table__cell--head{
        background-color: #f5f5f5;
        font-weight: normal;    
        &:first-child{
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }
        &:last-child{
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }
    .table__cell, .table__cell--head{
        border-top: 3px solid #f5f5f5;
        padding: 10px;
    }
    .table__body .table__row:first-child .table__cell{
        border-top: none;
    }
    .table__detail{
        padding: 4px 8px;
        border-radius: 12px;
    }
    .table__detail--activo{
        background-color: rgba(40, 189, 40, 0.1);
        color: rgb(40, 189, 40);
        font-weight: bold;
    }
    .table__detail--inactivo{
        background-color: rgba(189, 40, 40, 0.1);
        color: rgb(189, 40, 40);
        font-weight: bold;
    }
    .table__detail--alta{
        background-color: rgba(189, 117, 40, 0.1);
        color: rgb(189, 117, 40);
        font-weight: bold;
    }
    .table__detail--media{
        background-color: rgba(189, 182, 40, 0.1);
        color: rgb(189, 182, 40);
        font-weight: bold;
    }
    .table__detail--baja{
        background-color: rgba(53, 36, 181, 0.1);
        color: rgb(53, 36, 181);
        font-weight: bold;
    }
    .table__detail--hecho{
        background-color: rgba(50, 189, 40, 0.1);
        color: rgb(50, 189, 40);
        font-weight: bold;
    }
    .table__detail--en-progreso{
        background-color: rgba(189, 119, 40, 0.1);
        color: rgb(189, 119, 40);
        font-weight: bold;
    }
    .table__detail--pendiente{
        background-color: rgba(181, 36, 150, 0.1);
        color: rgb(181, 36, 150);
        font-weight: bold;
    }
</style>