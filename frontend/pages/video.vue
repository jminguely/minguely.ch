<template>
  <ProjectsList category="video" />
  <div class="full-list">
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th
            scope="col"
            class="py-2 text-left text-xs font-bold uppercase tracking-wider"
          >
            Full credit list
          </th>
          <th
            scope="col"
            class="py-2 text-left text-xs font-bold uppercase tracking-wider"
          >
            Date
          </th>
          <th
            scope="col"
            class="py-2 text-left text-xs font-bold uppercase tracking-wider"
          >
            Location
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(credit, index) in sortedCredits" :key="index">
          <td class="py-2 whitespace-nowrap text-sm text-gray-900">
            {{ credit.title }}
          </td>
          <td class="py-2 whitespace-nowrap text-sm text-gray-900">
            {{ credit.date }}
          </td>
          <td class="py-2 whitespace-nowrap text-sm text-gray-900">
            {{ credit.location }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import creditsData from "@/assets/data/credit.json";

const credits = ref(creditsData);

const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split(".").map(Number);
  return new Date(year + 2000, month - 1, day); // Assuming the year is in 2000s
};

const sortedCredits = computed(() => {
  return credits.value
    .slice()
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));
});

useHead({
  title: "video",
});
</script>

<style lang="postcss">
.full-list {
  padding: 2rem;
}
</style>
