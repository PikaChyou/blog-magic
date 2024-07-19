<template>
    <div class="header">
        <nav class="header-nav">
            <slot>
                <router-link to="/">Home</router-link>
            </slot>
        </nav>
        <div class="header-right">
            <svg class="moon-btn" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                @click="switchMode">
                <path
                    d="M11.286 22C13.337 22 15 20.42 15 18.47c0-1.544-1.045-2.857-2.5-3.336C12.295 13.371 10.72 12 8.81 12c-2.052 0-3.715 1.58-3.715 3.53c0 .43.082.844.23 1.226a2.949 2.949 0 0 0-.54-.05C3.248 16.706 2 17.89 2 19.353C2 20.815 3.247 22 4.786 22z" />
                <path
                    d="M2.716 15.723c.278-.148.574-.268.882-.354C3.686 12.6 6.056 10.5 8.81 10.5c.172 0 .343.008.511.024A6.495 6.495 0 0 1 9 8.5a6.496 6.496 0 0 1 3.143-5.567C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12a9.97 9.97 0 0 0 .716 3.723M22 12c0 4.266-2.671 7.908-6.432 9.345a4.865 4.865 0 0 0 .932-2.874a4.907 4.907 0 0 0-1.457-3.487a6.496 6.496 0 0 0 6.024-3.127c.24-.396.933-.32.933.143" />
            </svg>
        </div>
    </div>
</template>

<script setup>
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

.moon-btn {
    margin: 1rem;
    width: 1.75rem;
    height: 1.75rem;
    cursor: pointer;
    fill: var(--moon-c);
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
    transition-duration: 0.5s;
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