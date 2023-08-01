<!-- 作品集 -->
<template>
    <div class="portfolio">
        <div class="header-bar">
            <div class="bar-item" :class="selected == 'all' ? 'selected' : ''" @click="selectAll">
                全部作品
            </div>
            <div class="bar-item" :class="selected == 'type' ? 'selected' : ''" @click="selected = 'type'">
                作品分类
            </div>
        </div>
        <div class="content">
            <n-scrollbar v-if="selected == 'all'" style="max-height: 1000px;">
                <div class="list">
                    <PortfolioCard v-for="p in portfolioList" v-bind="p" @click="changeTitle(p)" />
                </div>
            </n-scrollbar>

            <div v-else class="list">
                <PortfolioTypeCard v-for="p in portfolioTagList" :key="p.name" v-bind="p" @click="selectType(p)" />
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
import type { Portfolio, PortfolioTag } from '../types/portfolio'
import router from '@/router';
import { NScrollbar } from 'naive-ui';

type SelectType = "all" | "type";

const store = useMainStore()
const title = useTitle('作品集', { titleTemplate: '%s | 冯诗倪' })

// 选中的是作品集还是全部
const selected = ref<SelectType>("all");
// 选中的作品分类
const portfolioTag = ref<string | null>(null)
const portfolioList = ref<Portfolio[]>([]);
const portfolioTagList = ref<PortfolioTag[]>([])

const changeTitle = (p: Portfolio) => {
    title.value = p.name
    store.title = p.name
}

onMounted(() => {
    getPortfolioTags()
    getPortfolioList()
})

const url = computed(() => {
    if (selected.value == 'all')
        return '/portfolio'
    return `/portfolio?tag=${portfolioTag.value}`
})


// 获取作品集列表
const getPortfolioList = () => {
    apiClient.get<Portfolio[]>(url.value).then(res => {
        portfolioList.value = res.data!
        console.log(res.data);

    })
}

// 获取作品集分类列表
const getPortfolioTags = () => {
    apiClient.get<PortfolioTag[]>('/tags').then(res => {
        portfolioTagList.value = res.data!
    })
}

watch(url, getPortfolioList)


const selectAll = () => {
    selected.value = 'all'
    portfolioTag.value = null
}

const selectType = (p: PortfolioTag) => {
    portfolioTag.value = p.name
}

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
    max-height: 1040px;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    justify-content: center;
}
</style>
