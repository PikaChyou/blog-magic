<template>


  <Cover>
    <Title></Title>
  </Cover>

  <Main>
    <router-view v-slot="{ Component }">
      <Transition mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </Main>

  <Footer />

  <Search />

</template>

<script setup>
import "@/assets/base.css"
import Cover from '@/components/cover/Cover.vue'
import Main from '@/components/main/Main.vue'
import Footer from '@/components/Footer.vue'
import Title from '@/components/cover/Title.vue'
import Search from '@/components/cover/Search.vue'
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
<style src="katex/dist/katex.min.css"></style>@/components/cover/Cover.vue