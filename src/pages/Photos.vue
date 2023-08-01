<template>
    <div class="photo-main">
        <div class="photo-content" :style="cssVar">
            <img v-for="(item, index) in portfolioPhotos" :key="index" :src="item.image"
                :class="selectedIndex == index ? 'image-main' : 'image-sub'" @load="imgLoad"
                @click="e => changeImage(e, index)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, reactive, nextTick } from 'vue'
import { useRoute } from 'vue-router';
import { useMainStore } from '@/store/index'
import { apiClient } from '@/axios';
import type { PortfolioPhoto } from '@/types/portfolio'

const store = useMainStore()
const route = useRoute()

const { portfolioId } = route.params

const portfolioPhotos = ref<PortfolioPhoto[]>([])

const getPhotos = () => {
    apiClient.get<PortfolioPhoto[]>(`/photos/${portfolioId}`).then(res => {
        portfolioPhotos.value = res.data!
    })
}

onMounted(() => {
    getPhotos()
})

const offsetX = ref(0)
const offsetXCss = computed(() => `translateX(${offsetX.value}px)`)
const selectedIndex = ref(0)
const subImageSize = ref(150)
const subImageSizeCss = computed(() => subImageSize.value + 'px');
const mainImgWidth = ref(0)
const mainImgWidthCss = computed(() => mainImgWidth.value + 'px')
const mainImgHeight = ref(1100)
const mainImgHeightCss = computed(() => mainImgHeight.value + 'px')
const maxWidth = 1500;
const maxHeight = 1000;
const maxWidthCss = computed(() => maxWidth + 'px')
const maxHeightcSS = computed(() => maxHeight + 'px')
const contentWidth = ref<string>('auto')

const cssVar = reactive({
    '--maxWidth': maxWidthCss,
    '--maxHeight': maxHeightcSS,
    '--contentWidth': contentWidth,
    '--translateX': offsetXCss,
    '--subImgSize': subImageSizeCss,
    '--mainImgWidth': mainImgWidthCss,
    '--mainImgHeight': mainImgHeightCss,
})


const changeImage = (event: Event, index: number) => {
    selectedIndex.value = index
    console.log(event.target);
    const target = event.target as HTMLImageElement
    updateSize(target.naturalWidth, target.naturalHeight)
}

const getLeftWidth = () => {
    let left = mainImgWidth.value / 2 + (subImageSize.value + 20) * selectedIndex.value;
    return left;
}

// 可视区域宽度
const getMainWidth = () => {
    return document.getElementsByClassName('photo-main')[0].clientWidth
}

const getContentWidth = () => {
    return document.getElementsByClassName('photo-content')[0].clientWidth
}

const moveToCenter = () => {
    const mainWidth = getMainWidth()

    const left = getLeftWidth()
    offsetX.value = mainWidth / 2 - left
}

watch(selectedIndex, () => {
    moveToCenter()
})

const imgLoad = (event: Event) => {
    const target = event.target as HTMLImageElement

    if (target.className !== 'image-main') {
        return;
    }

    updateSize(target.naturalWidth, target.naturalHeight)

    moveToCenter()
}

const updateSize = (naturalWidth: number, naturalHeight: number) => {
    // true 这张照片是横着的 false 竖着的
    const isHorizontal = naturalWidth > naturalHeight;
    const ratioH = naturalHeight / maxHeight
    const ratioW = naturalWidth / maxWidth

    if (isHorizontal) {
        mainImgWidth.value = maxWidth;
        mainImgHeight.value = naturalHeight / ratioW;

        if (mainImgHeight.value > maxHeight) {
            const newRatioH = mainImgHeight.value / maxHeight;
            mainImgHeight.value = maxHeight;
            mainImgWidth.value = mainImgWidth.value / newRatioH;
        }
    } else {
        mainImgHeight.value = maxHeight;
        mainImgWidth.value = naturalWidth / ratioH;

        if (mainImgWidth.value > maxWidth) {
            const newRatioW = mainImgWidth.value / maxWidth;
            mainImgWidth.value = maxWidth;
            mainImgHeight.value = mainImgHeight.value / newRatioW;
        }
    }
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
    margin: 0 auto;
    width: 80%;
    height: 100%;
    display: flex;
    overflow: hidden;
}

.photo-content {
    height: 100%;
    width: var(--contentWidth);
    /* min-width: 100%; */
    display: flex;
    flex-direction: row;
    align-items: end;
    transform: var(--translateX);
    transition: 1s;
}

img {
    max-height: 100%;
    /* height: 100%; */
    width: 100%;
    max-width: var(--maxWidth);
    max-height: var(--maxHeight);
    object-fit: contain;
    margin: 10px;
    transition: 1.5s;
    border-radius: 20px;
}

.image-main {
    width: var(--mainImgWidth);
    height: var(--mainImgHeight);
    border-radius: 30px;
    margin-bottom: 80px;
    display: flex;
    justify-content: center;
    align-items: end;
}

.image-sub {
    width: var(--subImgSize);
    height: var(--subImgSize);
    margin-bottom: 50px;
    object-fit: cover;
    border-radius: 20px;
}

.image-sub:hover {
    transform: scale(1.1);
    margin-bottom: 70px;
}

.image-sub>img {
    border-radius: 15px;
    cursor: pointer;
}
</style>
