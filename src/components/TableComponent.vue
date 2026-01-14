<script setup>
    import { getStatusConfig } from '../utils/diccionaryStatus.js';
    defineProps({
        objetos: Array,
        headers: Array
    })

    const emit = defineEmits(['sendObject']);
</script>

<template>
    <div class="table__container">
        <table class="table">
            <thead class="table__header">
                <tr class="table__row--head">
                    <th class="table__cell--head" 
                    v-for="(value, index) in headers" :key="index">{{ value.toString().toUpperCase() }}
                    </th>
                    <th class="table__cell--head">ACTION</th>
                </tr>
            </thead>
            <tbody class="table__body">
                <tr v-if="objetos.length > 0" v-for="(objeto, index) in objetos" :key="index" class="table__row">
                    <td v-for="(value, key) in objeto" class="table__cell">
                        <span v-if="key === 'status' || key === 'priority'" class="table__detail" :class="[`table__detail--${getStatusConfig(value).class}`]">{{ value }}</span>
                        <span v-else>{{ value }}</span>
                    </td>
                    <td class="table__cell"><button type="button" @click="emit('sendObject', objeto)" class="table__btn"><img src="../assets/img/edit-icon.png" alt="icono de editar" class="table__icon"></button></td>
                </tr>
                <tr v-else class="table__row">  
                    <td class="table__cell table__cell--none" :colspan="headers.length + 1">NO HAY DATOS DISPONIBLES</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    .table__container{
        overflow-x: auto;
    }
    .table{
        width: 100%;
        text-align: left;
        border-collapse: separate;
        border-spacing: 0px;
    }
    .table__cell--head{
        background-color:  var(--border-table);
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
        border-top: 3px solid var(--border-table);
        padding: 10px;
        white-space: nowrap;

        &:last-child{
            text-align: center;
        }
    }
    .table__cell--none{
        text-align: center;
        padding: 20px;
        color: var(--text-secondary);
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
    .table__btn{
        background: none;
        border: none;
        padding: 0;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
    .table__icon{
        width: 30px;
        height: 30px;
    }
</style>