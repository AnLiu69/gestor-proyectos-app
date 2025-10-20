<script setup>

</script>

<template>
    <div class="modal">
        <slot name="header">
        </slot>
        <slot name="body">
        </slot>
        <slot name="footer">
        </slot>
    </div>
</template>

<style scoped>
    .modal{
        position: fixed;
        width: 20vw;
        height: 60vh;
        left: 500px;
        top: 220px;
        border: 1px solid black;
        border-radius: 10px;
        background-color: aquamarine;
        z-index: 2;
    }
    *{
        padding: 10px;
    }
</style>