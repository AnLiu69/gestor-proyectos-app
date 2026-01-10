<script setup>
    const toggleDarkMode = () =>   {
        const body = document.body;
        body.classList.toggle('dark-mode');
    }
</script>

<template>
    <nav class="nav">
        <ul class="nav__lista">
            <li class="nav__item"><RouterLink to="/" class="nav__enlace">Proyectos</RouterLink></li>
            <li class="nav__item"><RouterLink to="/tasks" class="nav__enlace">Tareas</RouterLink></li>
        </ul>
        <button class="nav__btn" @click="toggleDarkMode">Click me</button>
    </nav>
</template>

<style scoped>
    .nav {
        background-color: var(--bg-nav);
        margin: 5px 0px 20px;
        padding: 1rem;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav__lista {
        list-style: none;
        display: flex;
        gap: 1rem;
        margin: 0;
        padding: 0;
    }

    .nav__enlace {
        color:  var(--text-secondary);
        text-decoration: none;
        font-weight: bold;

        &:hover{
            color: var(--text-secondary-hover);
        }
    }

    .nav__btn {
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;

        &:hover {
            background-color: #45a049;
        }
    }
</style>