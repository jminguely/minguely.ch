<template>
  <div>
    <button id="menuToggle" class="menuToggle" @click="toggleMenu()">
      <span class="open">≡</span>
      <span class="close">⤫</span>
    </button>
    <div class="sidebar">
      <div class="sidebar-content">
        <h1 class="text-3xl mb-0 pb-0 tracking-tighter leading-none">J.Minguely</h1>
        <p class="text-sm uppercase tracking-wider mb-8">Broadcast director</p>
        <nav class="main-nav">
          <nuxt-link @click="toggleMenu()" to="/">About</nuxt-link>
          <nuxt-link @click="toggleMenu()" to="/video">Video</nuxt-link>
          <nuxt-link @click="toggleMenu()" to="/videoclips">Vidéoclips</nuxt-link>
          <nuxt-link @click="toggleMenu()" to="/music">Music</nuxt-link>
        </nav>
        <nav class="mt-auto flex flex-col space-y-2 pt-8">
          <p class="text-xs uppercase tracking-widest text-black/55 mb-4">
            —<br />
            Julien Minguely
          </p>

          <a
            target="_blank"
            rel="noreferrer"
            href="https://instagram.com/jminguely"
            class="text-sm uppercase hover:underline"
          >
            Instagram
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://vimeo.com/jminguely"
            class="text-sm uppercase hover:underline"
          >
            Vimeo
          </a>
          <a target="_blank" rel="noreferrer" href="mailto:julien@minguely.ch" class="text-sm uppercase hover:underline">
            Mail
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleMenu() {
      this.$emit("toggleMenu");
    },
  },
};
</script>

<style lang="postcss">
.main-nav {
  margin-top: 1rem;
  border-top: 1px solid #000000;

  a {
    font-size: 1.5rem;
    margin: 0;
    padding: 0.75rem 0;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #000000;
    text-transform: uppercase;
    transition: background-color 0.2s ease, padding-left 0.2s ease;

    &.router-link-active {
      color: #000000;
      position: relative;
    }

    &.router-link-active::after {
      content: "→";
      display: inline-block;
    }

    &:hover {
      background-color: #000000;
      color: #ffffff;
      padding-left: 0.5rem;
      opacity: 1;
    }
  }
}

.menuToggle {
  display: block;
  cursor: pointer;
  position: fixed;
  top: 15px;
  right: 15px;
  font-size: 2.2rem;
  line-height: 2.2rem;
  color: #000000;
  background: #ffffff;
  border: 1px solid #000000;
  width: 45px;
  height: 45px;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

  .close {
    display: none;
  }

  .open {
    position: relative;
    top: -0.1rem;
  }

  @screen lg {
    display: none;
  }

  .menuOpen & .close {
    display: block;
  }
  .menuOpen & .open {
    display: none;
  }
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  z-index: 500;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.95);
  pointer-events: none;
  opacity: 0;

  @screen lg {
    position: static;
    min-width: 300px;
    width: 300px;
    left: auto;
    opacity: 1;
    padding: 0;
    background: none;
    pointer-events: auto;
    border-right: 1px solid #000000;
  }
}

.sidebar-content {
  display: flex;
  color: #000000;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: #ffffff;
  padding: 40px;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  overflow: auto;

  @screen lg {
    transform: none;
    display: flex;
    flex-direction: column;
    margin: 0;
    height: 100%;
    width: auto;
    padding: 40px 30px;
  }
}

.menuOpen {
  overflow: hidden;

  .sidebar {
    opacity: 1;
    pointer-events: auto;
  }

  .sidebar-content {
    transform: translateX(0);
  }
}
</style>
