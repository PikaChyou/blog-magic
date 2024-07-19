<template>


  <Cover>

  </Cover>

  <Main>

    <router-view v-slot="{ Component }">
      <Transition mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>

  </Main>

  <Footer />

</template>

<script setup>
import "@/assets/base.css"
import Cover from '@/components/Cover.vue'
import Main from '@/components/Main.vue'
import Footer from '@/components/Footer.vue'
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<style src="@/phycat.css"></style>
<style src="katex/dist/katex.min.css"></style>