<template>
    <div>
        <p>categories</p>
        <p>发现{{ Object.keys(categories).length }}个分类</p>
        <ul>
            <ul v-for="(value, key) in categories" :key="key">
                <br>
                <p>{{ key }}</p>
                <li v-for="item in value" :key="item.id">
                    <router-link :to="item.path">{{ item.title }}</router-link>
                </li>
            </ul>
        </ul>
    </div>
</template>

<script setup>
import { categories } from '@/index';
</script>