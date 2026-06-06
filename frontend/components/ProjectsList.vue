<template>
  <div class="card-container" v-if="data?.projects">
    <ProjectCard
      v-for="project in sortedProjects"
      :key="project.id"
      :project="project"
    />
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
    return (b.attributes.highlight ? 1 : 0) - (a.attributes.highlight ? 1 : 0);
  });
});
</script>

<style scoped lang="postcss"></style>
