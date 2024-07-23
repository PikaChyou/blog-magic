<template>
    <div class="footer">
        <br />
        <p>Here is footer &copy; {{ year }}</p>
    </div>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style>
.footer {
    min-height: 10vh;
    text-align: center;
    background-color: var(--bg-c);
    transition: all var(--trans-time);
}
</style>