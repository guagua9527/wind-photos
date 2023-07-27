<template>
    <div class="photo-main">
        <div class="photo-inner">
            <div class="img-container" v-for="(item, index) in showList" :key="index" :class="isCenter(index) ? 'image-main':'image-sub'">
                <img v-if="item.img" :src="item.img" @click="changeImage(item.index)"/>
            </div>
        </div>
    </div>
    
</template>

<script setup lang="ts">
import {ref, Ref, onMounted, onUnmounted, computed, watch} from 'vue'
import {useMainStore} from '@/store/index'

const store = useMainStore()
const imageSize = ref(5)

const images = [
    "/landscape.jpg",
    "/portrait.jpg",
    "/product1.jpg",
    "/still-life.jpg",
    "/landscape.jpg",
    "/portrait.jpg",
    "/product1.jpg",
    "/still-life.jpg",
    "/product1.jpg",
    "/test.jpg",
    "/portrait.jpg",
    "/product1.jpg",
    "/still-life.jpg",
    "/landscape.jpg",
    "/portrait.jpg",
    "/product1.jpg",
    "/still-life.jpg",
    "/product1.jpg",
]



const selectedIndex = ref(Math.ceil(imageSize.value / 2) - 1)

const changeImage = (index: number) => {
    selectedIndex.value = index
}


const showList = computed(() => {
    let index = 0
    const nullLength = Math.ceil(imageSize.value / 2) - 1
    const startNullList = Array.from({length: nullLength}).fill({
        img: null,
        index: index++,
    })

    const endNullList = Array.from({length: nullLength}).fill({
        img: null,
        index: images.length + nullLength + index++,
    })

    const imgList = images.map((img, index) => ({
        img,
        index: index + nullLength,
    }))

    const allList = [...startNullList, ...imgList, ...endNullList]

    const start = selectedIndex.value - nullLength
    const end = start + imageSize.value
    
    const res = allList.slice(start, end)

    console.log(allList)
    
    return res
})

const isCenter = (index: number) => {
    return index === Math.ceil(imageSize.value / 2) - 1
}

onMounted(() => {
    store.headerHeight = 80
})

onUnmounted(() => {
    store.headerHeight = 150
})
</script>

<style scoped>

.photo-main {
    width: 100%;
    height: 100%;
    display: flex;
}

.photo-inner {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: end;
    margin-bottom: 50px;
    
}

.img-container {
    padding: 10px;
    display: flex;
    justify-self: center;
    align-items: center;
    background-color: gray;
    border-radius: 10px;
    width: 150px;
    height: 150px;
    transition: 1s;
}

img {
    max-height: 100%;
    height: 100%;
    width: 100%;
    max-width: 1500px;
    object-fit: cover;
    margin: 0 auto;
    border-radius: 20px;
}

.image-main {
    width: auto;
    height: 1100px;
    max-width: 1500px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: end;
    transition: 1s;
    z-index: 999;
}

.image-sub {
    width: 150px;
    height: 150px;
    transition: 1s;
    margin-bottom: 50px;
}

.image-sub:hover {
    transform: scale(1.1);
}
.image-sub > img {
    border-radius: 15px;
    cursor: pointer;
}
</style>
