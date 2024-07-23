<template>
    <Transition mode="out-in">
        <div :key="title" class="info">
            <p>{{ title }}</p>
            <p v-if="Object.prototype.toString.call(description) != '[object Object]'">{{ description }}</p>
            <p v-else>
                <font-awesome-icon :icon="['fas', 'calendar-days']" /> 发表于 {{ description.date }}
                &nbsp;
                <font-awesome-icon :icon="['fas', 'folder-open']" /> 分类 {{ description.categories
            ? description.categories : '默认' }}
                &nbsp;
                <font-awesome-icon :icon="['fas', 'pen-to-square']" /> 共计 {{ description.words }}
            </p>
        </div>
    </Transition>
</template>

<script setup>
import settings from '@/settings.json'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

function parseDate(date) {
    date = new Date(date)
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
}

const title = computed(() => route.meta.info?.title || settings.title)
const description = computed(() => route.meta.info ? {
    ...route.meta.info,
    date: parseDate(route.meta.info.date),
    words: (route.meta.info.words / 1000).toFixed(1) + ' k字'
} : settings.description)
</script>

<style>
.info {
    position: absolute;
    width: 100%;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    color: #fdfdfd;
    text-shadow: 1px 3px 8px rgba(0, 0, 0, 0.75);
    text-align: center;
    z-index: -1;
}

.info p:first-child {
    font-size: 3.125rem;
}

.info p:not(:first-child) {
    font-size: 1.125rem;
}

@media screen and (max-width: 1200px) {
    .info p:first-child {
        font-size: 1.5rem;
    }

    .info p:not(:first-child) {
        font-size: 0.75rem;
    }

}
</style>