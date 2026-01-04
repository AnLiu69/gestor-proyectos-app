<script setup>

</script>

<template>
    <div class="overlay-modal">
        <div class="modal">
            <slot name="header">
            </slot>
            <slot name="body">
            </slot>
        </div>
    </div>
</template>

<style scoped>
    .overlay-modal{
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(3px);
    }
    .modal{
        width: 90%;
        max-width: 500px;
        height: auto;
        border: 1px solid black;
        border-radius: 10px;
        background-color: white;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
        padding: 20px;
    }
</style>