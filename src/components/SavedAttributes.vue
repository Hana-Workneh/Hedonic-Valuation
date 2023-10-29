<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div v-for="(tag, tagIndex) in savedAttributes" :key="tag._id">
      <div @click="toggleCard(tagIndex)" class="cursor-pointer p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-300">
        <h3 class="text-lg font-medium">{{ tag.tagName }}</h3>
      </div>
      <div v-if="expandedTags.includes(tagIndex)">
        <div v-for="attribute in tag.dataArray" :key="attribute._id" class="p-4 mb-4 bg-white rounded-lg shadow border border-gray-300">
          <p class="text-gray-700 font-medium">Attribute Name: {{ attribute.name }}</p>
          <p class="text-gray-600">Attribute Value: {{ attribute.value }}</p>
          <p class="text-gray-600">Attribute Coefficient: {{ attribute.coefficient }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      savedAttributes: [],
      expandedTags: [],
    };
  },
  methods: {
    toggleCard(tagIndex) {
      // Use a Set to manage the expanded tags
      const expandedSet = new Set(this.expandedTags);

      if (expandedSet.has(tagIndex)) {
        // If the tagIndex is in the set, remove it to collapse the card
        expandedSet.delete(tagIndex);
      } else {
        // If the tagIndex is not in the set, add it to expand the card
        expandedSet.add(tagIndex);
      }

      // Convert the Set to an array directly
      this.expandedTags = [...expandedSet];
    },

    fetchSavedAttributes() {
      const authorizationToken = localStorage.getItem('token'); // Retrieve the token from localStorage

      axios
        .get('https://hedonic-backend.onrender.com/user/hedonic', {
          headers: {
            Authorization: 'Bearer ' + authorizationToken, // Include the token in the request header
          },
        })
        .then(response => {
          this.savedAttributes = response.data;
        })
        .catch(error => {
          console.error('Failed to fetch saved attributes', error);
        });
    },
  },
  created() {
    this.fetchSavedAttributes();
  },
};
</script>
