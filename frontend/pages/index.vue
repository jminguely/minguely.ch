<template>
  <div v-if="data?.about?.data">
    <div
      class="aspect-square sm:aspect-video md:aspect-cine rounded-lg overflow-hidden bg-gray-900"
    >
      <nuxt-img
        class="object-cover w-full h-full opacity-0 filter brightness-0 grayscale-0 transition-all duration-3000"
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
    <div class="grid xl:grid-cols-2 gap-10">
      <div
        class="grid grid-cols-3 gap-x-5"
        v-for="section in data.about.data.attributes.Resume"
        :key="section.id"
      >
        <h3 class="col-start-1 col-span-3 text-2xl">{{ section?.Title }}</h3>
        <template v-for="item in section.Items" :key="item.id">
          <p class="font-bold text-gray-300">
            {{ item.Title }}
          </p>
          <p class="col-span-2">
            {{ item.Text }}
          </p>
        </template>
      </div>
    </div>
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

<style lang="postcss">
p {
  margin-bottom: 0.4rem;
}
</style>
