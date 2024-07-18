<template>
    <div class="footer">
        <br />
        <p>Here is footer &copy; {{ year }}</p>
    </div>
</template>

<script setup>
const year = new Date().getFullYear()
</script>