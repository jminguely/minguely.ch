<template>
  <div class="projects-container h-full w-full" v-if="filteredProjects.length">
    <!-- Desktop Layout: 2 Columns (List on Left, Detail on Right) -->
    <div class="hidden lg:flex h-full w-full">
      <!-- Left Column: Scrollable List of Projects -->
      <div class="w-1/3 border-r border-black overflow-y-auto no-scrollbar py-10 px-8 flex flex-col space-y-4">
        <button
          v-for="project in filteredProjects"
          :key="project.id"
          @click="selectProject(project)"
          class="text-left text-2xl uppercase tracking-tighter transition-all duration-200 focus:outline-none flex justify-between items-center group py-2"
          :class="[
            selectedProject?.id === project.id 
              ? 'text-black' 
              : 'text-black/45 hover:text-black'
          ]"
        >
          <span class="truncate pr-4">{{ project.attributes.title?.trim() }}</span>
          <span 
            class="transition-transform duration-200"
            :class="[
              selectedProject?.id === project.id 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
            ]"
          >
            →
          </span>
        </button>
      </div>

      <!-- Right Column: Sticky Selected Project Detail -->
      <div class="w-2/3 flex flex-col justify-between p-10 h-full overflow-y-auto no-scrollbar">
        <div class="flex flex-col space-y-8">
          <!-- Huge Project Title -->
          <h2 class="text-[5vw] leading-[0.85] tracking-tighter uppercase select-all break-words">
            {{ selectedProject?.attributes.title?.trim() }}
          </h2>

          <!-- Cover Image Container -->
          <div class="relative w-full aspect-video bg-neutral-100 border border-black overflow-hidden group">
            <nuxt-img
              v-if="selectedProject?.attributes.cover?.data"
              provider="strapi"
              :alt="`${selectedProject.attributes.title}: ${selectedProject.attributes.subtitle}`"
              :src="selectedProject.attributes.cover.data.attributes.url"
              class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
          </div>
        </div>

        <!-- Details Bottom Section -->
        <div class="mt-8 border-t border-black pt-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div class="flex flex-col">
            <span class="text-xs uppercase tracking-widest text-black/55">Details</span>
            <span class="text-lg uppercase mt-1 leading-tight">
              {{ selectedProject?.attributes.subtitle }}
              <span v-if="selectedProject?.attributes.description" class="text-black/55">
                — {{ selectedProject.attributes.description }}
              </span>
            </span>
          </div>
          
          <a
            v-if="selectedProject?.attributes.external_url"
            :href="selectedProject.attributes.external_url"
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 py-3 border border-black uppercase text-sm hover:bg-black hover:text-white transition-colors duration-200 shrink-0"
          >
            See on YouTube →
          </a>
        </div>
      </div>
    </div>

    <!-- Mobile/Tablet Layout: Interactive List -->
    <div class="lg:hidden flex flex-col h-full overflow-y-auto px-6 py-20">
      <div class="flex flex-col space-y-4">
        <button
          v-for="project in filteredProjects"
          :key="project.id"
          @click="openMobileDetail(project)"
          class="text-left text-xl uppercase tracking-tighter flex justify-between items-center py-4 border-b border-black/10"
        >
          <span>{{ project.attributes.title?.trim() }}</span>
          <span>→</span>
        </button>
      </div>
    </div>

    <!-- Mobile Full-Screen Overlay Detail -->
    <transition name="slide-up">
      <div 
        v-if="isMobileDetailOpen && selectedProject" 
        class="lg:hidden fixed inset-0 bg-white z-[999] flex flex-col p-6 overflow-y-auto"
      >
        <!-- Mobile Detail Close Header -->
        <div class="flex justify-between items-center mb-8 border-b border-black pb-4">
          <button 
            @click="closeMobileDetail" 
            class="text-sm uppercase tracking-wider border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors duration-200"
          >
            ← Close
          </button>
          <span class="text-xs uppercase tracking-widest text-black/55">Project Detail</span>
        </div>

        <!-- Content -->
        <div class="flex flex-col space-y-6 flex-grow">
          <h2 class="text-3xl leading-[0.9] tracking-tighter uppercase">
            {{ selectedProject.attributes.title?.trim() }}
          </h2>

          <div class="relative w-full aspect-video bg-neutral-100 border border-black overflow-hidden">
            <nuxt-img
              v-if="selectedProject.attributes.cover?.data"
              provider="strapi"
              :alt="`${selectedProject.attributes.title}: ${selectedProject.attributes.subtitle}`"
              :src="selectedProject.attributes.cover.data.attributes.url"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="flex flex-col space-y-2">
            <span class="text-xs uppercase tracking-widest text-black/55">Details</span>
            <p class="text-base uppercase leading-tight">
              {{ selectedProject.attributes.subtitle }}
            </p>
            <p v-if="selectedProject.attributes.description" class="text-sm uppercase text-black/55">
              {{ selectedProject.attributes.description }}
            </p>
          </div>
        </div>

        <div class="mt-8 pt-4 border-t border-black/10">
          <a
            v-if="selectedProject.attributes.external_url"
            :href="selectedProject.attributes.external_url"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full block text-center py-4 border border-black uppercase text-sm hover:bg-black hover:text-white transition-colors duration-200"
          >
            See on YouTube →
          </a>
        </div>
      </div>
    </transition>
  </div>
  <div v-else class="h-full flex items-center justify-center p-10">
    <p class="text-lg uppercase text-black/55 tracking-wider">No projects found.</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import fetchProjects from "~/graphql/fetchProjects.gql";

const props = defineProps({
  category: { type: String, required: true },
});

const apiCategory = props.category === "music" ? "music" : "video";
const variables = { category: apiCategory };

const { data } = await useAsyncQuery(fetchProjects, variables);

const filteredProjects = computed(() => {
  if (!data.value?.projects?.data) return [];
  
  // Sort highlighted projects first
  const sorted = [...data.value.projects.data].sort((a, b) => {
    const bHigh = b.attributes.highlight ? 1 : 0;
    const aHigh = a.attributes.highlight ? 1 : 0;
    return bHigh - aHigh;
  });

  if (props.category === "video") {
    return sorted.filter((p) => {
      const subtitle = p.attributes.subtitle || "";
      return !subtitle.toLowerCase().includes("videoclip");
    });
  } else if (props.category === "videoclips") {
    return sorted.filter((p) => {
      const subtitle = p.attributes.subtitle || "";
      return subtitle.toLowerCase().includes("videoclip");
    });
  }

  return sorted;
});

const selectedProject = ref(null);
const isMobileDetailOpen = ref(false);

// Auto-select first project on route/category change
watch(filteredProjects, (newVal) => {
  if (newVal.length) {
    selectedProject.value = newVal[0];
  } else {
    selectedProject.value = null;
  }
}, { immediate: true });

function selectProject(project) {
  selectedProject.value = project;
}

function openMobileDetail(project) {
  selectedProject.value = project;
  isMobileDetailOpen.value = true;
}

function closeMobileDetail() {
  isMobileDetailOpen.value = false;
}
</script>

<style scoped lang="postcss">
/* Slide-up transition for mobile overlay */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
