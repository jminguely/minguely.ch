<template>
  <div class="site-wrapper" :class="{ menuOpen }">
    <Sidebar :menuOpen="menuOpen" @toggleMenu="toggleMenu" />
    <main class="site-main">
      <NuxtPage />
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

h1 {
  line-height: 1;
  color: #4e6ec3;
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
  @apply flex max-w-7xl;
  width: calc(100vw - 50px);
  margin: 10px 10px 20px 40px;

  @screen lg {
    gap: 20px;
    height: calc(100vh - 40px);
    width: calc(100vw - 160px);
    margin: 20px auto;
  }
}

.site-main {
  background: white;
  border-radius: 7px;
  padding: 20px;
  color: #888;
  flex-grow: 1;
  height: 100%;
  overflow: auto;

  @screen lg {
    padding: 30px;
  }
}
</style>
