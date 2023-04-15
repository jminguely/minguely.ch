<template>
  <div class="site-wrapper">
    <Sidebar />
    <main class="site-main">
      <NuxtPage />
    </main>
  </div>
</template>

<style lang="postcss">
html {
  background: #ccc;
  width: 100vw;
  height: 100vh;
}

body {
  font-family: Rubik;
  width: 100vw;
  height: 100vh;
}

h1 {
  font-size: 2em;
  color: #4e6ec3;
  font-weight: 900;
  font-style: italic;
  margin: 0;
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
  background-color: #ffffff55;
}

.site-wrapper {
  display: flex;
}

.site-main {
  background: white;
  margin: 20px 20px 20px 0;
  border-radius: 7px;
  padding: 20px;
  color: #888;
  flex-grow: 1;
  height: calc(100vh - 40px);
  overflow: auto;
}
</style>
