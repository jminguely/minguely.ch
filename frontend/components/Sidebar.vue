<template>
  <div>
    <button id="menuToggle" class="menuToggle">
      <span class="open">≈</span>
      <span class="close">⤫</span>
    </button>
    <div class="sidebar">
      <h1>Julien Minguely</h1>
      <p>multimedia and other stuff</p>
      <nav class="main-nav">
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/video">Video</nuxt-link>
        <nuxt-link to="/music">Music</nuxt-link>
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
        <a target="_blank" rel="noreferrer" href="https://vimeo.com/jminguely">
          Vimeo
        </a>
        <a target="_blank" rel="noreferrer" href="https://github.com/jminguely">
          Github
        </a>
        <a target="_blank" rel="noreferrer" href="mailto:julien@minguely.ch">
          Mail
        </a>
      </nav>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.main-nav {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  border-top: 1px solid #ffffff33;

  a {
    font-size: 2rem;
    font-weight: 500;
    margin: 0 0 0.5rem 0;
    padding: 0.5rem 0.1rem;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ffffff33;

    &.router-link-active {
      color: #4e6ec3;
    }
  }
}

.menuToggle {
  display: block;
  cursor: pointer;

  .close {
    display: none;
  }
}

.menuToggle {
  display: block;
  cursor: pointer;
  position: fixed;
  top: 30px;
  left: 30px;
  font-size: 2rem;
  color: white;
  background: #4e6ec3;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  z-index: 999;
  box-shadow: 0 0 10px #33333388;

  .close {
    display: none;
  }

  &:hover {
    background: #2e4ea3;
  }

  @screen md {
    display: none;
  }
}

.sidebar {
  height: calc(100% - 40px);
  position: fixed;
  top: 0;
  right: -50px;
  min-width: 280px;
  max-width: 300px;
  transform: translateX(110%);
  transition: all 0.3s ease;
  z-index: 500;
  padding-right: 60px;

  @screen md {
    position: static;
    background: #111;
    color: white;
    margin: 20px;
    border-radius: 7px;
    padding: 20px;
    color: #888;
    display: flex;
    flex-direction: column;
    min-width: 320px;
    right: auto;
    transform: none;
  }
}

.menuOpen {
  .sidebar {
    transform: translateX(0);
  }
}

.socials {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}
</style>
