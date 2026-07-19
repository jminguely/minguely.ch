<template>
  <div v-if="data?.about?.data" class="about-container flex flex-col w-full pb-20 overflow-y-auto no-scrollbar">
    <!-- Image Cover -->
    <div class="aspect-video lg:aspect-cine overflow-hidden bg-neutral-100 border-b border-black">
      <nuxt-img
        class="object-cover w-full h-full opacity-0 filter grayscale transition-opacity duration-[2s]"
        :class="{ 'opacity-100': imageLoaded }"
        provider="strapi"
        alt="Julien Minguely"
        :src="data.about.data.attributes.Cover.data.attributes.url"
        loading="lazy"
        @load="imageLoaded = true"
      />
    </div>

    <!-- Biography Text -->
    <div
      class="biography-text text-xl md:text-2xl lg:text-3xl leading-tight tracking-tighter uppercase p-8 lg:p-12 border-b border-black max-w-4xl"
      v-html="data.about.data.attributes.Biography"
    ></div>

    <!-- Resume Section -->
    <div class="p-8 lg:p-12 border-b border-black">
      <div class="grid gap-x-12 gap-y-8 grid-cols-1 md:grid-cols-2 max-w-4xl">
        <template
          v-for="section in data.about.data.attributes.Resume"
          :key="section.id"
        >
          <h3 class="col-span-1 md:col-span-2 text-2xl lg:text-3xl uppercase tracking-tighter mt-4 border-b border-black pb-2">
            {{ section?.Title }}
          </h3>
          <template v-for="item in section.Items" :key="item.id">
            <div class="flex flex-col space-y-1">
              <span class="text-xs uppercase tracking-widest text-black/55">
                {{ item.Title }}
              </span>
              <span class="text-lg uppercase">
                {{ item.Text }}
              </span>
            </div>
          </template>
        </template>
      </div>
    </div>

    <!-- Credits -->
    <FullCreditList />
  </div>
</template>

<script setup>
import { ref } from "vue";
import fetchAbout from "~/graphql/fetchAbout.gql";

const { data } = await useAsyncQuery(fetchAbout);
const imageLoaded = ref(false);

useHead({
  title: "about",
});
</script>

<style lang="postcss">
.biography-text {
  p {
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }
  p:last-child {
    margin-bottom: 0;
  }
}
</style>
