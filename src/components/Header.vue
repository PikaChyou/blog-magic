<template>
    <div class="header">
        <nav class="header-nav">
            <slot>
                <router-link to="/">Home</router-link>
            </slot>
        </nav>
        <div>
            <p @click="">昼夜</p>
        </div>
    </div>
</template>

<script setup>

</script>

<style>
.header {
    position: fixed;
    height: 2.75rem;
    width: 1200px;
    left: calc(50% - 600px);
    font-size: 18px;
    color: #fff;
    text-shadow: 1px 3px 8px rgba(0, 0, 0, 0.75);
}

.header-nav {
    display: inline-block;

    a {
        color: #fff;
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

.header>div {
    float: right;

}

@media screen and (max-width: 1200px) {
    .header {
        left: 2.5%;
        width: 95%;
    }

    .header-nav {
        display: none;
    }

}
</style>