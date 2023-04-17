<template>
  <a
    :href="project.attributes.external_url"
    target="_blank"
    class="project-card bg-gray-900"
  >
    <div class="content">
      <div class="headings">
        <h3 class="title">{{ project.attributes.title }}</h3>
        <p class="subtitle">{{ project.attributes.subtitle }}</p>
      </div>
      <div class="datas">
        <p class="credits">{{ project.attributes.description }}</p>
      </div>
    </div>
    <div class="button">
      <p>→</p>
    </div>
    <nuxt-img
      :class="{ loaded }"
      provider="strapi"
      :alt="`${project.attributes.title}: ${project.attributes.subtitle}`"
      :src="project.attributes.cover.data.attributes.url"
      loading="lazy"
      placeholder
      @load="loaded = true"
    />
  </a>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
    };
  },
  props: {
    project: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="postcss">
.project-card {
  @apply aspect-video md:aspect-cine;
  position: relative;
  display: block;
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
  border-radius: 7px;
  overflow: hidden;
  box-sizing: border-box;

  @screen 2xl {
    width: 50%;
    margin: 10px;
  }

  &:last-of-type {
    margin-bottom: 0px;
  }

  &:hover {
    color: black;

    .content {
      opacity: 1;
    }

    .button {
      background: #000000aa;
    }

    img.loaded {
      transform: scale(1.1) rotate(0.25deg);
      filter: grayscale(1) brightness(0.5);
    }
  }

  .content {
    color: white;
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    opacity: 0.7;
    background: linear-gradient(to right, #000000dd, #00000000);
    padding: 2rem 6rem 2rem 2rem;
    transition: all 1s ease;
  }

  .button {
    color: white;
    z-index: 2;
    display: flex;
    padding: 1.5rem;
    flex-direction: column;
    justify-content: center;
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    background: #00000000;
    transition: all 1s ease;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-weight: 500;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
    object-fit: cover;
    transform: scale(1) rotate(0deg);
    transition: transform 2s, opacity 2s, filter 2s;
    opacity: 0;
    filter: grayscale(1);

    &.loaded {
      opacity: 1;
      filter: grayscale(0);
      transform: scale(1.05) rotate(0deg);
    }
  }
}
</style>
