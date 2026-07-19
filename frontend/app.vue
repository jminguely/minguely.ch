<template>
  <div class="site-wrapper" :class="{ menuOpen }">
    <Sidebar :menuOpen="menuOpen" @toggleMenu="toggleMenu" />
    <main ref="siteMain" class="site-main">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
const menuOpen = ref(false);
const siteMain = ref(null);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

const router = useRouter();
router.afterEach(() => {
  if (siteMain.value) siteMain.value.scrollTo({ top: 0, behavior: 'smooth' });
});

useHead({
  titleTemplate: (title) => `minguely.ch - ${title}`,
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "utf-8",
  bodyAttrs: {
    class: { "overflow-hidden": menuOpen },
  },
  meta: [
    {
      hid: "description",
      name: "description",
      content:
        "Portfolio of the swiss based multidisciplinary artist Julien Minguely. Works in the field of Video, Music and Computer Science.",
    },
  ],
});
</script>

<style lang="postcss">
html {
  background: #ffffff;
}

body {
  overscroll-behavior-y: none;
}

h1, h2, h3, h4, h5, h6 {
  line-height: 0.85;
  color: #000000;
  margin-top: 0;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

a {
  color: #000000;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

a:hover {
  opacity: 0.6;
}

::selection {
  background-color: #000000;
  color: #ffffff;
}

.site-wrapper {
  @apply flex w-full;
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
}

.site-main {
  background: #ffffff;
  color: #000000;
  flex-grow: 1;
  height: 100%;
  overflow: auto;
}
</style>
