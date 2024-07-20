<template>
    <div class="cover">

        <Header v-show="scrollShow">
            <Menu />
        </Header>

        <img src="/hoshino.jpg" alt="cover" class="cover-bg cover-blur">

        <slot></slot>

        <div class="wave-container">
            <svg class="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto" fill="white">
                <defs>
                    <path id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g class="wave">
                    <use xlink:href="#gentle-wave" x="48" y="7" />
                    <use xlink:href="#gentle-wave" x="48" y="5" />
                    <use xlink:href="#gentle-wave" x="48" y="3" />
                    <use xlink:href="#gentle-wave" x="48" y="0" />
                </g>
            </svg>
        </div>

        <Transition>
            <button class="btn-toTop flex-c" v-show="!scrollShow" :v-if="settings.to_top" :style="btnStyle"
                @mousedown="startDrag">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke-width="1.5"
                        d="m3.165 19.503l7.362-16.51c.59-1.324 2.355-1.324 2.946 0l7.362 16.51c.667 1.495-.814 3.047-2.202 2.306l-5.904-3.152c-.459-.245-1-.245-1.458 0l-5.904 3.152c-1.388.74-2.87-.81-2.202-2.306Z" />
                </svg>
            </button>
        </Transition>

    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import scrollToTop from '@/components/scroll.js'
import Header from '@/components/cover/Header.vue'
import Menu from '@/components/Menu.vue'
import '@/components/cover/cover.css'
import settings from '@/settings.json'

const scrollY = ref(0)

onMounted(() => {
    const updateScroll = () => {
        scrollY.value = window.scrollY
    }
    window.addEventListener('scroll', updateScroll)

    onUnmounted(() => {
        window.removeEventListener('scroll', updateScroll)
    })
})

const scrollShow = computed(() => {
    const remValue = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const triggerHeight = window.innerHeight * 0.75 - 2.75 * remValue
    return scrollY.value < triggerHeight
})

const btnX = ref(50)
const btnY = ref(50)

const btnStyle = computed(() => {
    return {
        position: 'fixed',
        bottom: `${btnY.value}px`,
        right: `${btnX.value}px`,
    }
})

let startX = 50
let startY = 50
let dragging, startTime

function startDrag(event) {
    startX = window.innerWidth - event.clientX - btnX.value
    startY = window.innerHeight - event.clientY - btnY.value
    startTime = Date.now();
    dragging = false
    document.addEventListener('mousemove', onDragging)
    document.addEventListener('mouseup', stopDrag)
}

function onDragging(event) {
    btnX.value = window.innerWidth - event.clientX - startX
    btnY.value = window.innerHeight - event.clientY - startY
    dragging = true

}

function stopDrag() {
    document.removeEventListener('mousemove', onDragging)
    document.removeEventListener('mouseup', stopDrag)
    if (!dragging && Date.now() - startTime < 625) {
        scrollToTop()
    }
}
</script>

<style>
.btn-toTop {
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 5%;
    right: 5%;
    border: 0;
    outline: none;
    border-radius: 50%;
    background-color: var(--bg-c-a7);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.125);
    z-index: 1;
}

.btn-toTop>svg {
    width: 60%;
}

.btn-toTop>svg path {
    stroke: var(--dark-c-2);
}
</style>