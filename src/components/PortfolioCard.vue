<template>
    <div class="container" @mouseover="isHover = true" @mouseleave="isHover = false">
        <div class="left">
            <img class="image" :class="isHover ? 'image-hover': ''" :src="props.cover" />
            <div class="title-line"  :class="isHover ? 'title-hover': ''">
                <span class="char" v-for="char in props.name">{{ char }}</span>
            </div>
            <p class="create-time">{{ props.createTime }}</p>
            <div>
                <p class="description">{{ props.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { Portfolio } from '@/types/portfolio';

const props = defineProps<Portfolio>()

const isHover = ref(false)

</script>

<style scoped>
.container {
    width: 300px;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 2s;
    border-radius: 30px;
    /* background-color: #fff; */
    border-width: 2px;
    border-color: #fff;
    border-style: solid;
    overflow: hidden;
    margin: 50px;
}

.left {
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.right {
    flex: 1;
    overflow: hidden;
}

.right-content {
    width: 200px;
}

.title-line {
    height: 50px;
    margin: 0 auto;
    display: flex;
    min-width: 40%;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-style: italic;
    font-weight: bold;
    margin-top: 5px;
}

.title-hover {
    font-size: 36px;
}

.char {
    display: inline-block;
    flex: 1;
    transition: 2s;
}

.image {
    width: 300px;
    height: 450px;
    transition: 2s;
    object-fit: cover;
}

.image-hover {
    height: 300px;
    border-radius: 30px;
    /* width: 280px; */
}

.description {
    text-align: left;
    text-indent: 2em;
    font-size: 16px;
    margin: 0;
    /* color: #fff; */
    margin: 20px;
}

.create-time {
    margin: 0;
    margin-top: 10px;
    font-style: italic;
}
</style>