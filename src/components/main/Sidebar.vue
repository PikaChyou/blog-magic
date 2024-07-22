<template>
    <div class="sidebar">
        <div class="avatar"></div>
        <h1>
            {{ author }}
        </h1>
        <p>
            {{ description }}
        </p>
        <div>
            <p>{{ archives.length }}</p>
            <p>{{ Object.keys(categories).length }}</p>
        </div>
        <slot>
            none
        </slot>
    </div>
</template>

<script setup>
import { archives, categories } from '@/index'
import settings from '@/settings.json'
const author = settings.author
const description = settings.description
</script>

<style>
.avatar {
    width: 10rem;
    height: 10rem;
    margin: 0 auto;
    border-radius: 50%;
    background-image: url("/ktn.jpg");
    background-size: cover;
    border: 1px solid #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.5s;
}

.avatar:hover {
    transform: scale3d(1.15, 1.15, 1.15);
}

.sidebar {
    position: sticky;
    top: 2.5vh;
    width: 22.5%;
    float: right;
    display: flex;
    flex-direction: column;
    align-items: center;

    a {
        width: 10.5rem;
        height: 3.125rem;
        margin: 0.6rem;
        text-decoration: none;
        color: #fff;
        background-color: #333;
        border-radius: 1.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    a:not(#is-currrent):hover {
        background-color: #666;
    }

    #is-current {
        background-color: #666;
    }

}
</style>