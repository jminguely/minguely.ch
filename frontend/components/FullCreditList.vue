<template>
  <div v-if="credits.length" class="full-list">
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th
            scope="col"
            colspan="2"
            class="py-2 text-left text-xs uppercase font-normal"
          >
            Full credit list
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(credit, index) in credits" :key="credit.id">
          <td class="py-2 whitespace-nowrap text-xs text-gray-300">
            #<span class="tabular-nums">{{
              (credits.length - index).toString().padStart(3, "0")
            }}</span>
          </td>
          <td class="py-2 whitespace-nowrap text-xs text-gray-900">
            {{ credit.attributes.title }}
          </td>
          <td class="py-2 whitespace-nowrap text-xs text-gray-300 tabular-nums">
            {{ formatDate(credit.attributes.date) }}
          </td>
          <td
            class="py-2 whitespace-nowrap text-xs text-gray-300 hidden md:block"
          >
            {{ credit.attributes.location }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from "vue";
import fetchCredits from "~/graphql/fetchCredits.gql";

const { data } = await useAsyncQuery(fetchCredits);

const credits = computed(() => data.value?.credits?.data ?? []);

const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const [year, month, day] = String(isoDate).slice(0, 10).split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}.${month}.${year.slice(-2)}`;
};
</script>

<style lang="postcss">
.full-list {
  padding: 2rem;
}
</style>
