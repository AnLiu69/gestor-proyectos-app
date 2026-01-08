<script setup>

</script>

<template>
    <nav class="nav">
        <ul class="nav__lista">
            <li class="nav__item"><RouterLink to="/" class="nav__enlace">Proyectos</RouterLink></li>
            <li class="nav__item"><RouterLink to="/tasks" class="nav__enlace">Tareas</RouterLink></li>
        </ul>
    </nav>
</template>

<style scoped>
    .nav {
        background-color: #7c8491;
        margin: 5px 0px 20px;
        padding: 1rem;
        border-radius: 10px;
    }

    .nav__lista {
        list-style: none;
        display: flex;
        gap: 1rem;
        margin: 0;
        padding: 0;
    }

    .nav__enlace {
        color: white;
        text-decoration: none;
        font-weight: bold;
    }
</style>