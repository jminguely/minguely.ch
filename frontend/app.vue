<template>
  <div class="site-wrapper" :class="{ menuOpen }">
    <Sidebar :menuOpen="menuOpen" @toggleMenu="toggleMenu" />
    <main class="site-main">
      <div class="site-main-content">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<script setup>
const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

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
  background: #ccc;
}

body {
  overscroll-behavior-y: none;
}

h1 {
  line-height: 1;
  color: #ffffff;
  font-weight: 900;
  font-style: italic;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

h2,
h3 {
  font-weight: 900;
  font-style: italic;
  line-height: 0.85;
}

h3 {
  line-height: 0.85;
  margin-bottom: 0.4rem;
}

a {
  color: #ccc;
}

a:hover {
  color: #ffffff;
}

::selection {
  background-color: #ffffff22;
}

.site-wrapper {
  @apply flex w-full;
  margin: 0;

  @screen lg {
    height: calc(100vh - 40px);
    width: calc(100vw - 160px);
    margin: 20px auto;
  }
}

.site-main {
  background: #fff;
  padding: 0 10px 0 30px;
  color: #111;
  flex-grow: 1;
  height: 100%;
  overflow: hidden;

  @screen lg {
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
  }
}

.site-main-content {
  padding-right: 20px;
  overflow: auto;
  height: 100%;
}
</style>
