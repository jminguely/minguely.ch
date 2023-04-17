<template>
  <div class="card-container" v-if="data?.projects">
    <ProjectCard
      v-for="project in data.projects.data"
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
</script>

<style scoped lang="postcss"></style>
