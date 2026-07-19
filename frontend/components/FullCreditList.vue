<template>
  <div class="full-list p-8 lg:p-12">
    <table class="min-w-full border-collapse">
      <thead>
        <tr class="border-b border-black">
          <th scope="col" colspan="2" class="pb-4 text-left text-sm uppercase tracking-wider">
            Full credit list
          </th>
          <th scope="col" class="pb-4 text-left text-sm uppercase tracking-wider">
            Date
          </th>
          <th scope="col" class="pb-4 text-left text-sm uppercase tracking-wider hidden md:table-cell">
            Location
          </th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(credit, index) in sortedCredits" 
          :key="index"
          class="border-b border-black/10 hover:bg-black/5 transition-colors duration-150"
        >
          <td class="py-3 whitespace-nowrap text-sm text-black/55 w-12 tabular-nums">
            #{{ (sortedCredits.length - index).toString().padStart(3, "0") }}
          </td>
          <td class="py-3 text-sm text-black uppercase tracking-tight pr-4">
            {{ credit.title }}
          </td>
          <td class="py-3 whitespace-nowrap text-sm text-black tabular-nums">
            {{ credit.date }}
          </td>
          <td class="py-3 text-sm text-black uppercase tracking-tight hidden md:table-cell">
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
  // Assuming the year is in 2000s
  return new Date(year + 2000, month - 1, day);
};

const sortedCredits = computed(() => {
  return credits.value
    .slice()
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));
});
</script>

<style scoped lang="postcss">
.full-list {
  width: 100%;
  max-width: 100%;
}
</style>
