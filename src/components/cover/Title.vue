<template>
    <Transition mode="out-in">
        <div :key="title" class="info">
            <p>{{ title }}</p>
            <p>{{ description }}</p>
        </div>
    </Transition>
</template>

<script setup>
import settings from '@/settings.json'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const title = computed(() => route.meta.info?.title || settings.title)
const description = computed(() => route.meta.info?.date || settings.description)
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

.info>:nth-child(1) {
    font-size: 3.125rem;
}

.info>:nth-child(2) {
    font-size: 24px;
}
</style>