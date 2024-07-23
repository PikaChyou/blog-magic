<template>
    <div class="sidebar">
        <div class="avatar"></div>
        <h1>
            {{ author }}
        </h1>
        <p>
            {{ description }}
        </p>
        <div class="sidebar-info flex-c">
            <div>
                <p>{{ archives.length }}</p>
                <p>文章</p>
            </div>
            <div>
                <p>{{ Object.keys(categories).length }}</p>
                <p>分类</p>
            </div>
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
        width: 11.25rem;
        height: 3.25rem;
        margin: 0.6rem;
        color: var(--dark-c-2);
        font-size: 1.25rem;
        text-decoration: none;
        border: 1px solid var(--dark-c-2);
        border-radius: 1.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.125s;
    }

    a:not(#is-currrent):hover {
        color: var(--bg-c);
        background-color: var(--text-color);
    }

    #is-current {
        color: var(--bg-c);
        background-color: var(--text-color);
    }

}

.sidebar-info {
    width: 80%;
    margin: 0.5rem 0;
}

.sidebar-info div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1rem;
    line-height: 1.5;

    :nth-child(1) {
        font-size: 1.5rem;
        font-weight: 1000;
    }

    :nth-child(2) {
        font-size: 1rem;
    }

}

.sidebar-info div:not(:last-child)::after {
    content: "";
    width: 0.8px;
    height: 80%;
    background-color: #ccc;
    position: absolute;
    right: 0;
    top: 10%;
}
</style>