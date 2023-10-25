<!-- SavedAttributes.vue -->
<template>
    <div>
      <h2>Saved Attributes</h2>
      <!-- Loop through saved attributes and display them as expandable cards -->
      <div v-for="tag in savedAttributes" :key="tag.id">
        <div @click="toggleCard(tag.id)">
          <h3>{{ tag.tagName }}</h3>
        </div>
        <div v-if="expandedTags.includes(tag.id)">
          <div v-for="attribute in tag.attributes" :key="attribute.id">
            <p>{{ attribute.name }}</p>
            <p>{{ attribute.value }}</p>
            <p>{{ attribute.coefficient }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        savedAttributes: [/* Your saved attributes data goes here */],
        expandedTags: [],
      };
    },
    methods: {
      toggleCard(tagId) {
        if (this.expandedTags.includes(tagId)) {
          this.expandedTags = this.expandedTags.filter(id => id !== tagId);
        } else {
          this.expandedTags.push(tagId);
        }
      },
    },
  };
  </script>
  