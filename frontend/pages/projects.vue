<script setup>
import query from "~/query/fetchProjects.gql";

const route = useRoute();

const graphql = useStrapiGraphQL();

const { data } = await graphql(query);

const {
  projects: { data: projects },
} = data;
</script>

<template>
  <div>
    <p>Current route: {{ route.path }}</p>
    <div v-if="projects.length">
      <h1 class="text-2xl">Projects</h1>
      <div v-for="project in projects" :key="project.id">
        <h2>{{ project.attributes.title }}</h2>
        <h2>{{ project.attributes.subtitle }}</h2>
      </div>
    </div>
  </div>
</template>
