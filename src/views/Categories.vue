<template>
    <div>
        <ul>
            <ul v-for="(value, key) in categories" :key="key">
                <li>
                    <p>{{ key == "undefined" ? "未分类" : key }}</p>
                </li>
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

<style scoped>
ul {
    user-select: none;
}

li {
    list-style: none;
    margin: 0.75rem 0;
}

a {
    position: relative;
    font-size: 1.125rem;
    text-decoration: none;
    color: var(--text-color);
    margin: 0 3rem;
    opacity: 0.8;
    transition: opacity .28s;
}

a:hover {
    opacity: 1;
}

a::before {
    background-size: 24px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 0.125rem var(--dark-c-3);
    box-sizing: border-box;
    content: " ";
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    left: -2rem;
    overflow: hidden;
    padding: 5px 4px;
    position: absolute;
    top: 0.5rem;
    transition: box-shadow .28s;
}

a:hover::before {
    box-shadow: inset 0 0 0 0.4rem var(--dark-c-2);
}

li:not(:last-child) a::after {
    background: var(--dark-c-3);
    content: " ";
    display: block;
    height: 2.25rem;
    position: absolute;
    left: -1.65rem;
    top: 1.3rem;
    width: 0.125rem;
}

p {
    position: relative;
    font-size: 1.75rem;
    text-decoration: none;
    color: var(--text-color);
    margin: 0 3rem;
    opacity: 0.8;
    transition: opacity .28s;
}

p:hover {
    opacity: 1;
}

p::before {
    background-size: 24px;
    border-radius: 50%;
    box-shadow: inset 0 0 0 0.15rem var(--dark-c-3);
    box-sizing: border-box;
    content: " ";
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    left: -2.35rem;
    overflow: hidden;
    padding: 5px 4px;
    position: absolute;
    top: 1.125rem;
    transition: box-shadow .28s;
}

p:hover::before {
    box-shadow: inset 0 0 0 0.75rem var(--dark-c-2);
}

p::after {
    background: var(--dark-c-3);
    content: " ";
    display: block;
    height: 2.6rem;
    position: absolute;
    left: -1.65rem;
    top: 2.6rem;
    width: 0.125rem;
}
</style>