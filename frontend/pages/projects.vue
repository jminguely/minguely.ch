<script setup>
const route = useRoute();

const { find } = useStrapi();

const response = await find("projects");

const projects = response.data;
</script>

<template>
  <div>
    <p>Current route: {{ route.path }}</p>
    <div v-if="projects && projects.length">
      <h1 class="text-2xl">Projects</h1>
      <div v-for="project in projects" :key="project.id">
        <p>Project</p>
      </div>
    </div>
  </div>
</template>
