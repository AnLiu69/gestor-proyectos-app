<script setup>
    defineProps({
        direction: {
            type: String,
            default: 'right' 
        },
        active :{
            type: Boolean,
            default: false
        }
    });
    defineEmits(['click']);
</script>

<template>
    <a @click="$emit('click', direction)" class="arrow__link" :class="[`arrow__link--${active ? 'active' : 'inactive'}`]">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8899a4"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="arcs" class="arrow" :class="[`arrow--${direction}`]">
            <path d="M9 18l6-6-6-6"></path>
        </svg>
    </a>
</template>

<style scoped>
.arrow {
    margin: 20px 10px;
    cursor: pointer;    
}

.arrow--left {
    transform: rotate(180deg);
}
.arrow--right {
    transform: rotate(0deg);
}

.arrow__link--active {
    cursor: pointer;

    & > *{
        stroke: #0266FF;
    }
}

.arrow__link--inactive{
    pointer-events: none;

    & > *{
        stroke: #343F52;
    }
}
</style>