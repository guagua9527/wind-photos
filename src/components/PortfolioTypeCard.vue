<template>
    <div class="portfolio-item" @click="click">
        <div class="img" :style="imgStyle" @mouseleave="showLabel = false" @mouseover="showLabel = true">
            
        </div>

        <div class="title" :class="showLabel ? 'show-title' : 'hide-title'">
            <span class="char" v-for="char in portfolioType.name">{{ char }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref, reactive, watch, computed } from 'vue';
import type { PortfolioTag } from '@/types/portfolio'

const portfolioType = defineProps<PortfolioTag>()
const showLabel = ref(false)

const imgStyle = reactive({
    width: '550px',
    height: '750px',
    backgroundImage: `url(${portfolioType.cover})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '30px',
})

const isBig = ref(true)


const click = () => {
    isBig.value = !isBig.value
}

</script>

<style scoped>
.portfolio-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    overflow: hidden;
    text-align: center;
    margin: 25px;
    cursor: pointer;
    transition: all 5s, height 5s, width 5s;
    background-size: cover;
    background-position: center;
    max-width: 550px;
}

.img {
    z-index: 200;
    transition: 1s;
}


.img:hover {
    margin-top: -200px
}

.title {
    transition: 1s;
    font-size: 128px;
    font-weight: bold;
    font-style: italic;
    color: #fff;
    margin: 0;
    z-index: 100;
    display: flex;
    width: 80%;
}

.show-title {
    transform: translateY(0px);
    opacity: 1;
}

.hide-title {
    transform: translateY(-150px);
    opacity: 0;
}

.char {
    display: inline-block;
    flex: 1;
}
</style>