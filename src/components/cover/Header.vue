<template>
    <Transition enter-active-class="header-active" leave-active-class="header-leave">
        <div class="header flex-c" v-show="scrollShow">
            <div class="header-inner">

                <div v-if="!screen.isWideScreen" class="span-div flex-c">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"
                            d="M20 7H4m16 5H4m16 5H4" />
                    </svg>
                </div>

                <nav class="header-nav">
                    <slot>
                        <router-link to="/">Home</router-link>
                    </slot>
                </nav>

                <div class="header-right flex-c">
                    <div class="header-right-inner flex-c">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                            @click="switchMode">
                            <path
                                d="M11.286 22C13.337 22 15 20.42 15 18.47c0-1.544-1.045-2.857-2.5-3.336C12.295 13.371 10.72 12 8.81 12c-2.052 0-3.715 1.58-3.715 3.53c0 .43.082.844.23 1.226a2.949 2.949 0 0 0-.54-.05C3.248 16.706 2 17.89 2 19.353C2 20.815 3.247 22 4.786 22z" />
                            <path
                                d="M2.716 15.723c.278-.148.574-.268.882-.354C3.686 12.6 6.056 10.5 8.81 10.5c.172 0 .343.008.511.024A6.495 6.495 0 0 1 9 8.5a6.496 6.496 0 0 1 3.143-5.567C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12a9.97 9.97 0 0 0 .716 3.723M22 12c0 4.266-2.671 7.908-6.432 9.345a4.865 4.865 0 0 0 .932-2.874a4.907 4.907 0 0 0-1.457-3.487a6.496 6.496 0 0 0 6.024-3.127c.24-.396.933-.32.933.143" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                            @click="search.open()">
                            <g fill="none" stroke="#fdfdfd" stroke-width="1.5">
                                <circle cx="11.5" cy="11.5" r="9.5" />
                                <path stroke-linecap="round" d="M18.5 18.5L22 22" />
                            </g>
                        </svg>
                    </div>
                </div>

            </div>
        </div>
    </Transition>
    <Transition>
        <button class="btn-toTop flex-c" v-show="!scrollShow" :v-if="settings.to_top" :style="btnStyle"
            @mousedown="startDrag">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="none" stroke-width="1.5"
                    d="m3.165 19.503l7.362-16.51c.59-1.324 2.355-1.324 2.946 0l7.362 16.51c.667 1.495-.814 3.047-2.202 2.306l-5.904-3.152c-.459-.245-1-.245-1.458 0l-5.904 3.152c-1.388.74-2.87-.81-2.202-2.306Z" />
            </svg>
        </button>
    </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import scrollToTop from '@/components/scroll.js'
import { useSearchStore } from "@/store/search"
import settings from '@/settings.json'
import { useScreenStore } from "@/store/screen"

const search = useSearchStore()
const screen = useScreenStore()

const root = document.documentElement.querySelector("body")
const switchMode = () => {
    if (root.classList.contains("dark-mode")) {
        root.classList.remove("dark-mode")
        root.classList.add("light-mode")
    } else {
        root.classList.remove("light-mode")
        root.classList.add("dark-mode")
    }
}

const scrollY = ref(0)

const updateScroll = () => {
    scrollY.value = window.scrollY
}

onMounted(() => {
    window.addEventListener('scroll', updateScroll)
})
onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
})

const scrollShow = computed(() => {
    const triggerHeight = window.innerHeight * 0.6
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
.header {
    position: fixed;
    height: 3.5rem;
    width: 100%;
    font-size: 18px;
    text-shadow: 1px 3px 8px rgba(0, 0, 0, 0.75);
    z-index: 1;
}

.header-active {
    animation: fadeInDown 0.25s;
}

.header-leave {
    animation: fadeOutUp 0.25s;
}

.header-inner {
    height: 2.75rem;
    width: 1200px;
    font-size: 18px;
    color: #fff;
    text-shadow: 1px 3px 8px rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: space-between;
}

.span-div {
    height: 100%
}

.header-nav {
    display: inline-block;

    a {
        color: currentColor;
        text-decoration: none;
        position: relative;
        margin: 0 1rem;
    }

    a:not(#is-current)::before {
        content: "";
        position: absolute;
        width: 0;
        left: 50%;
        height: 2.5px;
        bottom: -0.375rem;
        background-color: currentColor;
        border-radius: 0.125rem;
        box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.3);
        transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
        transform: translateX(-50%);
    }

    a:not(#is-current):hover::before {
        width: 100%;
        left: 50%;
    }
}

.header-nav>#is-current::before {
    content: "";
    position: absolute;
    height: 2.5px;
    bottom: -0.375rem;
    background-color: currentColor;
    border-radius: 0.125rem;
    box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.3);
    transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
    transform: translateX(-50%);
    width: 100%;
    left: 50%;
}

.header-right {
    width: 15rem;
}

.header-right-inner>svg {
    margin: 1rem;
    width: 1.75rem;
    height: 1.75rem;
    cursor: pointer;
    fill: var(--moon-c);
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
    transition-duration: var(--trans-time);
}

@media screen and (max-width: 1200px) {
    .header-inner {
        left: 2.5%;
        width: 95%;
    }

    .header-nav {
        display: none;
    }

    .header-right {
        width: 5rem;
    }

}
</style>