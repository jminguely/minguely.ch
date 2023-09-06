<template>
  <div>
    <button id="menuToggle" class="menuToggle" @click="toggleMenu()">
      <span class="open">≡</span>
      <span class="close">⤫</span>
    </button>
    <div class="sidebar">
      <div class="sidebar-content">
        <h1 class="text-3xl">Julien Minguely</h1>
        <p class="text-sm">video, music and other stuff in multimedia</p>
        <nav class="main-nav">
          <nuxt-link @click="toggleMenu()" to="/">About</nuxt-link>
          <nuxt-link @click="toggleMenu()" to="/video">Video</nuxt-link>
          <nuxt-link @click="toggleMenu()" to="/music">Music</nuxt-link>
          <!-- <nuxt-link @click="toggleMenu()" to="/dev">Dev</nuxt-link> -->
          <!-- <a class="{{ currentNav === 'music' && 'active' }}" href="./music.html">Music<span>→</span></a> -->
        </nav>
        <nav class="socials">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://instagram.com/jminguely"
          >
            Instagram
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://vimeo.com/jminguely"
          >
            Vimeo
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/jminguely"
          >
            Github
          </a>
          <a target="_blank" rel="noreferrer" href="mailto:julien@minguely.ch">
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
  border-top: 1px solid #ffffff33;

  a {
    font-size: 1.75rem;
    font-weight: 500;
    margin: 0 0 0.5rem 0;
    padding: 0.5rem 0.1rem;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ffffff33;

    &.router-link-active {
      color: #ffffff;
    }
  }
}

.menuToggle {
  display: block;
  cursor: pointer;
  position: fixed;
  top: 10px;
  right: 10px;
  font-size: 3rem;
  line-height: 2.7rem;
  color: black;
  background: #ffffff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  z-index: 999;
  box-shadow: 0 0 10px #33333333;

  .close {
    display: none;
  }

  .open {
    position: relative;
    top: -0.3rem;
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
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  z-index: 500;
  transition: all 0.3s ease;
  background: #99999999;
  pointer-events: none;
  opacity: 0;
  backdrop-filter: blur(10px);

  @screen lg {
    position: static;
    min-width: 320px;
    left: auto;
    opacity: 1;
    padding: 0;
    backdrop-filter: none;
    background: none;
    pointer-events: auto;
  }
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(100vw - 40px);
  padding-right: 60px;
  background: #111;
  padding: 50px;
  border-radius: 7px;
  transform: translateX(-110%);
  transition: all 0.3s ease 0.2s;
  overflow: auto;

  @screen lg {
    transform: none;
    color: white;
    display: flex;
    flex-direction: column;
    margin: 0;
    height: 100%;
    width: auto;
    padding: 30px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.menuOpen {
  overflow: hidden;

  .sidebar {
    opacity: 1;
    pointer-events: auto;
    transition: all 0.5s ease;
  }

  .sidebar-content {
    transform: translateX(0);
  }
}

.socials {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}
</style>
