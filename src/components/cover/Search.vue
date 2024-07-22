<template>
    <Transition>
        <div class="search flex-c" v-if="search.isOpen">
            <p class="search-close-btn" @click="search.close()">✕</p>
            <input type="text" placeholder="SEARCH..." v-model="searchInput">
            <br>
            <router-link v-for=" item  in  result " :key="item.id" :to="`${item.path}`" @click="backToPage">
                <p style="display:inline-block">{{ item.title }}</p>
                <p style="float: right;">{{ parseDate(item.date) }}</p>
            </router-link>
        </div>
    </Transition>
</template>

<script setup>
import { useSearchStore } from "@/store/search"
import { watch, ref, computed } from "vue"
import { index } from "@/index.js"
const search = useSearchStore()
watch(() => search.isOpen, (newValue) => {
    if (newValue) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})
const searchInput = ref(null)
const result = computed(() => {
    if (searchInput.value) {
        const searchResult = index.search(searchInput.value, { limit: 5, enrich: true })[0]
        if (!searchResult) return []
        else return searchResult.result.map((item) => {
            return {
                id: item.id,
                ...item.doc
            }
        })
    }
})
function backToPage() {
    search.close()
    searchInput.value = null
}
function parseDate(date) {
    date = new Date(date)
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
}
</script>

<style scoped>
a {
    width: 40%;
    margin: 0.5rem 0;
    padding: 0 1rem;
    color: var(--dark-c-2);
    text-decoration: none;
    font-size: 1.25rem;
    /* border: 1px solid var(--dark-c-2);
    border-radius: 1rem; */
    transition: all 0.5s;
}

a:hover {
    transform: scale3d(1.05, 1.05, 1.05);
}
</style>

<style>
.search {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--bg-c-a7);
    backdrop-filter: blur(32px);
    flex-direction: column;
    z-index: 1;
}

.search-close-btn {
    position: absolute;
    right: 1.75rem;
    top: 0.5rem;
    font-size: 2rem;
    cursor: pointer;
    transition-duration: 0.5s;
}

.search-close-btn:hover {
    transform: scale3d(1.25, 1.25, 1.25);
}

.search input {
    width: 40%;
    height: 5.5rem;
    padding: 0 1rem;
    border: none;
    /* border-bottom: 0.25rem solid var(--dark-c-2); */
    background-color: var(--bg-c-a1);
    color: var(--dark-c-2);
    font-size: 3.75rem;
    outline: none;
    text-align: center;
}

.search input::placeholder {
    opacity: 0.5;
}
</style>