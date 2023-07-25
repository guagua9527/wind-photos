<!-- 作品集 -->
<template>
    <div class="portfolio">
        <div class="header-bar">
            <div class="bar-item" :class="selected == 'type' ? 'selected' : ''" @click="selected = 'type'">
                作品分类
            </div>
            <div class="bar-item" :class="selected == 'all' ? 'selected' : ''" @click="selectAll">
                全部作品
            </div>
        </div>
        <div class="content">
            <div v-if="selected == 'all'" class="list">
                <PortfolioCard v-for="p in allPortfolioList" v-bind="p" />
            </div>

            <div v-else class="list">
                <PortfolioTypeCard v-for="p in portfolioTypeList" :key="p.type" v-bind="p" @click="selectType(p)" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { apiClient } from '../axios'
import { useMainStore } from '@/store'
import PortfolioTypeCard from '@/components/PortfolioTypeCard.vue';
import PortfolioCard from '@/components/PortfolioCard.vue';
import { useTitle } from '@vueuse/core'
import type { Portfolio, PortfolioTypeItem } from '../types/portfolio'

type SelectType = "all" | "type";

const store = useMainStore()
const title = useTitle('作品集', { titleTemplate: '%s | 冯诗倪' })

const selected = ref<SelectType>("type");

const portfolioType = ref<string | null>(null)

const portfolioList = ref<Portfolio[]>([]);

const allPortfolioList = ref<Portfolio[]>([{
    name: '风景',
    type: 'landscape',
    cover: './landscape.jpg',
    description: '风景作品集的描述内容风景作品集的描述内容风景作品集的描述内容风景作品集的描述内容',
    createTime: '2023-10-10',
}, {
    name: '静物',
    type: 'landscape',
    cover: './still-life.jpg',
    description: '风景作品集的描述内容风景作品集的描述内容风景作品集的描述内容风景作品集的描述内容',
    createTime: '2023-10-10',
}, {
    name: '人像',
    type: 'landscape',
    cover: './portrait.jpg',
    description: '风景作品集的描述内容风景作品集的描述内容风景作品集的描述内容风景作品集的描述内容',
    createTime: '2023-10-10',
}, {
    name: '产品',
    type: 'landscape',
    cover: './product1.jpg',
    description: '风景作品集的描述内容风景作品集的描述内容风景作品集的描述内容风景作品集的描述内容',
    createTime: '2023-10-10',
}]);

const portfolioTypeList = reactive<PortfolioTypeItem[]>([
    {
        name: '风景',
        type: 'landscape',
        image: './landscape.jpg',
    },
    {
        name: '静物',
        type: 'still-life',
        image: './still-life.jpg',
    },
    {
        name: '人像',
        type: 'portrait',
        image: './portrait.jpg',
    },
    {
        name: '产品',
        type: 'product',
        image: './product1.jpg',
    }
])

const selectAll = () => {
    selected.value = 'all'
    portfolioType.value = null
}

const selectType = (p: PortfolioTypeItem) => {
    portfolioType.value = p.type
}

const url = computed(() => {
    return `/api/portfolio?type=${portfolioType.value}`
})

watch(url, () => {
    apiClient.get(url.value).then((res: any) => {
        console.log(res.data)
        portfolioList.value = res.data.data as Portfolio[]
    })
})

onMounted(() => {
    store.title = '作品集'
})

</script>

<style scoped>
.portfolio {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.header-bar {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 48px;
    font-weight: bold;
    font-style: italic;
    border-width: 2px;
    border-style: solid;
}

.bar-item {
    flex: 1;
    border-radius: 5px;
    overflow: hidden;
    margin: 0;
    transition: .5s;
    margin: 1px;

}

.selected {
    background-color: black;
    color: #FFF;
}

.bar-item:hover {
    cursor: pointer;
    background-color: #333;
    color: #DDD;
}

.content {
    flex: 1;
}

.list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    justify-content: center;
}
</style>
