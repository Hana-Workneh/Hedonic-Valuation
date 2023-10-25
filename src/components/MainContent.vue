<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
      <main>
        <!-- Include the HedonicInput component here -->
        <HedonicInput />
      </main>
      
    </div>
  </template>
  
  <script>
  import HedonicInput from './HedonicInput.vue'; // Import your HedonicInput component
 
  export default {
    components: {
      HedonicInput, // Register the HedonicInput component
  
    }
  };
  </script>
  
  <style>
  /* Add CSS styles for your main application layout */
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333;
    background-color: #f4f4f4;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  header {
    background-color: #4197f3;
    color: white;
    padding: 10px 0;
    font-size: 22px;
  }
  
  main {
    flex-grow: 1;
  }
  </style>
  