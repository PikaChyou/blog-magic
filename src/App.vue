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

  <Footer></Footer>

  <Search />

</template>

<script setup>
import "@/assets/base.css"
import Cover from '@/components/cover/Cover.vue'
import Main from '@/components/main/Main.vue'
import Footer from '@/components/Footer.vue'
import Title from '@/components/cover/Title.vue'
import Search from '@/components/cover/Search.vue'
import ClipboardJS from 'clipboard';
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useScreenStore } from "@/store/screen"

const screen = useScreenStore()
const isWideScreen = ref(window.innerWidth >= 1200)
function updateScreen() {
  isWideScreen.value = window.innerWidth >= 1200
}
onMounted(() => {
  window.addEventListener('resize', updateScreen)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateScreen)
})
watch(isWideScreen, (newValue) => {
  screen.setScreen(newValue)
})
screen.setScreen(isWideScreen.value)

// 复制代码块内容
const clipboard = ref(null);
onMounted(() => {
  clipboard.value = new ClipboardJS('.copy-btn', {
    text: (trigger) => {
      return decodeURIComponent(trigger.getAttribute('data-clipboard-text'));
    }
  });

  clipboard.value.on('success', (e) => {
    const button = e.trigger;
    button.innerText = 'success';
    button.disabled = true;
    setTimeout(() => {
      button.innerText = 'copy';
      button.disabled = false;
    }, 2500);
  });

  clipboard.value.on('error', (e) => {
    const button = e.trigger;
    button.innerText = 'failed';
    setTimeout(() => {
      button.innerText = 'copy';
    }, 2500);
  });
})
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

<style src="@/assets/theme.css"></style>
<style src="../node_modules/@mdit/plugin-katex/node_modules/katex/dist/katex.min.css"></style>