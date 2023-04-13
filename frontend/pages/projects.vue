<script setup>
const route = useRoute();
</script>

<template>
  <div>
    <p>Current route: {{ route.path }}</p>
  </div>
</template>
