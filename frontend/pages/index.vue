<template>
  <div v-if="data?.about?.data">
    <div
      class="aspect-square md:aspect-cine rounded-lg overflow-hidden bg-gray-900"
    >
      <nuxt-img
        class="object-cover w-full h-auto opacity-0 filter brightness-0 grayscale-0 transition-all duration-3000"
        :class="{ 'opacity-100 grayscale brightness-105': imageLoaded }"
        provider="strapi"
        alt=""
        :src="data.about.data.attributes.Cover.data.attributes.url"
        loading="lazy"
        placeholder
        @load="imageLoaded = true"
      />
    </div>
    <div
      class="text-xl py-5"
      v-html="data.about.data.attributes.Biography"
    ></div>
  </div>
</template>

<script setup>
import fetchAbout from "~/graphql/fetchAbout.gql";

const { data } = await useAsyncQuery(fetchAbout);
</script>

<script>
export default {
  data() {
    return {
      imageLoaded: false,
    };
  },
};
</script>
