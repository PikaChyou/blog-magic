<template>
    <div>
        <p>archives</p>
        <p>发现{{ archives.length }}篇文章</p>
        <ul>
            <li v-for="item in archives" :key="item.id">
                <router-link :to="item.path">{{ item.title }}</router-link>
            </li>
        </ul>
    </div>

</template>

<script setup>
import { archives } from '@/index';
</script>