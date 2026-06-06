<template>
  <div v-if="data?.projects">
    <div class="card-container">
      <ProjectCard
        v-for="project in primaryProjects"
        :key="project.id"
        :project="project"
      />
    </div>
    <div v-if="secondaryProjects.length" class="card-container-grid">
      <ProjectCard
        v-for="project in secondaryProjects"
        :key="project.id"
        :project="project"
        compact
      />
    </div>
  </div>
</template>

<script setup>
import fetchProjects from "~/graphql/fetchProjects.gql";

const props = defineProps({
  category: { type: String, required: false, default: "music" },
});

const variables = { category: props.category };

const { data } = await useAsyncQuery(fetchProjects, variables);

const sortedProjects = computed(() => {
  if (!data.value?.projects?.data) return [];
  return [...data.value.projects.data].sort((a, b) => {
    const aOrder = a.attributes.order ?? Infinity;
    const bOrder = b.attributes.order ?? Infinity;
    return aOrder - bOrder;
  });
});

const primaryProjects = computed(() => sortedProjects.value.slice(0, 10));
const secondaryProjects = computed(() => {
  const items = sortedProjects.value.slice(10);
  return items.length % 2 !== 0 ? items.slice(0, -1) : items;
});
</script>

<style scoped lang="postcss">
.card-container-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;

  .project-card:nth-child(odd) {
    border-right: 1px solid rgba(255, 255, 255, 0.5);
  }
}
</style>
