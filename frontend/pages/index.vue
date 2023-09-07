<template>
  <div v-if="data?.about?.data" class="my-5 lg:my-10">
    <div
      class="aspect-square sm:aspect-video lg:aspect-cine rounded-md overflow-hidden bg-gray-900"
    >
      <nuxt-img
        class="object-cover w-full h-full opacity-0 filter brightness-0 grayscale-0 transition-all duration-3000"
        :class="{ 'opacity-100 grayscale brightness-100': imageLoaded }"
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
    <div class="grid gap-x-10 grid-cols-[auto_auto]">
      <template
        v-for="section in data.about.data.attributes.Resume"
        :key="section.id"
      >
        <h3 class="col-span-2 text-xl lg:text-2xl mt-5">
          {{ section?.Title }}
        </h3>
        <template v-for="item in section.Items" :key="item.id">
          <p class="col-span-2 lg:col-span-1 font-bold text-gray-300">
            {{ item.Title }}
          </p>
          <p class="col-span-2 lg:col-span-1 mb-5">
            {{ item.Text }}
          </p>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import fetchAbout from "~/graphql/fetchAbout.gql";

const { data } = await useAsyncQuery(fetchAbout);

useHead({
  title: "about",
});
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
