<script setup>
const query = gql`
  query getProjects {
    projects {
      data {
        id
        attributes {
          title
          subtitle
          description
          external_url
          cover {
            data {
              id
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
const { data } = await useAsyncQuery(query);
</script>

<template>
  <div>
    <div v-if="data?.projects?.data?.length">
      <h1 class="text-2xl">Projects</h1>
      <div v-for="project in data.projects.data" :key="project.id">
        <h2>{{ project.attributes.title }}</h2>
        <p>{{ project.attributes.subtitle }}</p>
        <img
          class="w-96"
          provider="strapi"
          :src="`https://api.minguely.ch${project.attributes.cover.data.attributes.url}`"
        />
      </div>
    </div>
  </div>
</template>
