<script setup>
import { ref } from 'vue';

const getTheme = () =>{
    if(localStorage.getItem('dark-mode') === 'false'){
        return true;
    }
    else if(localStorage.getItem('dark-mode') === 'true'){
        return false;
    }
    else if(window.matchMedia('(prefers-color-scheme: light)').matches){
        return true;
    }
    else if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        return false;
    }
    else{
        return true;
    }
}

const isLight = ref(true);
isLight.value = getTheme();

const switchTheme = (isLight) => {
    if (isLight) {
        const body = document.body;
        body.classList.remove('dark-mode');
    }
    else{
        const body = document.body;
        body.classList.add('dark-mode');
    }
}
switchTheme(isLight.value);

const toggleDarkMode = () => {
    isLight.value = !isLight.value;
    localStorage.setItem('dark-mode', !isLight.value);
    switchTheme(isLight.value);
}
</script>

<template>
    <nav class="nav">
        <ul class="nav__lista">
            <li class="nav__item">
                <RouterLink to="/" class="nav__enlace">Proyectos</RouterLink>
            </li>
            <li class="nav__item">
                <RouterLink to="/tasks" class="nav__enlace">Tareas</RouterLink>
            </li>
        </ul>
        <button class="nav-btn" @click="toggleDarkMode" aria-label="Toggle Dark Mode">
            <Transition name="switch-dark-mode" mode="out-in">
                <svg v-if="isLight" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" width="24" height="24">
                <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" width="24" height="24">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
            </Transition>
        </button>
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
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: bold;

    &:hover {
        color: var(--text-secondary-hover);
    }
}

.nav-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-secondary);

    &:hover {
        color: var(--color-icon-hover);
    }
}

.switch-dark-mode-enter-active,
.switch-dark-mode-leave-active {
    transition: all 0.2s ease;
}

.switch-dark-mode-enter-from, .switch-dark-mode-leave-to{
    opacity: 0;
    transform: scale(0.5);
}
</style>