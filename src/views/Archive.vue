<template>
    <div>
        <p>archives</p>
        <p>发现{{ catalogue.length }}篇文章</p>
        <ul>
            <li v-for="item in catalogue" :key="item.id">
                <router-link :to="item.path">{{ item.title }}</router-link>
            </li>
        </ul>
    </div>

</template>

<script setup>
import { defineProps } from 'vue'
defineProps(['catalogue'])
</script>