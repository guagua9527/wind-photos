<template>
    <div class="content">
        <n-card title="关于我">
            <template #cover>
                <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg">
            </template>
            关于我
        </n-card>

        <n-card title="作品集" @click="goPortfolio">
            <template #cover>
                <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg">
            </template>
            作品集
        </n-card>

        <n-card title="关于我">
            <template #cover>
                <img src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg">
            </template>
            关于我
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { NCard } from 'naive-ui'
import { useMainStore } from '../store/index'
import router from '../router/index'

const store = useMainStore();

const goPortfolio = () => {
    store.title = '作品集'
    router.push('/portfolio')
}

onMounted(() => {
    router.push('/portfolio')
})

</script>

<style scoped>
.content {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: gray;
}

.n-card {
    max-width: 300px;
    margin: 20px;
    text-align: center;
    cursor: pointer;
    border-radius: 30px;
    overflow: hidden;
}
</style>
