<template>
  <div id="app">
    <header>
      <!-- Include your navigation menu or header here -->
      <h1>Hedonic Valuation Calculator</h1>
    </header>
    <main>
      <!-- Include the HedonicInput component here -->
      <HedonicInput />
    </main>
    <Footer />
  </div>
</template>

<script>
import HedonicInput from './components/HedonicInput.vue'; // Import your HedonicInput component
import Footer from './components/Footer.vue';

export default {
  components: {
    HedonicInput, // Register the HedonicInput component
    Footer
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
  font-size: 24px;
}

main {
  flex-grow: 1;
}
</style>
