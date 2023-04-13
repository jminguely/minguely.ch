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
    <h1 class="text-3xl font-bold underline text-red-500">Hello world!</h1>
    <p>Current route: {{ route.path }}</p>
    <h2 class="text-2xl">Projects</h2>
    <div v-for="project in projects" :key="project.id">
      <h2>{{ project.attributes.title }}</h2>
      <h2>{{ project.attributes.subtitle }}</h2>
    </div>
  </div>
</template>
